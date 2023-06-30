/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateNote = /* GraphQL */ `
  subscription OnCreateNote($filter: ModelSubscriptionNoteFilterInput) {
    onCreateNote(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateNote = /* GraphQL */ `
  subscription OnUpdateNote($filter: ModelSubscriptionNoteFilterInput) {
    onUpdateNote(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteNote = /* GraphQL */ `
  subscription OnDeleteNote($filter: ModelSubscriptionNoteFilterInput) {
    onDeleteNote(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateBank = /* GraphQL */ `
  subscription OnCreateBank($filter: ModelSubscriptionBankFilterInput) {
    onCreateBank(filter: $filter) {
      id
      date
      count
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateBank = /* GraphQL */ `
  subscription OnUpdateBank($filter: ModelSubscriptionBankFilterInput) {
    onUpdateBank(filter: $filter) {
      id
      date
      count
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteBank = /* GraphQL */ `
  subscription OnDeleteBank($filter: ModelSubscriptionBankFilterInput) {
    onDeleteBank(filter: $filter) {
      id
      date
      count
      createdAt
      updatedAt
      __typename
    }
  }
`;
