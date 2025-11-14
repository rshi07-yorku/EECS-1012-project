# 📓 Password Protected Diary

this is made by chatgpt as a template, we'll change it later

A simple password-protected diary web app that allows users to view and add diary entries **only after authentication**. Diary contents are stored on the server, and the webpage hides all entries until the correct password is entered.

---

## 🔐 Features

### ✔ Password Authentication
- Prompts the user for a password.
- If the password is **correct**, all existing diary entries are displayed in the diary “display area”.

### ✔ Add Diary Entries
- Authenticated users can submit new diary entries.
- New entries are saved on the server and immediately displayed.

### ✔ Lock Button
- Hides all diary information from the page.
- Requires re-entering the password to unlock again.

### ✔ Server-Stored Entries
- All notes are stored server-side so they persist across sessions.
- Entries are only sent to the frontend after successful authentication.

---

## 🧱 Tech Stack (example)

- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js / Express (or any backend)  
- **Storage:** JSON file or database

---

## 🖼 How It Works

1. User visits the webpage.  
2. A password input appears.  
3. User submits password → sent to server for verification.  
4. If correct:
   - Server returns existing diary entries.
   - “New Entry” form becomes available.
5. User adds new entries → server saves them.
6. User can press **Lock Diary** to hide all displayed entries.

---

## 🚀 Setup & Run (example)

```bash
npm install
npm start
