const root = document.querySelector(":root");
const themeSwitcher = document.getElementById("theme-switcher-grid");

// stop transitions firing on page load
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

// handle theme toggle
themeSwitcher.addEventListener("click", function () {
    document.body.classList.remove("no-animation");
    this.classList.toggle("night-theme");
    
    if (this.classList.contains("night-theme")) {
        setTheme('dark');
        localStorage.setItem("theme", "dark");
    } else {
        setTheme('light');
        localStorage.setItem("theme", "light");
    }
});

// check local storage for preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    setTheme('dark');
    themeSwitcher.classList.add("night-theme");
} else {
    setTheme('light');
    themeSwitcher.classList.remove("night-theme");
}


// login logic
document.getElementById("loginBtn").addEventListener("click", function () {
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;
    const errorMsg = document.getElementById("error");

    errorMsg.innerText = "";

    fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: usernameInput, password: passwordInput })
    })
    .then(response => {
        if (response.ok) {
            window.location.href = "index.html"; 
        } else {
            errorMsg.innerText = "Invalid username or password.";
        }
    })
    .catch(error => {
        console.error(error);
        errorMsg.innerText = "Server error.";
    });
});