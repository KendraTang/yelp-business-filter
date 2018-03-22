const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 8080

const apiKey = process.env.API_KEY
if (!apiKey) {
  console.log('Please set your API_KEY in environment variable.')
  process.exit(1)
}

require('cors-anywhere').createServer({
  originWhitelist: ['https://yelp.tkain.tw', 'http://localhost:3000'],
  corsMaxAge: 600,
  setHeaders: {
    authorization: `Bearer ${apiKey}`
  }
}).listen(port, host, () => {
  console.log(`Running CORS Anywhere on ${host}:${port}.`)
})
