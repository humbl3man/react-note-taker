import React from 'react';
import { FaSmileWink } from 'react-icons/fa';

const EditPane = ({ onUpdateNote, onSubmitNote, onCancel, note }) => {
  if (!note) {
    return (
      <div className="empty">
        Pss... Select existing note, or create a new one <FaSmileWink />
      </div>
    );
  }

  return (
    <form
      key={note.id}
      onSubmit={e => {
        e.preventDefault();
        onSubmitNote();
      }}
    >
      <input
        placeholder="Note title..."
        className="input"
        type="text"
        value={note.title}
        onChange={e => {
          onUpdateNote({ ...note, title: e.target.value });
        }}
      />
      <textarea
        placeholder="Note text..."
        className="input"
        value={note.content}
        rows={7}
        onChange={e => {
          onUpdateNote({ ...note, content: e.target.value });
        }}
      />
      <div className="btn-group">
        <button className="btn btn-action" type="submit">
          <i className="fa fa-pen" /> {note.isUpdating ? 'Update' : 'Create'} Note
        </button>
        <button className="btn btn-cancel" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditPane;
