import React, { useState } from 'react';
import TaskCard from './TaskCard';
import AddTaskForm from './AddTaskForm';
import './Column.css';

function Column({ title, issues, onAddTask, moveOptions, onMoveTask }) {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState('');

  const handleAddClick = () => {
    if (title === 'Backlog') {
      setIsAdding(true);
    }
  };

  const handleSubmit = (taskName) => {
    onAddTask(taskName);
    setIsAdding(false);
  };

  const handleMove = () => {
    if (!selectedTaskId) return;
    onMoveTask(selectedTaskId);
    setSelectedTaskId('');
  };

  const isMoveAvailable = moveOptions && moveOptions.length > 0;

  return (
    <div className="column">
      <h2 className="column-title">{title}</h2>

      <div className="column-body">
        <div className="task-list">
          {issues.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}

          {isAdding && title === 'Backlog' && (
            <AddTaskForm onSubmit={handleSubmit} />
          )}

          {title !== 'Backlog' && isMoveAvailable && (
            <>
              <select
                value={selectedTaskId}
                onChange={(e) => setSelectedTaskId(e.target.value)}
                style={{ marginTop: '10px', padding: '8px', width: '100%' }}
              >
                <option value="">Select task</option>
                {moveOptions.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleMove}
                style={{ marginTop: '6px', padding: '8px', width: '100%' }}
              >
                Submit
              </button>
            </>
          )}
        </div>

        {title === 'Backlog' && !isAdding && (
          <button className="add-card-btn" onClick={handleAddClick}>
            + Add card
          </button>
        )}

        {title !== 'Backlog' && !isMoveAvailable && (
          <button className="add-card-btn" disabled>
            + Add card
          </button>
        )}
      </div>
    </div>
  );
}

export default Column;