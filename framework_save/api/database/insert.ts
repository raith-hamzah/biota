import { FaunaId, FaunaDocumentOptions, FaunaDatabaseOptions } from '~/../types/fauna';
import { Biota } from '~/biota';
import { database } from '~/factory/api/database';
import { execute } from '~/tools/tasks';

export function insert(this: Biota, databaseName: string) {
  const self = this;

  return async function insertMethod(options: FaunaDatabaseOptions = {}) {
    return execute(
      [
        {
          name: `Insert database [${databaseName}]`,
          task() {
            return self.query(database.insert.call(self, databaseName, options));
          },
        },
      ],
      {
        domain: 'Biota.database.insert',
      },
    );
  };
}
