import { DB } from "~/db";
import { udfunction } from "~/factory/api/classes/udfunction";
import { execute } from "~/tasks";

export function cleanAll(this: DB) {
  let self = this;
  return execute(
    [
      {
        name: `Clean all udfunctions`,
        task() {
          return self.query(udfunction.cleanAll());
        },
      },
    ],
    {
      domain: "DB.udfunctions.cleanAll",
    }
  );
}