import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import OpenHour from './OpenHour'

const OpenHours = (hours) => (
  <div>
    {
      _(hours)
        .map('open')
        .flatten()
        .groupBy('day')
        .entries()
        .sortBy('0')
        .map(([day, hour]) =>
          <OpenHour
            key={day}
            day={parseInt(day, 10)}
            hour={_.sortBy(hour, 'start')}
          />
        )
        .value()
    }
  </div>
)

OpenHours.propTypes = PropTypes.array

export default OpenHours
