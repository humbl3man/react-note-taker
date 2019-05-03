import React, { useState, useEffect } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';

import EditPane from './editPane';
import NoteList from './noteList';
import NoteError from './error';

import './app.scss';

const App = () => {
  console.log('app initialized');

  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [noteError, setNoteError] = useState(null);

  useEffect(() => {
    getNotesFromStorage();
  }, []);

  useEffect(
    () => {
      saveNotesToStorage();
    },
    [notes]
  );

  function getNotesFromStorage() {
    if (window.localStorage && window.localStorage.getItem('ss_notes_humbl3man')) {
      setNotes(JSON.parse(window.localStorage.getItem('ss_notes_humbl3man')));
    }
  }

  function saveNotesToStorage() {
    if (window.localStorage) {
      window.localStorage.setItem('ss_notes_humbl3man', JSON.stringify(notes));
    }
  }

  function onUpdateActiveNote(note) {
    setActiveNote(note);
    if (activeNote.title && activeNote.content) {
      setNoteError(null);
    }
  }

  function onSubmitActiveNote() {
    if (activeNote.title && activeNote.content) {
      if (activeNote.isUpdating) {
        setNotes([
          ...notes.map(note => {
            if (note.id === activeNote.id) {
              note.title = activeNote.title;
              note.content = activeNote.content;
              note.isActive = false;
            }
            return note;
          })
        ]);
      } else {
        setNotes([...notes, activeNote]);
      }
      setActiveNote(null);
      setNoteError(null);
    } else {
      setNoteError('Missing title and/or text.');
    }
  }

  function createActiveNote() {
    setActiveNote({
      id: Number((Math.random() * 100).toString().split('.')[0] + (Math.random() * 100).toString().split('.')[1]),
      isUpdating: false
    });
  }

  function updateCurrentNote(note) {
    setActiveNote({
      ...note,
      isUpdating: true
    });
  }

  function onCancel() {
    setActiveNote(null);
    setNoteError(null);
  }

  function deleteNote() {
    const activeNoteIndex = notes.findIndex(note => note.isActive);
    if (activeNoteIndex > -1) {
      setNotes([...notes.slice(0, activeNoteIndex), ...notes.slice(activeNoteIndex + 1)]);
      setActiveNote(null);
      setNoteError(null);
    }
  }

  function setActive(id) {
    setNotes(
      notes.map(note => {
        if (note.id === id) {
          note.isActive = true;
        } else {
          note.isActive = false;
        }
        return note;
      })
    );
  }

  return (
    <main id="app">
      <NoteError
        noteError={noteError}
        dismissError={() => {
          setNoteError(null);
        }}
      />
      <header className="control-panel">
        <button type="button" onClick={createActiveNote}>
          <FaPen />
        </button>
        <button type="button" onClick={deleteNote}>
          <FaTrash />
        </button>
      </header>
      <section className="notes">
        <aside className="list-wrapper">
          <NoteList notes={notes} setActive={setActive} updateCurrentNote={updateCurrentNote} />
        </aside>
        <section className="edit-pane">
          <EditPane
            note={activeNote}
            onUpdateNote={onUpdateActiveNote}
            onSubmitNote={onSubmitActiveNote}
            onCancel={onCancel}
          />
        </section>
      </section>
    </main>
  );
};

export default App;
