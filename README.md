Movies landing page assignment

Overview:

Main Sections:
1. Login Page (localhost:3000)
2. Movies Page (localhost:3000/Movies)

Login Page - 
   Takes username and password as input. These inputs are passed on to the login API.
   POST - 'https://demo.credy.in/api/v1/usermodule/login/'
   On successful authentication, a token is generated and the user is logged into the movies pages.

Movies Page - 
   Uses the token generated on successful login to fetch the data from movies API.
   GET - https://demo.credy.in/api/v1/maya/movies/

   Card Layout -
   The movies are then displayed in a card layout having a circular avatar, title, partial description, genre, and read full description button.
   Circular avatar is obtained by a GET API call to - https://ui-avatars.com/ 

   Modal - 
   On clicking the 'read full description' button, a modal is displayed.
   This changes the avatar from circular to square and displays the full description of the movie.

   Search Bar and Refresh button - 
   Allows the user to search the movies using movie title as the input.
   The refresh button allows the user to refresh the page in cases where the movies data is not fetched properly.

   Toggle switch - 
   Changes the theme from default light theme to dark theme and vice-versa.
   Also preserves the theme on refresh.

   Pagination - 
   Previous and Next button implements pagination.

Pre requisites: node - (https://nodejs.org/en/download/)

Steps to run the project locally:
Step 1: git clone https://github.com/createKevinShah/MoviesLandingPage.git 
Step 2: cd myapp
Step 3: npm i
Step 4: npm start

Navigate to 'localhost:3000' in your browser.
