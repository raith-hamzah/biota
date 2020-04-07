import { query as q } from "faunadb";
import { UDFunction, udfunctionNameNormalized } from "~/factory/classes/udfunction";
import { clean as cleanFQLUDF } from "~/factory/api/fql/udf/clean";

export const CleanKey = UDFunction({
  name: udfunctionNameNormalized("CleanKey"),
  body: q.Query((identity, id) => cleanFQLUDF.key(id)),
});