const noteInput = document.getElementById('noteInput');
const addButton = document.getElementById('addButton');
const noteList = document.getElementById('noteList');

// Retrieve notes from localStorage on load
document.addEventListener('DOMContentLoaded', loadNotes);

// Function to load existing notes from localStorage
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(noteText => displayNote(noteText));
}

// Function to save notes to localStorage
function saveNotes() {
    const notes = Array.from(document.querySelectorAll('.note span')).map(note => note.textContent);
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Function to create and display a note
function createNote() {
    const noteText = noteInput.value.trim();

    if (noteText === "") {
        alert("Please enter a note.");
        return;
    }

    displayNote(noteText);
    saveNotes(); // Save the new list of notes
    noteInput.value = ""; // Clear the input
}

// Function to display a note in the UI
function displayNote(noteText) {
    const note = document.createElement('div');
    note.className = 'note';

    note.innerHTML = `
        <span>${noteText}</span>
        <div class="button-container">
            <button class="btn btn-danger btn-sm delete-btn">Delete</button>
            <button class="btn btn-info btn-sm edit-btn">Edit</button>
        </div>
    `;

    noteList.insertBefore(note, noteList.firstChild);

    const deleteButton = note.querySelector('.delete-btn');
    deleteButton.addEventListener('click', function () {
        if (confirm("Are you sure you want to delete this note?")) {
            noteList.removeChild(note);
            saveNotes(); // Save the updated list of notes
        }
    });

    const editButton = note.querySelector('.edit-btn');
    editButton.addEventListener('click', function () {
        noteInput.value = noteText; // Set the input value to the note text for editing
        noteList.removeChild(note); // Remove the note from the list for editing
        saveNotes(); // Save the updated list of notes
    });
}

// Add event listener to the add button
addButton.addEventListener('click', createNote);
