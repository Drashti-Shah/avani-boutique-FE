import { gql } from '@apollo/client';

export const INQURY = gql`
mutation CreateInquiry($firstName: String!, $lastName: String!, $email: String!, $message: String!) {
    createInquiry(
      data: { firstName: $firstName, lastName: $lastName, email: $email, message: $message, attended: false }
    ) {
      data {
        id
        attributes {
          firstName
          lastName
          email
          message
        }
      }
    }
  }
`;