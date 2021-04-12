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


/** Discord guild parameters */
export type DiscordGuildType = {
  __typename?: 'DiscordGuildType';
  id: Scalars['ID'];
  name: Scalars['String'];
  memberCount: Scalars['Int'];
  icon?: Maybe<Scalars['String']>;
  voiceChannelCount: Scalars['Int'];
  textChannelCount: Scalars['Int'];
  createdTimestamp?: Maybe<Scalars['Float']>;
  region: Scalars['String'];
  premiumSubscriptionCount?: Maybe<Scalars['Int']>;
  roleCount: Scalars['Int'];
  owner?: Maybe<DiscordUserType>;
};

/** Discord user parameters */
export type DiscordUserType = {
  __typename?: 'DiscordUserType';
  id: Scalars['ID'];
  username: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  createdTimestamp: Scalars['Float'];
  bot: Scalars['Boolean'];
};

/** Provides settings for the entire bot */
export type GlobalType = {
  __typename?: 'GlobalType';
  dateOfEntry?: Maybe<Scalars['DateTime']>;
  lastUpdated?: Maybe<Scalars['DateTime']>;
  commandGroups?: Maybe<Array<Scalars['String']>>;
  commandDescriptions?: Maybe<Array<Scalars['String']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  modifyServer: ServerType;
  toggleBlocked: ServerType;
  updateModules: GlobalType;
};


export type MutationModifyServerArgs = {
  prefix?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};


export type MutationToggleBlockedArgs = {
  toggleBlocked: Scalars['String'];
  id: Scalars['String'];
};


export type MutationUpdateModulesArgs = {
  modules: Array<Scalars['String']>;
  descriptions: Array<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getServer: ServerType;
  getInitialSettings: Array<SimpleServerType>;
  getDiscordGuild: DiscordGuildType;
  fetchModules: GlobalType;
};


export type QueryGetServerArgs = {
  id: Scalars['String'];
};


export type QueryGetDiscordGuildArgs = {
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

/** Provides startup settings of a guild */
export type SimpleServerType = {
  __typename?: 'SimpleServerType';
  guildId: Scalars['String'];
  prefix?: Maybe<Scalars['String']>;
  disabledGroups: Array<Scalars['String']>;
};
