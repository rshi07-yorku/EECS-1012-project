# RUN SERVER BEFORE TESTING

In terminal type
`node server.js`
test stuff at http://localhost:3000

# Password Protected Diary

A simple password-protected diary web app that allows users to view and add diary entries **only after authentication**. Diary contents are stored on the server.

GPT file structure idea
```
password-diary/
│
├── public/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── edit.html
│   ├── calendar.html
│   ├── css/
│   │   ├── index.css
│   │   ├── login.css
│   │   ├── signup.css
│   │   ├── edit.css
│   │   └── calendar.css
│   └── js/
│       ├── global.js
│       ├── index.js
│       ├── login.js
│       ├── signup.js
│       ├── edit.js
│       └── calendar.js
│
├── server.js
├── package.json    # not too sure what this is ngl
├── entries/        # stores markdown files
│   └── user1/
│       └── 11242025.md
└── users.json      # stores username/password hash
```

## Pages

### index.html
- should look something like google docs homepage list view
- welcome div at the top maybe? something like "Welcome back (user)" with a button below that says create today's entry, which changes to edit today's entry if it already exists
- 

### login.html
- login page, if logged in redirect to index.html

### signup.html
- signup page, if logged in redirect

### edit.html
- uses [marked](https://github.com/markedjs/marked) for markdown editing
- takes in a query (date), so linking to this page would be something like http://host/edit?date=mmddyyyy
- if not logged in redirect to login.html
- view/edit mode because markdown

### calendar.html
- calendar view
- dates with entries look different (different shade maybe?)
- when clicking on a box, if an entry exists, go to it, if not ask if user wants to create entry
- idk if we want full create event calendar functionality, i might add it if i have extra time (yay scope creep)
- redirect etc etc

## Features (WIP)

### colorscheme
- [catpuccin](https://catppuccin.com/palette/) latte/mocha for light dark

below is partially gpt'ed, will correct later 

### Password Authentication
- Prompts the user for a password.
- If the password is **correct**, all diary entries for that user are displayed in the diary “display area”.

### Add Diary Entries
- Authenticated users can submit new diary entries.
- New entries are saved on the server and immediately displayed.


### Server-Stored Entries
- All notes are stored server-side so they persist across sessions.
- Entries are only sent to the frontend after successful authentication.

### Calendar View
- show calendar, support creating/viewing entries by clicking on a date 

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js / Express (or any backend)  
- **Storage:** JSON for users, Markdown for entries

## How It Works (WIP)

ignore below, this is gpt from earlier
1. User visits the webpage.  
2. A password input appears.  
3. User submits password → sent to server for verification.  
4. If correct:
   - Server gets user's diary entries.
   - “New Entry” form becomes available.
5. User adds new entries → server saves them.



# What else we have left on the frontend
- On homepage we create drop down menu for all of the users diaries that calls on the dates the diaries were made
- ~On edit page we implment calendar.html and include a link to the html file as well* No Calendar*~
-