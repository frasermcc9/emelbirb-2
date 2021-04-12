/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ModifyServer
// ====================================================

export interface ModifyServer_modifyServer {
  __typename: "ServerType";
  guildId: string;
  memberCounter: string | null;
  prefix: string | null;
  dateOfEntry: any | null;
  lastUpdated: any | null;
  disabledGroups: string[];
}

export interface ModifyServer {
  modifyServer: ModifyServer_modifyServer;
}

export interface ModifyServerVariables {
  id: string;
  prefix?: string | null;
}
