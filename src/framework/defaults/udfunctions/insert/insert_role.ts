import { query as q } from 'faunadb';
import { UDFunction, udfunctionNameNormalized } from '~/factory/classes/udfunction';
import { insert as insertFQLUDF } from '~/factory/api/fql/udf/insert';

export const InsertRole = UDFunction({
  name: udfunctionNameNormalized('InsertRole'),
  body: q.Query(q.Lambda(['identity', 'private_key', 'name', 'options'], insertFQLUDF.role(q.Var('name') as any, q.Var('options') as any))),
});
