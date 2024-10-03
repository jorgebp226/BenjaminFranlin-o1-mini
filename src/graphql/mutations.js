/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createVirtud = /* GraphQL */ `
  mutation CreateVirtud(
    $input: CreateVirtudInput!
    $condition: ModelVirtudConditionInput
  ) {
    createVirtud(input: $input, condition: $condition) {
      id
      nombre
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateVirtud = /* GraphQL */ `
  mutation UpdateVirtud(
    $input: UpdateVirtudInput!
    $condition: ModelVirtudConditionInput
  ) {
    updateVirtud(input: $input, condition: $condition) {
      id
      nombre
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteVirtud = /* GraphQL */ `
  mutation DeleteVirtud(
    $input: DeleteVirtudInput!
    $condition: ModelVirtudConditionInput
  ) {
    deleteVirtud(input: $input, condition: $condition) {
      id
      nombre
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const createSemana = /* GraphQL */ `
  mutation CreateSemana(
    $input: CreateSemanaInput!
    $condition: ModelSemanaConditionInput
  ) {
    createSemana(input: $input, condition: $condition) {
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
export const updateSemana = /* GraphQL */ `
  mutation UpdateSemana(
    $input: UpdateSemanaInput!
    $condition: ModelSemanaConditionInput
  ) {
    updateSemana(input: $input, condition: $condition) {
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
export const deleteSemana = /* GraphQL */ `
  mutation DeleteSemana(
    $input: DeleteSemanaInput!
    $condition: ModelSemanaConditionInput
  ) {
    deleteSemana(input: $input, condition: $condition) {
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
