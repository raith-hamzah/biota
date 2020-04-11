import { DB } from '~/db';
import { FaunaCollectionOptions, FaunaId } from '~/../types/fauna';
import { document } from '~/factory/api/classes/document';
import { execute } from '~/tasks';

export function get(this: DB, collectionName: string) {
  const self = this;

  return async function getMethod(id: FaunaId) {
    return execute(
      [
        {
          name: `Get (${id}) in (${collectionName})`,
          task() {
            return self.query(document.get.call(self, collectionName, id));
          },
        },
      ],
      {
        domain: 'DB.collection.get',
      },
    );
  };
}
