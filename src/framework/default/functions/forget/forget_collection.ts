import { query as q } from "faunadb";
import { UDFunction, udfunctionNameNormalized } from "~/factory/classes/udfunction";
import { forget as forgetFQLUDF } from "~/factory/api/fql/udf/forget";

export const ForgetCollection = UDFunction({
  name: udfunctionNameNormalized("ForgetCollection"),
  body: q.Query((identity, private_key, name) => forgetFQLUDF.collection(name)),
});
