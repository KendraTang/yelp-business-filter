import { isOpenAt } from './utils'

describe('isOpenAt', () => {
  test('basic', () => {
    const hours = [{
      open: [
        { is_overnight: false, day: 0, start: '1100', end: '2130' },
      ]
    }]
    expect(isOpenAt(hours, '2018-03-04T20:00')).toEqual(false)
    expect(isOpenAt(hours, '2018-03-05T10:00')).toEqual(false)
    expect(isOpenAt(hours, '2018-03-05T10:59')).toEqual(false)
    expect(isOpenAt(hours, '2018-03-05T11:00')).toEqual(true)
    expect(isOpenAt(hours, '2018-03-05T11:01')).toEqual(true)
    expect(isOpenAt(hours, '2018-03-05T20:00')).toEqual(true)
    expect(isOpenAt(hours, '2018-03-05T21:29')).toEqual(true)
    expect(isOpenAt(hours, '2018-03-05T21:30')).toEqual(false)
    expect(isOpenAt(hours, '2018-03-05T23:00')).toEqual(false)
    expect(isOpenAt(hours, '2018-03-06T20:00')).toEqual(false)
  })

  test('all day', () => {
    const hours = [{
      open: [
        { is_overnight: true, day: 0, start: '0000', end: '0000' },
      ]
    }]
    expect(isOpenAt(hours, '2018-03-04T23:59')).toEqual(false)
    expect(isOpenAt(hours, '2018-03-05T00:00')).toEqual(true)
    expect(isOpenAt(hours, '2018-03-05T12:00')).toEqual(true)
    expect(isOpenAt(hours, '2018-03-05T23:59')).toEqual(true)
    expect(isOpenAt(hours, '2018-03-06T00:00')).toEqual(false)
  })

  test('multiple hours in one day', () => {
    const hours = [{
      open: [
        { is_overnight: false, day: 0, start: '1100', end: '1430' },
        { is_overnight: false, day: 0, start: '1730', end: '2230' },
      ]
    }]
    expect(isOpenAt(hours, '2018-03-05T09:00')).toEqual(false)
    expect(isOpenAt(hours, '2018-03-05T12:00')).toEqual(true)
    expect(isOpenAt(hours, '2018-03-05T15:00')).toEqual(false)
    expect(isOpenAt(hours, '2018-03-05T22:00')).toEqual(true)
    expect(isOpenAt(hours, '2018-03-05T23:00')).toEqual(false)
  })

  test('multiple days', () => {
    const hours = [{
      open: [
        { is_overnight: false, day: 0, start: '1100', end: '1700' },
        { is_overnight: false, day: 2, start: '1100', end: '1700' },
        { is_overnight: false, day: 4, start: '1100', end: '1700' },
        { is_overnight: false, day: 6, start: '1100', end: '1700' },
      ]
    }]
    expect(isOpenAt(hours, '2018-03-04T13:00')).toEqual(true)
    expect(isOpenAt(hours, '2018-03-05T13:00')).toEqual(true)
    expect(isOpenAt(hours, '2018-03-06T13:00')).toEqual(false)
    expect(isOpenAt(hours, '2018-03-07T13:00')).toEqual(true)
    expect(isOpenAt(hours, '2018-03-08T13:00')).toEqual(false)
    expect(isOpenAt(hours, '2018-03-09T13:00')).toEqual(true)
    expect(isOpenAt(hours, '2018-03-10T13:00')).toEqual(false)
    expect(isOpenAt(hours, '2018-03-11T13:00')).toEqual(true)
    expect(isOpenAt(hours, '2018-03-12T13:00')).toEqual(true)
  })


  test('wrong overnight', () => {
    // Yelp API may return this kind of data
    const hours = [{
      open: [
        { is_overnight: false, day: 0, start: '0000', end: '0000' },
        { is_overnight: false, day: 1, start: '1100', end: '0200' },
      ]
    }]
    expect(isOpenAt(hours, '2018-03-04T23:59')).toEqual(false)
    expect(isOpenAt(hours, '2018-03-05T00:00')).toEqual(true)
    expect(isOpenAt(hours, '2018-03-05T12:00')).toEqual(true)
    expect(isOpenAt(hours, '2018-03-05T23:59')).toEqual(true)
    expect(isOpenAt(hours, '2018-03-06T00:00')).toEqual(false)

    expect(isOpenAt(hours, '2018-03-06T00:01')).toEqual(false)
    expect(isOpenAt(hours, '2018-03-06T12:00')).toEqual(true)
    expect(isOpenAt(hours, '2018-03-06T23:59')).toEqual(true)
    expect(isOpenAt(hours, '2018-03-07T01:59')).toEqual(true)
    expect(isOpenAt(hours, '2018-03-07T02:00')).toEqual(false)
  })

  test('overnight', () => {
    const hours = [{
      open: [
        { is_overnight: true, day: 0, start: '1100', end: '0200' },
      ]
    }]
    expect(isOpenAt(hours, '2018-03-05T10:59')).toEqual(false)
    expect(isOpenAt(hours, '2018-03-05T11:00')).toEqual(true)
    expect(isOpenAt(hours, '2018-03-05T21:00')).toEqual(true)
    expect(isOpenAt(hours, '2018-03-06T01:00')).toEqual(true)
    expect(isOpenAt(hours, '2018-03-06T02:00')).toEqual(false)
  })

  test('multiple opens', () => {
    const hours = [
      {
        open: [
          { is_overnight: false, day: 0, start: '1100', end: '1700' },
        ]
      },
      {
        open: [
          { is_overnight: false, day: 1, start: '1100', end: '2100' },
        ]
      },
    ]
    expect(isOpenAt(hours, '2018-03-05T12:00')).toEqual(true)
    expect(isOpenAt(hours, '2018-03-05T17:00')).toEqual(false)
    expect(isOpenAt(hours, '2018-03-05T20:00')).toEqual(false)
    expect(isOpenAt(hours, '2018-03-06T20:00')).toEqual(true)
  })
})
