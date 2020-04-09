import Debug from "debug";
import { Task, TaskExecuteOptions } from "~/../types/task";
import * as fs from "fs";
import { splitEvery } from "~/helpers";

export async function execute(tasks: Task[], options?: TaskExecuteOptions): Promise<any | any[]> {
  let { indent = 0, singleResult = true, domain = "task", parallel = false, batchSize = 40 } = options || {};
  const debug = Debug("biota").extend(domain);
  let indentation = "--".repeat(indent);
  let ctx = {};
  let results = [];
  for (let taskBatch of splitEvery(batchSize, tasks)) {
    let taskPromises = [];
    for (let task of taskBatch) {
      debug(`${indentation} ${task.name}`);
      let taskProm = () => new Promise((resolve, reject) => task.task(ctx).then(resolve).catch(reject))
      .then((res) => results.push(res))
      .catch((error) => {
        results.push({ error });
        debug(`${indentation} error: ${task.name}: ${error.message}`);

        try {
          if (process.env.SAVE_LOG) {
            fs.appendFileSync("./erros.txt", domain);
            fs.appendFileSync("./erros.txt", JSON.stringify(JSON.parse(error.requestResult.responseRaw), null, 2));
          }
          debug(JSON.stringify(JSON.parse(error.requestResult.responseRaw), null, 2));
        } catch (error) {
          if (process.env.SAVE_LOG) {
            fs.appendFileSync("./erros.txt", domain);
            fs.appendFileSync("./erros.txt", JSON.stringify(error, null, 2));
          }
          debug(JSON.stringify(error, null, 2));
        }

        if (task.fullError) {
          try {
            debug(JSON.stringify(JSON.parse(error.requestResult.responseRaw), null, 2));
          } catch (e) {
            debug(error);
          }
        }
      });
      if (parallel) {
        taskPromises.push(taskProm());
      } else {
        await taskProm();
      }
    }
    if (parallel) {
      await Promise.all(taskPromises);
    }
  }

  if (singleResult) {
    try {
      return results[results.length - 1];
    } catch (error) {
      return {};
    }
  }
  return results;
}
