import { execute } from '~/tools/tasks';
import { FactoryUser } from '~/types/factory/factory.user';
import { FrameworkUserApi } from '~/types/framework/framework.user';
import { google } from '~/framework/auth/providers/google';
import { query as q } from 'faunadb';
import { encrypt } from '~/helpers/crypto';

export const authGoogleSyncUrl: FactoryUser<FrameworkUserApi['auth']['google']['syncUrl']> = function (id = null) {
  const self = this;

  return async (options) => {
    return execute(
      [
        {
          name: `Sync url for google account`,
          async task() {
            // client_id && redirect_uri required
            const { state = {} } = options || {};
            return self.query(q.HasIdentity()).then((hasIdentity) => {
              if (hasIdentity && self.secret) {
                const { iv, encrypted } = encrypt(self.secret, self.private_key || '');
                return google.connectUrl({
                  ...options,
                  state: {
                    ...state,
                    scenario: 'register',
                    user: encrypted,
                    iv,
                  },
                });
              } else {
                return {
                  url: undefined,
                };
              }
            });
          },
        },
      ],
      {
        domain: 'Biota.user.auth.google.syncUrl',
      },
    );
  };
};