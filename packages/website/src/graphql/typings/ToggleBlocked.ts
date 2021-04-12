/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleBlocked
// ====================================================

export interface ToggleBlocked_toggleBlocked {
  __typename: "ServerType";
  guildId: string;
  disabledGroups: string[];
}

export interface ToggleBlocked {
  toggleBlocked: ToggleBlocked_toggleBlocked;
}

export interface ToggleBlockedVariables {
  id: string;
  toggleBlocked: string;
}
