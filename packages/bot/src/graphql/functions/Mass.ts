import { gql } from "@apollo/client/core";

export { QUERY_ALL_PREFIXES };

const QUERY_ALL_PREFIXES = gql`
  query GetAllPrefixes {
    getAllPrefixes {
      guildId
      prefix
    }
  }
`;
