import React from 'react';
import { FaSadTear } from 'react-icons/fa';

const NoteList = ({ notes, setActive, updateCurrentNote }) => {
  if (!notes || notes.length < 1) {
    return (
      <div className="empty">
        You don
        {"'"}t have any notes.
        <br /> Such sadness... <FaSadTear />{' '}
      </div>
    );
  }

  return (
    <ul>
      {notes.map(note => (
        <li
          key={note.id}
          className={note.isActive ? 'active' : ''}
          onClick={() => {
            setActive(note.id);
            updateCurrentNote(note);
          }}
        >
          {note.title}
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
