import { gql } from '@apollo/client';

export const GET_SLIDER = gql`
  query ($sliderName: String!) {
    sliders(filters: { sliderName: { eq: $sliderName } }) {
      data {
        attributes{
          sliderImage {
            data {
              id
              attributes {
                width
                height
                hash
                name
              }
            }
          }
          sliderName
        }
      }
    }
  }
`;