import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  Image,
  List,
  Rating,
} from 'semantic-ui-react'

import Address from './Address'
import OpenHours from './OpenHours'

const BusinessCard = ({ 
  categories,
  display_phone,
  hours,
  location: { formatted_address },
  name,
  photos,
  price,
  rating,
  review_count,
  url,
}) => (
  <Card className='card' fluid>
    <Image src={photos[0]} />
    <Card.Content>
      <Card.Header href={url}>
        {name}
      </Card.Header>
      <Card.Meta>
        {categories.map(({ title }) => (
          <span key={title}>{title}</span>
        ))}
        {price && <span>{price}</span>}
      </Card.Meta>
      <Card.Description>
        <div>
          <Rating icon='star' disabled rating={Math.round(rating)} maxRating={5} />
          <span className='review__count'>
            {review_count} reviews
          </span>
        </div>
        <List>
          {formatted_address && <List.Item icon='paw' content={Address(formatted_address)} />}
          {display_phone && <List.Item icon='phone' content={display_phone} />}
          {hours && <List.Item icon='clock' content={OpenHours(hours)} />}
        </List>
      </Card.Description>
    </Card.Content>
  </Card>
)

BusinessCard.propTypes = {
  categories: PropTypes.array,
  display_phone: PropTypes.string,
  hours: PropTypes.array,
  location: PropTypes.shape({
    formatted_address: PropTypes.string,
  }),
  name: PropTypes.string,
  photos: PropTypes.array,
  price: PropTypes.string,
  rating: PropTypes.number,
  review_count: PropTypes.number,
  url: PropTypes.string,
}

export default BusinessCard
