import { FrameworkUsersApi } from '~/types/framework/framework.users';
import { users } from '~/factory/api/users';
import { execute } from '~/tools/tasks';

export const getMany: FrameworkUsersApi['getMany'] = async function (nameList) {
  const self = this;

  return execute(
    [
      {
        name: `Get many users`,
        task() {
          return self.query(users(self.context).getMany(nameList));
        },
      },
    ],
    {
      domain: 'Biota.users.getMany',
    },
  );
};
