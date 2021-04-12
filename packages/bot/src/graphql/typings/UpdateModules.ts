/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateModules
// ====================================================

export interface UpdateModules_updateModules {
  __typename: "GlobalType";
  commandGroups: string[] | null;
  commandDescriptions: string[] | null;
}

export interface UpdateModules {
  updateModules: UpdateModules_updateModules;
}

export interface UpdateModulesVariables {
  modules: string[];
  descriptions: string[];
}
