let user = "";
let title = "";


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


// render as you write
const textarea = document.getElementById('test');
const output = document.getElementById('output');

function render() {
    output.innerHTML = marked.parse(textarea.value);
}

textarea.addEventListener('input', render);
render();

// Auto-save every 30 seconds

setInterval(() => {
    const content = textarea.value;

    fetch('/api/save', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ filename: title, content })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Auto-saved:', data);
        })
        .catch(err => console.error('Save failed:', err));
}, 5000);

//theme switcher
const root = document.querySelector(":root");
document.body.classList.add("no-animation");

const themes = {
    dark: {
        '--text-color': '#cdd6f4',
        '--header-color': '#181825',
        '--bg-color': '#1e1e2e',
        '--link-color': '#89dceb',
        '--btn-color': '#74c7ec',
        '--btn-hover': '#89dceb',
        '--btn-text': '#45475a',
        '--coll-color': '#313244',
        '--shadow': 'rgba(0, 0, 0, 0.53)'
    },
    light: {
        '--text-color': '#4c4f69',
        '--header-color': '#e6e9ef',
        '--bg-color': '#eff1f5',
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

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    setTheme('dark');
    document.getElementById("theme-switcher-grid").classList.add("night-theme");
} else {
    setTheme('light');
    document.getElementById("theme-switcher-grid").classList.remove("night-theme");
}

