export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};


export type Mutation = {
  __typename?: 'Mutation';
  modifyServer: ServerType;
};


export type MutationModifyServerArgs = {
  prefix?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getServer: ServerType;
  getAllPrefixes: Array<SimpleServerType>;
};


export type QueryGetServerArgs = {
  id: Scalars['String'];
};

/** Provides settings for each server */
export type ServerType = {
  __typename?: 'ServerType';
  guildId: Scalars['String'];
  memberCounter?: Maybe<Scalars['String']>;
  prefix?: Maybe<Scalars['String']>;
  dateOfEntry?: Maybe<Scalars['DateTime']>;
  lastUpdated?: Maybe<Scalars['DateTime']>;
  disabledGroups: Array<Scalars['String']>;
};

/** Provides just the prefix and ID of a server */
export type SimpleServerType = {
  __typename?: 'SimpleServerType';
  guildId: Scalars['String'];
  prefix?: Maybe<Scalars['String']>;
};
