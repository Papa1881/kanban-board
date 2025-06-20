import React, { useState } from 'react';

function AddTaskForm({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (trimmed) {
      onSubmit(trimmed);
      setValue('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
      <input
        type="text"
        value={value}
        placeholder="New task title..."
        onChange={(e) => setValue(e.target.value)}
        style={{
          padding: '8px',
          fontSize: '14px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      <button
        onClick={handleSubmit}
        style={{
          padding: '8px',
          fontSize: '14px',
          background: '#0074d9',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
      </button>
    </div>
  );
}

export default AddTaskForm;