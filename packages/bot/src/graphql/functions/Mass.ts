import { gql } from "@apollo/client/core";

export { QUERY_INITIAL_SETTINGS };

const QUERY_INITIAL_SETTINGS = gql`
  query GetInitialSettings {
    getInitialSettings {
      guildId
      prefix
      disabledGroups
    }
  }
`;
