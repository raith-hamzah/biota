import { DBFactoryFQLBaseGet } from "~/../types/factory/factory.fql.base";
import { query as q } from "faunadb";

export const get: DBFactoryFQLBaseGet = {
  document(collection, id) {
    return q.Get(q.Ref(q.Collection(collection), id));
  },
  collection(name) {
    return q.Get(q.Collection(name));
  },
  collections(pagination) {
    return q.Paginate(q.Collections(), pagination);
  },
  index(name) {
    return q.Get(q.Index(name));
  },
  indexes(pagination) {
    return q.Paginate(q.Indexes(), pagination);
  },
  udfunction(name) {
    return q.Get(q.Function(name));
  },
  udfunctions(pagination) {
    return q.Paginate(q.Functions(), pagination);
  },
  database(name) {
    return q.Get(q.Database(name));
  },
  databases(pagination) {
    return q.Paginate(q.Databases(), pagination);
  },
  role(name) {
    return q.Get(q.Role(name));
  },
  roles(pagination) {
    return q.Paginate(q.Roles(), pagination);
  },
  key(id) {
    return q.Get(q.Ref(q.Keys(), id));
  },
  keys(pagination) {
    return q.Paginate(q.Keys(), pagination);
  },
  token(id) {
    return q.Get(q.Ref(q.Tokens(), id));
  },
  tokens(pagination) {
    return q.Paginate(q.Documents(q.Tokens()), pagination);
  },
  credentials(pagination) {
    return q.Paginate(q.Documents(q.Credentials()), pagination);
  },
};