import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import {
  Card,
  Grid,
  Image,
  Loader,
} from 'semantic-ui-react'
import moment from 'moment'

const getBusiness = gql`
  query getBusiness($location: String!) {
    search(location: $location, limit: 50) {
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
        location {
          formatted_address
        }
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
    let datetime = moment(this.props.datetime, 'YYYY-MM-DDTHH:mm:ss')
    const convert = (s, day) =>
      moment(s, 'HHmm')
        .year(datetime.year())
        .month(datetime.month())
        .date(datetime.date())
        .isoWeekday(day + 1)

    return business.hours[0].open.some((x) => {
      let startTime = convert(x.start, x.day)
      let endTime = convert(x.end, x.day)
      if (startTime.isAfter(datetime)) {
        startTime.subtract(7, 'day')
        endTime.subtract(7, 'day')
      }
      if (endTime.isBefore(startTime) || x.is_overnight) {
        endTime.add(1, 'day')
      }
      return datetime.isBetween(startTime, endTime)
    })
  }

  render() {
    let { data: { loading, error, search } } = this.props
    if (loading) return <Loader active inline='centered' />
    if (error) {
      if (error.message.includes('LOCATION_NOT_FOUND')) {
        return (
          <div>Sorry, location not found :(</div>
        )
      }
      return <div>Oops, something went wrong :(</div>
    }
    let business = [...search.business].sort((a, b) => a.rating - b.rating).filter(this._filterByDatetime)
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
            <Card
              href={b.url}
              className='card'
              fluid
            >
              <Image src={b.photos} />
              <Card.Content>
                <Card.Header>
                  {b.name}
                </Card.Header>
                <Card.Meta >
                  <span className='price'>
                    {b.price}
                  </span>
                  <span className='rating'>
                    {b.rating}
                  </span>
                  <span className='review__count'>
                    {b.review_count} reviews
                  </span>
                </Card.Meta>
                <Card.Description>
                  {b.location.formatted_address}
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        )}
      </Grid>
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
