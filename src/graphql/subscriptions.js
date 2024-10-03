/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateVirtud = /* GraphQL */ `
  subscription OnCreateVirtud(
    $filter: ModelSubscriptionVirtudFilterInput
    $owner: String
  ) {
    onCreateVirtud(filter: $filter, owner: $owner) {
      id
      nombre
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateVirtud = /* GraphQL */ `
  subscription OnUpdateVirtud(
    $filter: ModelSubscriptionVirtudFilterInput
    $owner: String
  ) {
    onUpdateVirtud(filter: $filter, owner: $owner) {
      id
      nombre
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteVirtud = /* GraphQL */ `
  subscription OnDeleteVirtud(
    $filter: ModelSubscriptionVirtudFilterInput
    $owner: String
  ) {
    onDeleteVirtud(filter: $filter, owner: $owner) {
      id
      nombre
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onCreateSemana = /* GraphQL */ `
  subscription OnCreateSemana(
    $filter: ModelSubscriptionSemanaFilterInput
    $owner: String
  ) {
    onCreateSemana(filter: $filter, owner: $owner) {
      id
      userId
      semana
      virtudObjetivo
      dias {
        idVirtud
        estado
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onUpdateSemana = /* GraphQL */ `
  subscription OnUpdateSemana(
    $filter: ModelSubscriptionSemanaFilterInput
    $owner: String
  ) {
    onUpdateSemana(filter: $filter, owner: $owner) {
      id
      userId
      semana
      virtudObjetivo
      dias {
        idVirtud
        estado
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const onDeleteSemana = /* GraphQL */ `
  subscription OnDeleteSemana(
    $filter: ModelSubscriptionSemanaFilterInput
    $owner: String
  ) {
    onDeleteSemana(filter: $filter, owner: $owner) {
      id
      userId
      semana
      virtudObjetivo
      dias {
        idVirtud
        estado
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
