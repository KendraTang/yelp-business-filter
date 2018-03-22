import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

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
  hour: PropTypes.arrayOf(PropTypes.shape({
    start: PropTypes.string,
    end: PropTypes.string,
  })),
}

export default OpenHour
