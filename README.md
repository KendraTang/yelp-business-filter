# Yelp business filter

## Getting Started

First we need an API Key for requesting yelp API: https://www.yelp.com/developers/v3/manage_app

```shell
git clone git@github.com:KendraTang/yelp-business-filter.git
cd yelp-business-filter
yarn
export API_KEY=<INSERT_YOUR_API_KEY_HERE>
yarn start    # Runs both frontend and backend server
```
And then visit http://localhost:3000, Voila!

## How did you decide the technologies you decided to use in your submission?

* [create-react-app](https://github.com/facebook/create-react-app)
    To create a react app without configure things by my own so I can start my work easily. Comes with packages such as webpack and jest.

* [apollo](https://www.apollographql.com/docs/react/)
    I did a little search of relay and react-apollo and tried them both. I choosed react-apollo for the following reasons:

    * The documentation is more clear
    * Easy to get start with

    Although this caused a SyntaxError when running tests and build. Install `react-apollo@next` solves the issue.

* [cors-anywhere](https://github.com/Rob--W/cors-anywhere)
    Since api.yelp.com doesn't support Access-Control-Allow-Origin header, we need a backend server to send request for us.
    CORS Anywhere is very simple to setup.

* [react-app-rewired](https://github.com/timarney/react-app-rewired)
    Used to add loaders without ejecting which may cause the project to be too messy.

* Semantic UI ([semantic-ui-react](https://github.com/Semantic-Org/Semantic-UI-React))
    For quick and simple UI layout.

* [Moment.js](https://momentjs.com/)
    We need to compare open day with selected datetime. It requires some datetime manipulation. Moment.js is good at this.

## How did you decide the requests to Yelp API?

First I decide what to show on BusinessCards, and then request for what I need.
I wanted to show reviews of the businesses but the API would response with error sometimes.
For example, search with `term: "ramen", location: "台北"` is ok but `term: "拉麵", location: "台北"` will response with error.

## Are there any improvements you could make?

* Hero block is too large
* Page too height when no content
* Redesign cards to be smaller (especially on mobile view) 
* Better datetime selector
* Remove misleading search icon in input field
* Show half star in rating
* Filter by other dimensions
* Click to show more businesses
* Show result in other page?
* Find a better way to fix footer at bottom

## What would you do differently if you were allocated more time?

* Try [enzyme](http://airbnb.io/enzyme/)
* Integrate google map to show businesses on map
* Try test for race condition (?)
