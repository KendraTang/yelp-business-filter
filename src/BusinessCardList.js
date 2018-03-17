import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

const getBusiness = gql`
  query getBusiness($location: String!) {
    search(location: $location) {
      business {
        id
        name
        url
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
      }
    }
  }
`

class BusinessCardList extends Component {
  render() {
    let { data: { loading, error, search, variables } } = this.props
    if (loading) return <div>Loading...</div>
    if (variables.location === '') return <div>Enter a location!</div>
    if (error) return <div>Oops, something went wrong :(</div>
    return (
      search.business.map((b) =>
        <div key={b.id}>
          <a href={b.url}>
            {b.name}
          </a>
          <ul>
            {b.hours[0].open.map((h, i) =>
              <li key={i}>
                {h.day} {h.start} {h.end}
              </li>
            )}
          </ul>
        </div>
      )
    )
  }
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
