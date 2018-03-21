import OpenHour from './OpenHour'

test('basic', () => {
  const props = {
    day: 0,
    hour: [{
      start: '1730',
      end: '2200',
    }]
  }
  expect(OpenHour(props)).toMatchSnapshot()
})

test('all day', () => {
  const props = {
    day: 0,
    hour: [{
      start: '0000',
      end: '0000',
    }]
  }
  expect(OpenHour(props)).toMatchSnapshot()
})

test('overnight', () => {
  const props = {
    day: 0,
    hour: [{
      start: '2300',
      end: '0200',
    }]
  }
  expect(OpenHour(props)).toMatchSnapshot()
})

test('weekday names', () => {
  for (let i = 0; i < 7; i++) {
    const props = {
      day: i,
      hour: [{
        start: '1100',
        end: '2100',
      }]
    }
    expect(OpenHour(props)).toMatchSnapshot()
  }
})

test('multiple hours in one day', () => {
  const props = {
    day: 0,
    hour: [
      {
        start: '0600',
        end: '0900',
      },
      {
        start: '1100',
        end: '1430',
      },
      {
        start: '1730',
        end: '2200',
      },
    ],
  }
  expect(OpenHour(props)).toMatchSnapshot()
})
