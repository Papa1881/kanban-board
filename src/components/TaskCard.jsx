import React from 'react';
import { Link } from 'react-router-dom';
import './TaskCard.css';

function TaskCard({ task }) {
  return (
    <div className="task-card">
      <Link to={`/tasks/${task.id}`}>
        {task.name}
      </Link>
    </div>
  );
}

export default TaskCard;