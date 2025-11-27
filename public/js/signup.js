
const root = document.querySelector(":root");


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
//signup logic
document.getElementById("signupBtn").addEventListener("click", function() {
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;
    const messageBox = document.getElementById("message");

    if(!usernameInput || !passwordInput) {
        messageBox.style.color = "red";
        messageBox.innerText = "Please fill in all fields.";
        return;
    }

    messageBox.style.color = "var(--text-color)";
    messageBox.innerText = "Creating account...";

    // sending to backend
    fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: usernameInput, password: passwordInput })
    })
    .then(response => {
        if (response.status === 409) {
            throw new Error("Username already taken.");
        }
        if (!response.ok) {
            throw new Error("Server error.");
        }
        return response.json();
    })
    .then(data => {
        messageBox.style.color = "#04a5e5"; 
        messageBox.innerText = "Account created! Redirecting...";
        
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    })
    .catch(error => {
        console.error(error);
        messageBox.style.color = "red";
        messageBox.innerText = error.message;
    });
});