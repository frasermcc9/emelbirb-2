/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetServer
// ====================================================

export interface GetServer_getServer {
  __typename: "ServerType";
  guildId: string;
  memberCounter: string | null;
  prefix: string | null;
  dateOfEntry: any | null;
  lastUpdated: any | null;
  disabledGroups: string[];
}

export interface GetServer {
  getServer: GetServer_getServer;
}

export interface GetServerVariables {
  id: string;
}
