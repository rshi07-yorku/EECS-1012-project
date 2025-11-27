const user = "";

// check user
async function checkUser() {
    try {
        const res = await fetch('/api/me', { credentials: 'include' });
        const data = await res.json();
        if (!data.loggedIn) {
            window.location.href = "login.html";
        } else {
            user = data.username;
        }
    } catch (err) {
        console.error("Error checking session:", err);
        window.location.href = "login.html";
    }
}
checkUser();


checkSession();

// get md for user

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

// collapsible parition?
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        document.body.classList.remove("no-animation");
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        console.log(content)
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}



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

