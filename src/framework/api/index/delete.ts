import { FaunaIndexOptions } from "~/../types/fauna";
import { DB } from "~/db";
import { index } from "~/factory/api/classes/index";
import { execute } from "~/tasks";

export function delete_(this: DB, indexName: string) {
  let self = this;

  return async function deleteMethod() {
    return execute(
      [
        {
          name: `Delete (${indexName})`,
          task() {
            return self.query(index.delete.call(self, indexName));
          },
        },
      ],
      {
        domain: "DB.index.delete",
      }
    );
  };
}
