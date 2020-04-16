import { Biota } from '~/biota';
import { FaunaCollectionOptions, FaunaId } from '~/../types/fauna';
import { udfunction } from '~/factory/api/udfunction';
import { execute } from '~/tools/tasks';

export function get(this: Biota, udfunctionName: string) {
  const self = this;

  return async function getMethod() {
    return execute(
      [
        {
          name: `Get udfunction [${udfunctionName}]`,
          task() {
            return self.query(udfunction.get.call(self, udfunctionName));
          },
        },
      ],
      {
        domain: 'Biota.udfunction.get',
      },
    );
  };
}
