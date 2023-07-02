/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBank = /* GraphQL */ `
  mutation CreateBank(
    $input: CreateBankInput!
    $condition: ModelBankConditionInput
  ) {
    createBank(input: $input, condition: $condition) {
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
export const updateBank = /* GraphQL */ `
  mutation UpdateBank(
    $input: UpdateBankInput!
    $condition: ModelBankConditionInput
  ) {
    updateBank(input: $input, condition: $condition) {
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
export const deleteBank = /* GraphQL */ `
  mutation DeleteBank(
    $input: DeleteBankInput!
    $condition: ModelBankConditionInput
  ) {
    deleteBank(input: $input, condition: $condition) {
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
