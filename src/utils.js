import moment from 'moment'

export const isOpenAt = (hours, datetime) => {
  if (!hours) return false
  datetime = moment(datetime, 'YYYY-MM-DDTHH:mm')
  const convert = (s, day) =>
    moment(s, 'HHmm')
      .year(datetime.year())
      .month(datetime.month())
      .date(datetime.date())
      .isoWeekday(day + 1)

  return hours.some(({ open }) =>
    open.some(({ day, start, end, is_overnight }) => {
      let startTime = convert(start, day)
      let endTime = convert(end, day)
      if (startTime.isAfter(datetime)) {
        startTime.subtract(1, 'week')
        endTime.subtract(1, 'week')
      }
      if (endTime.isBefore(startTime) || is_overnight) {
        endTime.add(1, 'day')
      }
      return datetime.isBetween(startTime, endTime)
    })
  )
}
