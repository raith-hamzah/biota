import { FaunaRoleOptions } from '~/../types/fauna';
import { DB } from '~/db';
import { role } from '~/factory/api/classes/role';
import { execute } from '~/tasks';

export function replace(this: DB, roleName: string) {
  const self = this;

  return async function replaceMethod(options: FaunaRoleOptions = {}) {
    return execute(
      [
        {
          name: `Replace [${roleName}]`,
          task() {
            return self.query(role.replace.call(self, roleName, options));
          },
        },
      ],
      {
        domain: 'DB.role.replace',
      },
    );
  };
}
