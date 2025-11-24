# JS

JavaScript files will be stored here


# Webpage Files

1 js page per html for organization

## edit.js functions
- parse date from url since we access html/edit by adding ?date=xxx
- create new md with hidden json 
    - who owns file
    - date created
    - last modified (maybe)
- integrate marked
- view/edit modes

## index.js functions
- check login
    - redirect if not
- call database for files of current user
    - update the html

## login.js functions
- check if logged in
- check if credentials correct
- reset password

## signup
- check if logged in
- signup
- check if username is in use
- pw strength thing?

## calendar
- calendar functionality
    - next month, previous month, year/month picker with dropdown menus perhaps
- ask server if stuff exists on day

## idk where to put these, like all pages use them, maybe a global.js
- toggle darkmode
- get current user
- there's definitely more that can apply to all that i'm forgetting

# Server

## server.js
- login
    - authenticate user
    - create user
- edit
    - create files
    - save edits (maybe i can implement autosave)
- index
    - get files for current user

## database.json
- save users like below
```javascript
{
  "user1": {
    "password": "user1",
    "theme": "dark"
  },
  "user2": {
    "password": "user2",
    "theme": "light"
  }
}
- maybe encrypt password if i have extra time 
```

## entries folder
- stores .md files 