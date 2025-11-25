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

