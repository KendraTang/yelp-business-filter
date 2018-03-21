import OpenHours from './OpenHours'

test('sort by day and start hour', () => {
  const hours = [{
    open: [
      { is_overnight: true, day: 0, start: '2300', end: '0200' },
      { is_overnight: false, day: 2, start: '1730', end: '2000' },
      { is_overnight: false, day: 0, start: '1730', end: '2000' },
      { is_overnight: false, day: 0, start: '1100', end: '1430' },
      { is_overnight: false, day: 1, start: '1100', end: '1430' },
      { is_overnight: false, day: 2, start: '1100', end: '1430' },
      { is_overnight: false, day: 1, start: '1730', end: '2000' },
    ]
  }]
  expect(OpenHours(hours)).toMatchSnapshot()
})

test('multiple opens', () => {
  const hours = [
    {
      open: [
        { is_overnight: false, day: 0, start: '1100', end: '1430' },
      ]
    },
    {
      open: [
        { is_overnight: false, day: 1, start: '1100', end: '1430' },
      ]
    },
  ]
  expect(OpenHours(hours)).toMatchSnapshot()
})
