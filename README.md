# NJIT-Milestone-Project-1
This milestone project takes place at the end of the web designer unit of the program. It's meant to put into practice skills learned in courses 2 (HTML &amp; Web Accessibility), 3 (CSS, SASS, &amp; CSS Frameworks), 4 (User Experience &amp; User Interface Design), and 5 (JavaScript &amp; Front-End Web Development).

# NJIT-SD-03 Milestone Project: Planning
Matching Game

--------

## Project Description

I am going to code a matching game. It will require a player to match similar images . The participant will need to find a match for a picture; 30 images will be displayed hidden in a random order. The player turns over two cards at a time, with the goal of turning over a matching pair, by using memory. This will be a single player game were the player is competing with time, matches, and failures. A score will be made using a ratio of user attempts, user hits/misses, and time played.

## Game Logic

1. Initialization: The user will click on the game and it will load. During the load process local storage will be used to initialize global variables and store player attempts, hits, and misses. At this time a button will be displayed to start the game and more importantly the counter. This counter will record the duration of the game but will not display it. It just records when the game begins. None of the games interactive components will be available till the user clicks the start button.
2. Player Clicks Start Button: When the user clicks the start button a input will ask for the users initials and record that in local storage if not already there from a previous time played. If it is there from a previous time played then the banner will display the previous users high score and welcome them back. If it is a new user the banner will welcome the new user.
3. Game Play: The user will then keep trying to select two cards at a time. An "Attempt" counter will be displayed and a message text banner to communicate with the user that they are in the middle of a attempt, starting a new attempt and so on.
4. Game Finish: Once all the matches are found the timer will stop and the users score will be displayed.
5. Game Options: Buttons will be available to quit the game or start over.  But there will not be a button to pause as the point is to time the user and see how long it takes for them to find all the matches.
6. Score Calculation: The score calculation will be the difference in seconds from the beginning of the game to the end of the game, along with, the attempts and matches as follows. There will be a fixed number of matches the only variables that will differ will be the attempts, misses, and time. So the score will be (matches over seconds) times (attempts over seconds).
7. Score Keeping: The users score will be saved in local memory with the users initials.  If the user has there initials in local storage already then the score will be compared to the previously recorded score.  If the new score is greater than the previous score, the new score will be displayed with a message that they have a new high score.

## Deliverables

### MVP Criteria

1. The game must have all the game logic written above in the "Game Logic" Section. It does not need to have elaborate graphics or images.

2. Simple stock images will be used at first to make the project go faster in the beginning. Also, simple CSS will be used with a simple color scheme and fonts.

3. Button styles and input boxes will be basic till the whole game is built along with basic error handling and messaging.

### Post-MVP Plans

1. Once the basic code is complete and working, I want to figure out if image categories can be used and even see if the user can pick different image categories. Like it would be fun to have a "Rabbit" category picked by the user. If the user wanted they could pick a "Fruit" category.

2. I would also like to make the color scheme blend more and be professional looking with a color pallet. It would be nice to have the color pallet change based on the category of pictures chosen above. Better button images and error messaging will be used when time permits.

3. It would be excellent, to have a indicator telling the user that they are approaching there previously held score and might break it if they concentrate. It would also give the user real-time feed back so they do not have to finish the game if they are not going to break there high score. Maybe sound can be incorporated during this real time event!

## Project Planning

| Date | Goals |
| ---- | ----- |
| Sun. 01/23 | Create GitHub repository. Complete README.md. |
| Tue. 01/25 | Be done with stock image collection and basic outline of code functions and index html tags. |
| Thu. 01/27 | Be done with start button logic and storage of user initials.  Be well into game play logic. |
| Sun. 01/30 | Be done with game play logic and start on game finish storage and wrap-up. |
| Tue. 02/01 | Be done with game and see if you can do any of the Post-MVP Plans. |
| Thu. 02/03 | Deploy to GitHub Pages. Submit completed project. Project presentations. |