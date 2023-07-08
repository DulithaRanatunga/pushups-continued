/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBank = /* GraphQL */ `
  query GetBank($id: ID!) {
    getBank(id: $id) {
      id
      date
      count
      owner
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listBanks = /* GraphQL */ `
  query ListBanks(
    $filter: ModelBankFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBanks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        count
        owner
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getLeaderboard = /* GraphQL */ `
  query GetLeaderboard($id: ID!) {
    getLeaderboard(id: $id) {
      id
      user
      count
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listLeaderboards = /* GraphQL */ `
  query ListLeaderboards(
    $filter: ModelLeaderboardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLeaderboards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user
        count
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
