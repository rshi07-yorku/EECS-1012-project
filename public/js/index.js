// get date for creating new entry
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

        const data = await res.json();
        let files = data.files;

        let html = ""; 

        if (files.length === 0) {
            document.getElementById('file-list').innerHTML = "<h1>No entries, create one for today!</h1>";
        } else {

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

        if (err.message.includes('401') || err.message.includes('Not logged in')) {
            window.location.href = "login.html";
        } else {
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
            credentials: 'include'
        });
        if (res.ok) {
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
        if (!content) return;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

// theme switcher

// initial setup
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

// home icon 
const homeIcon = document.getElementById("home-icon");
const savedTheme = localStorage.getItem("theme");

// set icon correctly on page load
if (savedTheme === "dark") {
    setTheme('dark');
    document.getElementById("theme-switcher-grid").classList.add("night-theme");
    homeIcon.src = "assets/homedark.png";
} else {
    setTheme('light');
    document.getElementById("theme-switcher-grid").classList.remove("night-theme");
    homeIcon.src = "assets/home.png";
}

// theme switcher button
const logout_icon = document.getElementById("logouticon");



if (savedTheme === "dark") {
    setTheme('dark');
    document.getElementById("theme-switcher-grid").classList.add("night-theme");
    logout_icon.src = "assets/gradient-power-button-icon-189101.png";
} else {
    setTheme('light');
    document.getElementById("theme-switcher-grid").classList.remove("night-theme");
    logout_icon.src = "assets/on-off-power-button-189106.png";
}
document
    .getElementById("theme-switcher-grid")
    
    .addEventListener("click", function () {
        
        document.body.classList.remove("no-animation");
        
        this.classList.toggle("night-theme");
        
        

        if (this.classList.contains("night-theme")) {
            setTheme('dark');
            localStorage.setItem("theme", "dark");
            homeIcon.src = "assets/homedark.png";
        } else {
            setTheme('light');
            localStorage.setItem("theme", "light");
            homeIcon.src = "assets/home.png";
        }
    });
