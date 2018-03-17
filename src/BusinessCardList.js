import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import moment from 'moment'

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
  constructor(props) {
    super(props)
    this._filterByDatetime = this._filterByDatetime.bind(this)
  }

  _filterByDatetime(business) {
    if (!this.props.datetime) return true
    if (!business.hours || !business.hours[0]) return false
    let datetime = moment(this.props.datetime)
    return business.hours[0].open.reduce((s, x) => {
      let weekday = x.day + 1 // Weekday of yelp starts from Monday while  moment.js starts from Sunday
      let startTime = moment(x.start, 'hmm').isoWeekday(weekday)
      let endTime = moment(x.end, 'hmm').isoWeekday(weekday)
      if (endTime < startTime) {
        endTime.isoWeekday(weekday + 1)
      }
      return s || (datetime >= startTime && datetime <= endTime)
    }, false)
  }

  render() {
    let { data: { loading, error, search, variables } } = this.props
    if (loading) return <div>Loading...</div>
    if (variables.location === '') return <div>Enter a location!</div>
    if (error) return <div>Oops, something went wrong :(</div>
    return (
      search.business.filter(this._filterByDatetime).map((b) =>
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
