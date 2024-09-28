# startup
Repository for BYU CS 260 - Web Programming.  Yes, the name is generic, but the specs called for that exact string.  Oh well.

## Initial specification
### Elevator pitch
STV voting site.  Create and vote in polls using single transferable vote.
### Key features
* poll creation
* voting
* display results
### Use of focus technologies
#### HTML
* display text
* provide scaffolding to attach all the other features to
* forum could be used to submit votes
#### CSS
* everything looks better with color
* much of the voting interface would look better if it wasn't left-justified
#### JavaScript
* ripple/blink effect when an option is selected would provide more obvious feedback
* results could be given as an animation showing how they were calculated.  Shown work, basically.
#### React (JS UI framework)
* a UI framework feels like it would provide a nice simplification of the CSS and JavaScript described above.
#### Web service
##### Local services
* create account
* authenticate
* create poll
* edit poll
* submit poll
* register for poll
* close registration
* cast vote
* view results
##### External services
* Colors randomly set per poll by the Colormind API
#### Authentication
* prevent voter fraud by requiring login to vote
* provide a way to track past polls
* provide a way to create new polls
#### Database data
* user accounts
  - display name
  - credentials
  - results of polls voted in
  - polls created
* poll data
  - creator
  - options
  - colorscheme
  - results
#### WebSocket data
* clients could receive "shown work" for poll results in stages
### Concept sketches
#### Home and authentication
![Landing page, account creation, and login](image-cache/home-and-auth.jpg)
#### Account view, poll results, and poll administration
![Account home, poll results, poll administration](image-cache/account-view.jpg "Account views")
#### Poll creation, registering to vote, and voting
![Poll creation, voting registration, and voting process](image-cache/poll-participation.jpg)

## Startup HTML deliverable
### Modifications
* Updated README.md to include modifications and deletions for Startup HTML deliverable
### Additions
* Initial deployment of Simon HTML
* GitHub repo is now linked in footers of all pages
* All pages for the website actually exist now, including login pages
* Pages all have sensible links between eachother
* Pages all have placeholder text
### TODO
* Application images
* add username display
* placeholder for 3rd party API calls
* clarifiy what data is stored in database
* clarify what data is recieved in realtime via websocket
