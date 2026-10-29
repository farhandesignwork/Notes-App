
// Get HTML elements
const loginScreen = document.getElementById("loginScreen");
const welcomeScreen = document.getElementById("welcomeScreen");
const nameInput = document.getElementById("nameInput");
const loginBtn = document.getElementById("loginBtn");
const welcomeMessage = document.getElementById("welcomeMessage");
const logoutBtn = document.getElementById("logoutBtn");
const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesList = document.getElementById("notesList");

// Load saved user and notes from localStorage
let savedName = JSON.parse(localStorage.getItem("userName"));
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Show the correct screen
function showScreen() {
    if (savedName) {
        loginScreen.classList.add("hidden");
        welcomeScreen.classList.remove("hidden");

        welcomeMessage.textContent = "Welcome, " + savedName + "!";
    } else {
        loginScreen.classList.remove("hidden");
        welcomeScreen.classList.add("hidden");
    }

    displayNotes();
}

// Login
loginBtn.addEventListener("click", function () {
    const name = nameInput.value.trim();

    if (name === "") {
        alert("Please enter your name!");
        return;
    }

    savedName = name;

    // Save name using JSON.stringify()
    localStorage.setItem("userName", JSON.stringify(savedName));

    nameInput.value = "";

    showScreen();
});

// Display all notes
function displayNotes() {
    notesList.innerHTML = "";

    if (notes.length === 0) {
        notesList.textContent = "No notes added yet.";
        return;
    }

    notes.forEach(function (note) {
        const noteDiv = document.createElement("div");
        noteDiv.className = "note";

        // textContent safely displays the note as text
        noteDiv.textContent = note;

        notesList.appendChild(noteDiv);
    });
}

// Add a new note
addNoteBtn.addEventListener("click", function () {
    const noteText = noteInput.value.trim();

    if (noteText === "") {
        alert("Please write a note!");
        return;
    }

    // Add note to array
    notes.push(noteText);

    // Save notes using JSON.stringify()
    localStorage.setItem("notes", JSON.stringify(notes));

    noteInput.value = "";

    // Update notes on the page
    displayNotes();
});

// Logout
logoutBtn.addEventListener("click", function () {
    // Remove only the saved username
    localStorage.removeItem("userName");

    savedName = null;

    showScreen();
});

// Run when the page loads or refreshes
showScreen();
