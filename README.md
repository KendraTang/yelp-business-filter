# Yelp business filter

Find business by location and open time, with yelp GraphQL API.

## Getting Started

First we need an API Key for requesting yelp API: https://www.yelp.com/developers/v3/manage_app

```shell
git clone git@github.com:KendraTang/yelp-business-filter.git
cd yelp-business-filter
yarn
export API_KEY=<INSERT_YOUR_API_KEY_HERE>
yarn start  # Runs both frontend and backend server
```
And then visit http://localhost:3000, Voila!

## How did you decide the technologies you decided to use in your submission?

* [create-react-app](https://github.com/facebook/create-react-app)
    To create a react app without configure things by my own so I can start my work easily. Comes with useful config and packages such as webpack and jest.

* [Apollo](https://www.apollographql.com/docs/react/)
    Relay and Apollo are the most popular libraries to use GraphQL with React currently. I did a little search of relay and react-apollo and tried them both. I chose react-apollo because its documentation is more clear, and easier to get start with.

* [CORS Anywhere](https://github.com/Rob--W/cors-anywhere)
    Since https://api.yelp.com/v3/graphql doesn't support [Access-Control-Allow-Origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin) header, we need a backend server to send API requests for us.
    CORS Anywhere is very simple to setup.

* [react-app-rewired](https://github.com/timarney/react-app-rewired)
    Used to override create-react-app webpack configs without ejecting which may cause the project to be too messy.

* [semantic-ui-react](https://github.com/Semantic-Org/Semantic-UI-React)
    For quick and simple UI layout.

* [Moment.js](https://momentjs.com/)
    We need to compare open hours with selected datetime. Moment.js is good at datetime parsing and manipulation.

* [Concurrently](https://github.com/kimmobrunfeldt/concurrently)
    Runs both frontend and backend servers at once.

## How did you decide the requests to Yelp API?

First I decide what to show on BusinessCards, and then request for what I need.
I wanted to show reviews of the businesses but the API would respond with error sometimes.
For example, search with `term: "ramen", location: "台北"` is ok but `term: "拉麵", location: "台北"` will respond with error.

## Are there any improvements you could make?

* Find a better way to make the sticky footer
* Redesign cards to be smaller (especially on mobile view) 
* Better datetime picker
* Show half star in rating
* Filter by other dimensions
* Click to show more businesses

## What would you do differently if you were allocated more time?

* Try [enzyme](http://airbnb.io/enzyme/)
* Integrate google map to show businesses on map
* Don't use Semantic UI, write my own CSS instead.

## Issues encountered

* [Does api.yelp.com support Access-Control-Allow-Origin header for client-side JS?](https://github.com/Yelp/yelp-api/issues/99)
* [react-apollo beta won't minify with create-react-app build process](https://github.com/apollographql/react-apollo/issues/1734)
* [[Bug] (Create React App) Issues with resolving an .mjs file instead of an .js file leading to test failures](https://github.com/graphql/graphql-js/issues/1248)
* [Update SUIR to be compatible with SUI 2.3](https://github.com/Semantic-Org/Semantic-UI-React/issues/2550)
* [concurrently --kill-others won't stop react-app-rewired when server.js exited](https://github.com/KendraTang/yelp-business-filter/issues/1)
