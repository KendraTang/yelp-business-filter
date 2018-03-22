import Address from './Address'

it('Format address', () => {
  expect(Address('104 台北市中山區\n民族東路410巷2弄18號')).toMatchSnapshot()
})
