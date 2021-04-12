/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetInitialSettings
// ====================================================

export interface GetInitialSettings_getInitialSettings {
  __typename: "SimpleServerType";
  guildId: string;
  prefix: string | null;
  disabledGroups: string[];
}

export interface GetInitialSettings {
  getInitialSettings: GetInitialSettings_getInitialSettings[];
}
