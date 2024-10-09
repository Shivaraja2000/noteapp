// Retrieve notes from local storage
const getNotesFromStorage = () => {
    const notes = localStorage.getItem('notes');
    return notes ? JSON.parse(notes) : [];
};

// Save notes to local storage
const saveNotesToStorage = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes));
};

// Render notes to the UI
const renderNotes = () => {
    const notesList = document.getElementById('notesList');
    const notes = getNotesFromStorage();
    notesList.innerHTML = '';

    notes.forEach((note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        noteDiv.innerHTML = `
            <p>${note}</p>
            <div class="button-container">
                <button class="btn btn-danger btn-sm" onclick="deleteNote(${index})">Delete</button>
                <button class="btn btn-secondary btn-sm" onclick="editNote(${index})">Edit</button>
            </div>
        `;
        notesList.appendChild(noteDiv);
    });
};

// Add new note or update existing note
document.getElementById('noteForm').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission
    const noteInput = document.getElementById('noteInput');
    const notes = getNotesFromStorage();

    // Check if we are editing a note
    if (noteInput.dataset.editingIndex !== undefined) {
        notes[noteInput.dataset.editingIndex] = noteInput.value; // Update existing note
        delete noteInput.dataset.editingIndex; // Clear the editing index
    } else {
        notes.push(noteInput.value); // Add new note
    }

    saveNotesToStorage(notes); // Save updated notes to local storage
    noteInput.value = ''; // Clear the input field
    renderNotes(); // Re-render the notes
});

// Delete note with confirmation
const deleteNote = (index) => {
    const confirmation = confirm("Are you sure you want to delete this note?"); // Confirmation dialog
    if (confirmation) {
        const notes = getNotesFromStorage();
        notes.splice(index, 1); // Remove the note at the specified index
        saveNotesToStorage(notes); // Save updated notes to local storage
        renderNotes(); // Re-render the notes
    }
};

// Edit note
const editNote = (index) => {
    const notes = getNotesFromStorage();
    const noteInput = document.getElementById('noteInput');

    noteInput.value = notes[index]; // Set the textarea value to the note being edited
    noteInput.dataset.editingIndex = index; // Set data attribute to identify which note is being edited
};

// Initial render
renderNotes();
