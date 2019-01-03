// READ EXISTING NOTES FROM LOCALSTORAGE
const getSavedNotes = function() {
  const notesJSON = localStorage.getItem("notes");
  return notesJSON ? JSON.parse(notesJSON) : [];
};

// SAVE THE NOTES TO LOCALSTORAGE
const saveNotes = function(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
};

// REMOVE A NOTE FROM THE LIST
const removeNote = function(id) {
  const noteIndex = notes.findIndex(function(note) {
    return note.id === id;
  });

  noteIndex > -1 ? notes.splice(noteIndex, 1) : null;
};

// GENERATE THE DOM STRUCTURE FOR A NOTE
const generateNoteDom = function(note) {
  const noteEl = document.createElement("div");
  const textEl = document.createElement("a");
  const button = document.createElement("button");

  // Setup the remove note button
  button.textContent = "X";
  noteEl.appendChild(button);
  button.addEventListener("click", function() {
    // REMOVE
    removeNote(note.id);
    // SAVE
    saveNotes(notes);
    // RERENDER
    renderNotes(notes, filters);
  });

  // SETUP THE NOTE TITLE TEXT
  note.title.length
    ? (textEl.textContent = note.title)
    : (textEl.textContent = "Unnamed note");
  textEl.setAttribute("href", `/edit.html#${note.id}`);
  noteEl.appendChild(textEl);

  return noteEl;
};

// SORT YOUR NOTES BY ONE OF THREE WAYS ACCORDING TO OPTION VALUE IN INDEX.HTML
const sortNotes = function(notes, sortBy) {
  if (sortBy === "byEdited") {
    return notes.sort(function(a, b) {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
      // return b.updatedAt - a.updatedAt;
    });
  } else if (sortBy === "byCreated") {
    return notes.sort(function(a, b) {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "alphabetically") {
    return notes.sort(function(a, b) {
      // if (a.title.toLowerCase() < b.title.toLowerCase()) {
      //   return -1;
      // } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
      //   return 1;
      // } else {
      //   return 0;
      // }
      return b.updatedAt - a.updatedAt;
    });
  }
};

// FILTERING NOTES
const renderNotes = function(notes, filters) {
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter(function(note) {
    return note.title.toLowerCase().includes(filters.renderTodos.toLowerCase());
  });

  document.querySelector("#notes").innerHTML = "";

  filteredNotes.forEach(function(note) {
    const noteEl = generateNoteDom(note);
    document.querySelector("#notes").appendChild(noteEl);
  });
};

// GENERATE THE LAST EDITED MESSAGE
const generateLastEdited = function(timeStamp) {
  return `Last edited ${moment(timeStamp).fromNow()}`;
};
