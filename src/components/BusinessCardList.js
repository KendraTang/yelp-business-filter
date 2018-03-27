import React from 'react'
import PropTypes from 'prop-types'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import {
  Grid,
  Loader,
} from 'semantic-ui-react'

import BusinessCard from './BusinessCard'
import { isOpenAt } from '../utils'

const getBusiness = gql`
  query getBusiness($location: String!) {
    search(term: "restaurant",
            location: $location,
            limit: 50) {
      business {
        id
        name
        url
        review_count
        hours {
          open {
            is_overnight
            day
            start
            end
          }
        }
        rating
        price
        photos
        display_phone
        location {
          formatted_address
        }
        categories {
          title
          alias
        }
      }
    }
  }
`

const BusinessCardList = ({ data: { loading, error, search }, datetime }) => {
  if (loading) return <Loader active inline='centered' />
  if (error) {
    if (error.message.includes('LOCATION_NOT_FOUND')) {
      return (
        <div>Sorry, location not found :(</div>
      )
    }
    return <div>Oops, something went wrong :(</div>
  }
  let business = [...search.business]
    .sort((a, b) => b.rating - a.rating)
    .filter(({ hours }) => isOpenAt(hours, datetime))
  if (business.length === 0) {
    return <div>No valid business :(</div>
  }
  return (
    <Grid
      stackable
      columns={3}
    >
      {business.map((b) =>
        <Grid.Column
          key={b.id}
          stretched
        >
          <BusinessCard {...b} />
        </Grid.Column>
      )}
    </Grid>
  )
}

BusinessCardList.propTypes = {
  data: PropTypes.object,
  datetime: PropTypes.string,
  location: PropTypes.string,
}

export default graphql(getBusiness, {
  options: (props) => {
    return ({
      variables: {
        location: props.location,
      },
    })
  }
})(BusinessCardList)
