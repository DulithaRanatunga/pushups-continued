/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateBankInput = {
  id?: string | null,
  date: string,
  count: number,
  owner?: string | null,
};

export type ModelBankConditionInput = {
  date?: ModelStringInput | null,
  count?: ModelIntInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelBankConditionInput | null > | null,
  or?: Array< ModelBankConditionInput | null > | null,
  not?: ModelBankConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Bank = {
  __typename: "Bank",
  id: string,
  date: string,
  count: number,
  owner?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateBankInput = {
  id: string,
  date?: string | null,
  count?: number | null,
  owner?: string | null,
};

export type DeleteBankInput = {
  id: string,
};

export type ModelBankFilterInput = {
  id?: ModelIDInput | null,
  date?: ModelStringInput | null,
  count?: ModelIntInput | null,
  owner?: ModelStringInput | null,
  and?: Array< ModelBankFilterInput | null > | null,
  or?: Array< ModelBankFilterInput | null > | null,
  not?: ModelBankFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelBankConnection = {
  __typename: "ModelBankConnection",
  items:  Array<Bank | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionBankFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  date?: ModelSubscriptionStringInput | null,
  count?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionBankFilterInput | null > | null,
  or?: Array< ModelSubscriptionBankFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreateBankMutationVariables = {
  input: CreateBankInput,
  condition?: ModelBankConditionInput | null,
};

export type CreateBankMutation = {
  createBank?:  {
    __typename: "Bank",
    id: string,
    date: string,
    count: number,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateBankMutationVariables = {
  input: UpdateBankInput,
  condition?: ModelBankConditionInput | null,
};

export type UpdateBankMutation = {
  updateBank?:  {
    __typename: "Bank",
    id: string,
    date: string,
    count: number,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteBankMutationVariables = {
  input: DeleteBankInput,
  condition?: ModelBankConditionInput | null,
};

export type DeleteBankMutation = {
  deleteBank?:  {
    __typename: "Bank",
    id: string,
    date: string,
    count: number,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetBankQueryVariables = {
  id: string,
};

export type GetBankQuery = {
  getBank?:  {
    __typename: "Bank",
    id: string,
    date: string,
    count: number,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListBanksQueryVariables = {
  filter?: ModelBankFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBanksQuery = {
  listBanks?:  {
    __typename: "ModelBankConnection",
    items:  Array< {
      __typename: "Bank",
      id: string,
      date: string,
      count: number,
      owner?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateBankSubscriptionVariables = {
  filter?: ModelSubscriptionBankFilterInput | null,
  owner?: string | null,
};

export type OnCreateBankSubscription = {
  onCreateBank?:  {
    __typename: "Bank",
    id: string,
    date: string,
    count: number,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateBankSubscriptionVariables = {
  filter?: ModelSubscriptionBankFilterInput | null,
  owner?: string | null,
};

export type OnUpdateBankSubscription = {
  onUpdateBank?:  {
    __typename: "Bank",
    id: string,
    date: string,
    count: number,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteBankSubscriptionVariables = {
  filter?: ModelSubscriptionBankFilterInput | null,
  owner?: string | null,
};

export type OnDeleteBankSubscription = {
  onDeleteBank?:  {
    __typename: "Bank",
    id: string,
    date: string,
    count: number,
    owner?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
