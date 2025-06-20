import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadFromStorage, saveToStorage } from '../utils/localStorageUtils';
import './TaskDetailPage.css';

function TaskDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [columns, setColumns] = useState([]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const saved = loadFromStorage();
    setColumns(saved || []);

    const allTasks = (saved || []).flatMap((col) => col.issues);
    const found = allTasks.find((t) => t.id === id);

    if (found) {
      setTask(found);
      setDescription(found.description || '');
    }
  }, [id]);

  useEffect(() => {
    if (!task) return;
    const updatedColumns = columns.map((col) => ({
      ...col,
      issues: col.issues.map((issue) =>
        issue.id === id ? { ...issue, description } : issue
      ),
    }));
    saveToStorage(updatedColumns);
  }, [description]); // сохраняем автоматически при каждом изменении

  if (!task) return <div className="task-page">Task not found</div>;

  return (
    <div className="task-page">
      <div className="task-container">
        <button className="close-btn" onClick={() => navigate('/')}>✕</button>
        <h2>{task.name}</h2>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="This task has no description"
        />
      </div>
    </div>
  );
}

export default TaskDetailPage;