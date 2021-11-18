# Crypto Dash!

## About this Project

This is a simple dashboard for crypto coins, showing top coins as well as liquidity graphing for coins. 

### Thought Process

This project called for some state management solution to store state outside of the two main components to allow the same data to be used on either page. 
I elected for useContext for this as it seemed like the correct size to handle this amount of data, while I thought something like redux would be too large, and prop drilling didnt seem appropriate to this use case. 

I tried to set up my project in a design system way but ultimately as this project is just two pages with basically one component on them each I just went with a pages approach. The table and/or the chart could be separated into their own component and imported to the page, but i think this is better currently. 

On the topic of charts. I searched forever to no avail until finally landing on plotly, which I think is the best (and maybe only) react chart library that would allow me to solve this task. 

I elected to use mostly MUI where necessary for components to simplify the process. 

I also realize there are some styling issues. My goal was to get it more or less okay, but with the chart specifically and the amount of time I have already spent on this task I thought it was better to leave some styling issues as a "would like to fix" for now. 

For the api call i am using a reverse-proxy i set up on my heroku. It is just a simple repo I found. 

I am also deploying the app with vercel: https://crypto-dash-teal.vercel.app/
### Ideas for extensions

Styling is the main thing currently that sticks out to me. The header is pretty basic and the page widths/heights are not always exactly correct. 

I was also considering caching the api response to save my key from getting run too many times. Also this could help performance. So I would simply only call the fetch on the initial render and then I would save the full state in another context variable and pass back slices of it depending on the context value. I think this is could be a nice improvement (and not so complicated to implement), but I am out of time unfortunately!

Could add some more options for the table as well. 

Should definitely add some testing as well. 

## Thank you for your time!


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:
### `yarn`
### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
Be sure to add a CMC API key to the env file if you are running locally.

