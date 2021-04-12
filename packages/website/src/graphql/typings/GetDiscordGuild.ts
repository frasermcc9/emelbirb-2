/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetDiscordGuild
// ====================================================

export interface GetDiscordGuild_getDiscordGuild_owner {
  __typename: "DiscordUserType";
  id: string;
  username: string;
  avatar: string | null;
  createdTimestamp: number;
  bot: boolean;
}

export interface GetDiscordGuild_getDiscordGuild {
  __typename: "DiscordGuildType";
  id: string;
  name: string;
  memberCount: number;
  icon: string | null;
  voiceChannelCount: number;
  textChannelCount: number;
  createdTimestamp: number | null;
  region: string;
  premiumSubscriptionCount: number | null;
  roleCount: number;
  owner: GetDiscordGuild_getDiscordGuild_owner | null;
}

export interface GetDiscordGuild {
  getDiscordGuild: GetDiscordGuild_getDiscordGuild;
}

export interface GetDiscordGuildVariables {
  id: string;
}
