## URL Shortner

This is a URL Shortner Service Server developed using Node.js

## How to run the server

Make sure you have node.js and mySQL installed on your machine.
In the root of the project;

1. Create a `.env` file to contain your environment variables

   - Add your server port as PORT,
   - Add your Database host as DATABASE_HOST
   - Add your Database user as USER
   - Add your Database password as PASSWORD
   - Add your Database table as DATABASE

2. To install the server dependencies, open your terminal and run `npm install`

4. To Run the server, open your terminal run `npm start`

## Endpoints

http://localhost:5000/encode - This endpoint encodes the Original/Long url into a short url and the request body is `originalUrl` which should be sent as a JSON.

http://localhost:5000/decode - This endpoint is responsible for decoding the short url into the Original/Long url and the request body is `shortUrl`, it should be sent as a JSON.
