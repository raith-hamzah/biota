import { query as q } from 'faunadb';
import { Biota } from '~/biota';
import { document } from '~/factory/api/document';
import { Identity } from '~/factory/api/ql';
import { BiotaCollectionName } from '~/factory/constructors/collection';
import { execute } from '~/tools/tasks';

export function update(this: Biota, data: object) {
  const self = this;
  return execute(
    [
      {
        name: `Update me`,
        async task() {
          return self.query(document.update.call(self, BiotaCollectionName('users'), q.Select('id', Identity()), data));
        },
      },
    ],
    {
      domain: 'Biota.user.update',
    },
  );
}
