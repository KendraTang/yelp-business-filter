import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import BusinessCardList from './BusinessCardList'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.yelp.com/v3/graphql',
  }),
  cache: new InMemoryCache()
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: '',
      datetime: '',
    }
    this._handleChange = this._handleChange.bind(this)
  }

  _handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    let { datetime, location } = this.state
    return (
      <ApolloProvider client={client}>
        <div>
          <input
            type='text'
            name='location'
            value={location}
            onChange={this._handleChange}
          />
          <input
            type='datetime-local'
            name='datetime'
            value={datetime}
            onChange={this._handleChange}
          />
          <BusinessCardList
            datetime={datetime}
            location={location}
          />
        </div>
      </ApolloProvider>
    )
  }
}

export default App
