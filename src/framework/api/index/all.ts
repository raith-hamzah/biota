import { DB } from '~/db';
import { index } from '~/factory/api/classes/index';
import { execute } from '~/tasks';
import { FaunaPaginateOptions } from '~/../types/fauna';

export function all(this: DB, indexName: string) {
  const self = this;

  return async function allMethod(pagination: FaunaPaginateOptions = {}) {
    return execute(
      [
        {
          name: `All indexes`,
          task() {
            return self.query(index.all.call(self, pagination));
          },
        },
      ],
      {
        domain: 'DB.index.all',
      },
    );
  };
}
