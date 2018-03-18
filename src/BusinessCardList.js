import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'
import {
  Card,
  Container,
  Grid,
  Header,
  Image,
  Loader,
} from 'semantic-ui-react'
import moment from 'moment'

const getBusiness = gql`
  query getBusiness($location: String!) {
    search(location: $location
          sort_by: "rating"
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

  _content() {
    let { data: { loading, error, search, variables } } = this.props
    if (loading) return <Loader active inline='centered' />
    if (variables.location === '') return <Header as='h3' textAlign='center'>Try enter a location!</Header>
    if (error) return <div>Oops, something went wrong :(</div>
    return (
      <Grid
        stackable
        columns={3}
      >
        {search.business.filter(this._filterByDatetime).map((b) =>
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

  render() {
    return (
      <Container className='business-card-list__container'>
        {this._content()}
      </Container>
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
