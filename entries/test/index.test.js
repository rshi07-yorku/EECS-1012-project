import { describe, it, expect, vi, beforeEach } from 'vitest';

// -------------------------
// SETUP DOM
// -------------------------
beforeEach(() => {
    document.body.innerHTML = `
        <div id="welcome-msg"></div>
        <div id="file-list"></div>
    `;

    // Mock root style
    document.querySelector = vi.fn((selector) => {
        if (selector === ":root") {
            return {
                style: {
                    setProperty: vi.fn()
                }
            };
        }
        return document.getElementById(selector.replace("#", ""));
    });

    // mock window.location
    delete window.location;
    window.location = { href: "" };

    // Reset fetch
    global.fetch = vi.fn();
});

// -------------------------
// IMPORT FUNCTIONS
// -------------------------
import { checkUser, listEntries, setTheme, themes } from '../yourFile.js';

// -------------------------
// TEST checkUser()
// -------------------------
describe("checkUser()", () => {
    it("redirects to login when not logged in", async () => {
        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ loggedIn: false })
        });

        await checkUser();

        expect(window.location.href).toBe("login.html");
    });

    it("sets welcome message and returns username when logged in", async () => {
        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ loggedIn: true, username: "Jacob" })
        });

        const username = await checkUser();

        expect(username).toBe("Jacob");
        expect(document.getElementById("welcome-msg").textContent)
            .toBe("Welcome Jacob");
    });

    it("redirects to login on fetch error", async () => {
        fetch.mockRejectedValueOnce(new Error("Network failure"));

        await checkUser();

        expect(window.location.href).toBe("login.html");
    });
});

// -------------------------
// TEST listEntries()
// -------------------------
describe("listEntries()", () => {

    it("shows 'no entries' when files array empty", async () => {
        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ files: [] })
        });

        await listEntries();

        expect(document.getElementById("file-list").innerHTML)
            .toContain("No entries");
    });

    it("renders list of entries when files exist", async () => {
        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ files: ["01012025", "01022025"] })
        });

        await listEntries();

        const html = document.getElementById("file-list").innerHTML;
        expect(html).toContain(`edit.html?date=01012025`);
        expect(html).toContain(`01/01/2025`);
    });

    it("redirects to login on 401 error", async () => {
        fetch.mockRejectedValueOnce(new Error("401 Unauthorized"));

        await listEntries();

        expect(window.location.href).toBe("login.html");
    });

    it("shows error message for other errors", async () => {
        fetch.mockRejectedValueOnce(new Error("Server down"));

        await listEntries();

        expect(document.getElementById("file-list").innerHTML)
            .toContain("Error loading entries");
    });
});

// -------------------------
// TEST setTheme()
// -------------------------
describe("setTheme()", () => {

    it("sets dark theme CSS variables", () => {
        const root = document.querySelector(":root");

        setTheme("dark");

        const entries = Object.entries(themes.dark);
        entries.forEach(([prop, value]) => {
            expect(root.style.setProperty).toHaveBeenCalledWith(prop, value);
        });
    });

    it("sets light theme CSS variables", () => {
        const root = document.querySelector(":root");

        setTheme("light");

        const entries = Object.entries(themes.light);
        entries.forEach(([prop, value]) => {
            expect(root.style.setProperty).toHaveBeenCalledWith(prop, value);
        });
    });
});
