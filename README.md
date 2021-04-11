# Explore Away

Explore Away is a travel assist app that allows the user to signup, login, use interactive map, search attractions/restaurants/hotels, view latest social media posts for each attraction, and create personal itineraries.

Built with:

* Server-side: Express.js/Node.js
* Database: PostgreSQL
* Client-side: React, Redux, Leaflet
* Others: Puppeteer & Cheerio (data scraping & automation), PassportJS: LocalStrategy (login authentication), bcrypt (password encryption)

Steps to Run:

1. git clone/download the source files.
2. npm install to install dependencies (@ both server & client directories).
3. Start server: node ./bin/www (@ /explore_away) OR npm run devstart
4. Start client: npm start (@ /explore_away/client)

Images:

Homepage
![Homepage](./Snapshots/homepage.JPG?raw=true "homepage")

Login
![Login](./Snapshots/login.JPG?raw=true "login")

Search Map
![Map](./Snapshots/searchmap.JPG?raw=true "map")

Social Media Posts
![sns](./Snapshots/youtube.JPG?raw=true "sns")

Add Itinerary
![add](./Snapshots/additinerary.JPG?raw=true "add")

Itinerary
![itinerary](./Snapshots/itinerary.JPG?raw=true "itinerary")
