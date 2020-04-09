import { query as q } from "faunadb";
import { UDFunction, udfunctionNameNormalized } from "~/factory/classes/udfunction";
import { delete_ as deleteFQLUDF } from "~/factory/api/fql/udf/delete";

export const DeleteDatabase = UDFunction({
  name: udfunctionNameNormalized("DeleteDatabase"),
  body: q.Query(q.Lambda(["identity", "private_key", "name"], deleteFQLUDF.database(q.Var("name") as any))),
});