const today = new Date();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const year = today.getFullYear();
const newEntry = `${month}${day}${year}`;

// check user
async function checkUser() {
    try {
        const res = await fetch('/api/me', { credentials: 'include' });
        const data = await res.json();
        if (!data.loggedIn) {
            window.location.href = "login.html";
        } else {
            return data.username;
        }
    } catch (err) {
        console.error("Error checking session:", err);
        window.location.href = "login.html";
    }
}
const user = checkUser();

// get md for user
async function listEntries() {
    try {
        const res = await fetch('/api/listentries', { credentials: 'include' });

        // Parse as JSON
        const data = await res.json();
        let files = data.files;

        let html = ""; // html that will be under dropdown

        if (files.length === 0) {
            document.getElementById('file-list').innerHTML = "<h1>No entries, create one for today!</h1>";
        } else {
            // does essentially everything below in one line, but way harder to read
            // html = files.map(file => `<h1><a href="edit.html?date=${file}">${file}</a></h1>`).reverse().join('');
            files = files.reverse();
            for (file of files) {
                let display = file.slice(0, 2) + "/" + file.slice(2, 4) + "/" + file.slice(4);
                file = `<h1><a href="edit.html?date=${file}">${display}</a></h1>`;
                html = html + file;
            }

            document.getElementById('file-list').innerHTML = html;
        }

    } catch (err) {
        console.error("Error fetching entries:", err);
        // Only redirect if it's an authentication error
        if (err.message.includes('401') || err.message.includes('Not logged in')) {
            window.location.href = "login.html";
        } else {
            // Show error to user
            document.getElementById('file-list').innerHTML = `<p>Error loading entries: ${err.message}</p>`;
        }
    }
}
listEntries();

// edit button
document.getElementById('edit-btn').addEventListener('click', async (e) => {
    window.location.href = `edit.html?date=${newEntry}`;

});


// logout button
document.getElementById('logout').addEventListener('click', async (e) => {
    try {
        const res = await fetch('/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include' // important if using sessions/cookies
        });
        if (res.ok) {
            // Redirect to login page after successful logout
            window.location.href = "login.html";
        } else {
            console.error('Logout failed');
        }
    } catch (err) {
        console.error('Error:', err);
    }
});

// collapsible partition

const coll = document.querySelectorAll(".collapsible");

coll.forEach(button => {
    const content = button.nextElementSibling;
    button.addEventListener("click", () => {
        document.body.classList.remove("no-animation");
        button.classList.toggle("active");

        if (!content) return; // safety check

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

//theme switcher

//inital setup
const root = document.querySelector(":root");
document.body.classList.add("no-animation");

const themes = {
    dark: {
        '--text-color': '#cdd6f4',
        '--bg-color': '#1e1e2e',
        '--header-color': '#181825',
        '--link-color': '#89dceb',
        '--btn-color': '#74c7ec',
        '--btn-hover': '#89dceb',
        '--btn-text': '#45475a',
        '--coll-color': '#313244',
        '--shadow': 'rgba(0, 0, 0, 0.53)'
    },
    light: {
        '--text-color': '#4c4f69',
        '--bg-color': '#eff1f5',
        '--header-color': '#e6e9ef',
        '--link-color': '#04a5e5',
        '--btn-color': '#209fb5',
        '--btn-hover': '#04a5e5',
        '--btn-text': '#eff1f5',
        '--coll-color': '#ccd0da',
        '--shadow': 'rgba(0, 0, 0, 0.2)'
    }
};

function setTheme(theme) {

    Object.entries(themes[theme]).forEach(([prop, value]) => {
        root.style.setProperty(prop, value);
    });
}
document
    .getElementById("theme-switcher-grid")
    .addEventListener("click", function () {
        document.body.classList.remove("no-animation");
        this.classList.toggle("night-theme");
        if (this.classList.contains("night-theme")) {
            setTheme('dark');
            localStorage.setItem("theme", "dark");
        }
        else {
            setTheme('light');
            localStorage.setItem("theme", "light");
        }

    });

// persistence
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    setTheme('dark');
    document.getElementById("theme-switcher-grid").classList.add("night-theme");
} else {
    setTheme('light');
    document.getElementById("theme-switcher-grid").classList.remove("night-theme");
}

