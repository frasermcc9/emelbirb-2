import { gql } from "@apollo/client";

export const QUERY_DISCORD_GUILD = gql`
  query GetDiscordGuild($id: String!) {
    getDiscordGuild(id: $id) {
      id
      name
      memberCount
      icon
      voiceChannelCount
      textChannelCount
      createdTimestamp
      region
      premiumSubscriptionCount
      roleCount
      owner {
        id
        username
        avatar
        createdTimestamp
        bot
      }
    }
  }
`;
