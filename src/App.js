import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import {
  Container,
  Form,
  Header,
  Icon,
  Menu,
} from 'semantic-ui-react'
import moment from 'moment'

import BusinessCardList from './BusinessCardList'

const endPoint = 'https://api.yelp.com/v3/graphql'
const client = new ApolloClient({
  link: new HttpLink({
    uri: `http://localhost:8080/${endPoint}`,
    headers: {
      'Accept-Language': 'en_US'
    }
  }),
  cache: new InMemoryCache()
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: 'taipei',
      datetime: moment().format('YYYY-MM-DDTHH:mm:ss'),
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
          <Menu
            stackable
            inverted
            fixed='top'
            className='menu__transparent'
          >
            <Menu.Item>
              <Icon name='yelp' size='big' />
            </Menu.Item>
            <Menu.Item
              name='explore'
              active={true}
            >
              <Icon name='rocket' />
              Explore
            </Menu.Item>
          </Menu>
          <div className='hero__block'>
            <Container className='hero__container'>
              <Header
                as='h1'
                inverted
                content="Let's explore!"
                className='hero__text'
              />
              <Form className='hero__form'>
                <Form.Group>
                  <Form.Input
                    type='text'
                    icon='search'
                    placeholder='Enter a location'
                    size='huge'
                    value={location}
                    onChange={this._handleChange}
                  />
                  <Form.Input
                    type='datetime-local'
                    size='huge'
                    value={datetime}
                    onChange={this._handleChange}
                  />
                  <Form.Button size='huge'>
                    Get Started
                    <Icon name='right arrow' />
                  </Form.Button>
                </Form.Group>
              </Form>
            </Container>
          </div>
          <Container text>
            <BusinessCardList
              datetime={datetime}
              location={location}
            />
          </Container>
        </div>
      </ApolloProvider>
    )
  }
}

export default App
