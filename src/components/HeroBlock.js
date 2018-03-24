import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Form,
  Grid,
  Header,
  Icon,
  Menu,
  Visibility,
} from 'semantic-ui-react'
import moment from 'moment'

class HeroBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fixed: false,
      location: '',
      datetime: moment().format('YYYY-MM-DDTHH:mm'),
    }
    this._hideFixedMenu = this._hideFixedMenu.bind(this)
    this._showFixedMenu = this._showFixedMenu.bind(this)
    this._handleChange = this._handleChange.bind(this)
  }

  _hideFixedMenu(){
    this.setState({ fixed: false })
  }

  _showFixedMenu() {
    this.setState({ fixed: true })
  }

  _handleChange({ target: { name, value }}) {
    this.setState({
      [name]: value
    })
  }

  render() {
    let { onSubmit } = this.props
    let {
      fixed,
      datetime,
      location,
    } = this.state
    return (
      <div className='hero'>
        <Visibility once={false} onBottomPassed={this._showFixedMenu} onBottomPassedReverse={this._hideFixedMenu}>
          <Menu
            fixed={fixed ? 'top' : null}
            inverted={true}
            stackable
            className='header__menu'
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
        </Visibility>
        <Container className='hero__container'>
          <Header
            as='h1'
            inverted
            content="Let's explore!"
            className='hero__text'
          />
          <Form
            className='hero__form'
            onSubmit={() => onSubmit(location, datetime)}
            size='huge'
            widths='equal'
          >
            <Grid
              stackable
              columns={3}
            >
              <Grid.Column>
                <Form.Input
                  type='text'
                  icon='map marker alternate'
                  name='location'
                  required
                  placeholder='Enter a location'
                  value={location}
                  onChange={this._handleChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Input
                  type='datetime-local'
                  name='datetime'
                  required
                  value={datetime}
                  onChange={this._handleChange}
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Button size='huge'>
                  Get Started
                  <Icon name='right arrow' />
                </Form.Button>
              </Grid.Column>
            </Grid>
          </Form>
        </Container>
      </div>
    )
  }
}

HeroBlock.propTypes = {
  onSubmit: PropTypes.func,
}

export default HeroBlock
