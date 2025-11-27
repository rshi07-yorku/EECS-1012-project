// check if logged in
fetch('/me', {
    method: 'GET',
    credentials: 'include' 
})
.then(res => res.json())
.then(data => {
    if (data.loggedIn) {
        window.location.href = "index.html";
    }
});

// login
document.getElementById('login').addEventListener('submit', async (e) => {
    e.preventDefault(); // prevent page reload

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error');

    try {
        console.log(JSON.stringify({ username, password }));
        const res = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (res.ok) {
            errorDiv.textContent = ""; // clear error
            alert(`Logged in as ${data.username}`);
            window.location.href = "index.html";
        } else {
            // login failed
            errorDiv.textContent = data.error; // show error message
        }
    } catch (err) {
        errorDiv.textContent = "Server error. Try again later.";
        console.error(err);
    }
});

//theme switcher
const root = document.querySelector(":root");
document.body.classList.add("no-animation");

const themes = {
    dark: {
        '--text-color': '#cdd6f4',
        '--bg-color': '#1e1e2e',
        '--link-color': '#89dceb',
        '--btn-color': '#74c7ec',
        '--btn-text': '#45475a',
        '--shadow': 'rgba(0, 0, 0, 0.53)'
    },
    light: {
        '--text-color': '#4c4f69',
        '--bg-color': '#eff1f5',
        '--link-color': '#04a5e5',
        '--btn-color': '#209fb5',
        '--btn-text': '#eff1f5',
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

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    setTheme('dark');
    document.getElementById("theme-switcher-grid").classList.add("night-theme");
} else {
    setTheme('light');
    document.getElementById("theme-switcher-grid").classList.remove("night-theme");
}

