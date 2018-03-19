import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import {
  Container,
  Header,
  Segment,
} from 'semantic-ui-react'

import HeroBlock from './HeroBlock'
import BusinessCardList from './BusinessCardList'

const endPoint = 'https://api.yelp.com/v3/graphql'
const APIProxy = process.env.NODE_ENV === 'production' ?
  'http://yelp-api-proxy.tkain.tw' :
  'http://localhost:8080'
const client = new ApolloClient({
  link: new HttpLink({
    uri: `${APIProxy}/${endPoint}`,
    headers: {
      'Accept-Language': 'zh_TW'
    }
  }),
  cache: new InMemoryCache(),
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: null,
      datetime: null,
    }
    this._updateQuery = this._updateQuery.bind(this)
  }

  _updateQuery(location, datetime) {
    this.setState({
      location,
      datetime,
    })
  }

  render() {
    let {
      datetime,
      location,
    } = this.state
    return (
      <ApolloProvider client={client}>
        <div>
          <HeroBlock onSubmit={this._updateQuery}/>
          <Container className='business-card-list__container'>
            {
              location ?
                <BusinessCardList
                  datetime={datetime}
                  location={location}
                /> :
                <Header as='h3' textAlign='center'>Try enter a location!</Header>
            }
          </Container>
          <Segment inverted vertical textAlign='center'>
            All rights reserved.
          </Segment>
        </div>
      </ApolloProvider>
    )
  }
}

export default App
