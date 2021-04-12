/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateLog
// ====================================================

export interface CreateLog_log {
  __typename: "NullType";
  never: boolean | null;
}

export interface CreateLog {
  log: CreateLog_log;
}

export interface CreateLogVariables {
  invokingUser?: string | null;
  reason?: string | null;
  message?: string | null;
  affectedUsers?: string[] | null;
  time?: any | null;
  guild: string;
  command?: string | null;
  importance?: number | null;
}
