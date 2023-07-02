/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBank = /* GraphQL */ `
  subscription OnCreateBank(
    $filter: ModelSubscriptionBankFilterInput
    $owner: String
  ) {
    onCreateBank(filter: $filter, owner: $owner) {
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
export const onUpdateBank = /* GraphQL */ `
  subscription OnUpdateBank(
    $filter: ModelSubscriptionBankFilterInput
    $owner: String
  ) {
    onUpdateBank(filter: $filter, owner: $owner) {
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
export const onDeleteBank = /* GraphQL */ `
  subscription OnDeleteBank(
    $filter: ModelSubscriptionBankFilterInput
    $owner: String
  ) {
    onDeleteBank(filter: $filter, owner: $owner) {
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
