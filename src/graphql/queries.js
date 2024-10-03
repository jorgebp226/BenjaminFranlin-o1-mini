/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVirtud = /* GraphQL */ `
  query GetVirtud($id: ID!) {
    getVirtud(id: $id) {
      id
      nombre
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listVirtuds = /* GraphQL */ `
  query ListVirtuds(
    $filter: ModelVirtudFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVirtuds(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nombre
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getSemana = /* GraphQL */ `
  query GetSemana($id: ID!) {
    getSemana(id: $id) {
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
export const listSemanas = /* GraphQL */ `
  query ListSemanas(
    $filter: ModelSemanaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSemanas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        semana
        virtudObjetivo
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
