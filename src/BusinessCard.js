import React from 'react'
import PropTypes from 'prop-types'
import nl2br from 'react-nl2br'
import {
  Card,
  Image,
  List,
  Rating,
} from 'semantic-ui-react'
import moment from 'moment'
import _ from 'lodash'

const Address = (address) => 
  // Add whitespace between ASCII and CJK characters, and convert newline to
  // <br>
  nl2br(address
    .replace(/(\w)(?=[\u2E80-\u9FFF])/g, '$1 ')
    .replace(/([\u2E80-\u9FFF])(?=\w)/g, '$1 ')
  )

const OpenHour = ({day, hour}) => {
  const WEEKDAY_NAMES = '一二三四五六日'
  const add_colon = t => moment(t, 'HHmm').format('HH:mm')
  let open = hour.map(({ start, end }) => (
    start === '0000' && end === '0000' ?
      '全日營業' :
      `${add_colon(start)} ~ ${add_colon(end)}`
  )).join(', ')
  return (
    <div>
      星期{WEEKDAY_NAMES[day]}&emsp;{open}
    </div>
  )
}

OpenHour.propTypes = {
  day: PropTypes.number,
  hour: PropTypes.array,
}

const OpenHours = (hours) => (
  <div>
    {_(hours)
      .map('open')
      .flatten()
      .groupBy('day')
      .entries()
      .sortBy('0')
      .map(([day, hour]) =>
        <OpenHour key={day} day={parseInt(day, 10)} hour={hour} />
      )
      .value()}
  </div>
)

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
