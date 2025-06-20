import React, { useState, useEffect } from 'react';
import Column from './Column';
import './Board.css';
import { loadFromStorage, saveToStorage } from '../utils/localStorageUtils';
import Footer from './Footer';

const initialData = [
  {
    title: 'Backlog',
    issues: [
      {
        id: '1',
        name: 'Login page – performance issues',
        description: 'Login form takes too long to respond. Needs optimization.'
      },
      {
        id: '2',
        name: 'Sprint bugfix',
        description: 'Fix all bugs reported during sprint review.'
      },
    ],
  },
  {
    title: 'Ready',
    issues: [
      {
        id: '3',
        name: 'Shop page – performance issues',
        description: 'Slow image loading on shop page.'
      },
      { id: '4', name: 'Checkout bugfix' },
      { id: '5', name: 'Shop bug1' },
      { id: '6', name: 'Shop bug2' },
      { id: '7', name: 'Shop bug3' },
      { id: '8', name: 'Shop bug4' },
      { id: '9', name: 'Shop bug5' },
      { id: '10', name: 'Shop bug6' },
      {
        id: '11',
        name: 'Shop page – performance issues',
        description: 'Critical rendering path optimization needed.'
      },
    ],
  },
  {
    title: 'In Progress',
    issues: [
      { id: '12', name: 'User page – performance issues' },
      { id: '13', name: 'Auth bugfix' },
    ],
  },
  {
    title: 'Finished',
    issues: [
      {
        id: '14',
        name: 'Main page – performance issues',
        description: 'Optimized hero section and lazy-loaded images.'
      },
      { id: '15', name: 'Main page bugfix' },
    ],
  },
];

function Board() {
  const [columns, setColumns] = useState(() => {
    const saved = loadFromStorage();
    return saved || initialData;
  });

  useEffect(() => {
    saveToStorage(columns);
  }, [columns]);

  const handleAddTaskToBacklog = (taskName) => {
    const newTask = {
      id: Date.now().toString(),
      name: taskName,
    };

    const updatedColumns = columns.map((column) =>
      column.title === 'Backlog'
        ? { ...column, issues: [...column.issues, newTask] }
        : column
    );

    setColumns(updatedColumns);
  };

  const moveTask = (fromTitle, toTitle, taskId) => {
    const fromColumn = columns.find((col) => col.title === fromTitle);
    const toColumn = columns.find((col) => col.title === toTitle);
    const taskToMove = fromColumn.issues.find((task) => task.id === taskId);

    const updatedColumns = columns.map((col) => {
      if (col.title === fromTitle) {
        return {
          ...col,
          issues: col.issues.filter((task) => task.id !== taskId),
        };
      }
      if (col.title === toTitle) {
        return {
          ...col,
          issues: [...col.issues, taskToMove],
        };
      }
      return col;
    });

    setColumns(updatedColumns);
  };

  const getPrevColumnTitle = (title) => {
    const order = ['Backlog', 'Ready', 'In Progress', 'Finished'];
    const index = order.indexOf(title);
    return index > 0 ? order[index - 1] : null;
  };

  const getPrevColumnTasks = (title) => {
    const prevTitle = getPrevColumnTitle(title);
    return prevTitle
      ? columns.find((col) => col.title === prevTitle)?.issues || []
      : [];
  };

  return (
  <>
    <div className="board">
      {columns.map((column) => {
        const isBacklog = column.title === 'Backlog';
        const moveOptions = isBacklog ? [] : getPrevColumnTasks(column.title);
        const fromTitle = getPrevColumnTitle(column.title);

        return (
          <Column
            key={column.title}
            title={column.title}
            issues={column.issues}
            onAddTask={isBacklog ? handleAddTaskToBacklog : undefined}
            moveOptions={moveOptions}
            onMoveTask={
              !isBacklog
                ? (taskId) => moveTask(fromTitle, column.title, taskId)
                : undefined
            }
          />
        );
      })}
    </div>

    <Footer
      activeCount={
        columns.find((col) => col.title === 'Backlog')?.issues.length || 0
      }
      finishedCount={
        columns.find((col) => col.title === 'Finished')?.issues.length || 0
      }
    />
  </>
);
}

export default Board;