import { Expr } from 'faunadb';
import { FaunaId, FaunaRef, FaunaDocumentOptions, FaunaString } from '../fauna';
import { DocumentAuthAccount } from '../document';
import { FactoryDocumentApi } from './factory.document';

export interface FactoryDocumentAuthAccountsApi<OT = Expr> {
  distinct(account: DocumentAuthAccount): OT;
  difference(provider: FaunaString, accountId: FaunaString): OT;
  set(account: DocumentAuthAccount): OT;
  remove(provider: FaunaString, accountId: FaunaString): OT;
}

export interface FactoryDocumentAuthEmailApi<OT = Expr> {
  set(email: FaunaString): OT;
  remove(): OT;
}

export interface FactoryDocumentAuthApi<OT = Expr> {
  email: FactoryDocumentAuthEmailApi<OT>;
  accounts: FactoryDocumentAuthAccountsApi<OT>;
}

export type FactoryUser<OT = FactoryUserApi> = (idOrRef?: FaunaId | FaunaRef) => OT;

export interface FactoryUserApi<OT = Expr> extends FactoryDocumentApi<Expr> {
  register(email: FaunaString, password: FaunaString, data?: FaunaDocumentOptions['data']): OT;
  registerWithAuthAccount(account: DocumentAuthAccount): OT;
  login(email: FaunaString, password: FaunaString): OT;
  loginWithAuthAccount(account: DocumentAuthAccount): OT;
  logout(everywhere: boolean): OT;
  changePassword(currentPassword: FaunaString, password: FaunaString): OT;
  auth: FactoryDocumentAuthApi;
}
