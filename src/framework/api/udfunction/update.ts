import { FaunaUDFunctionOptions } from '~/../types/fauna';
import { DB } from '~/db';
import { udfunction } from '~/factory/api/classes/udfunction';
import { execute } from '~/tasks';

export function update(this: DB, udfunctionName: string) {
  const self = this;

  return async function updateMethod(options: FaunaUDFunctionOptions = {}) {
    return execute(
      [
        {
          name: `Update udfunction [${udfunctionName}]`,
          task() {
            return self.query(udfunction.update.call(self, udfunctionName, options));
          },
        },
      ],
      {
        domain: 'DB.udfunction.update',
      },
    );
  };
}
