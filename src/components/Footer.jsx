import React from 'react';
import './Footer.css';

function Footer({ activeCount, finishedCount }) {
  return (
    <footer className="footer">
      <span>Active tasks: {activeCount}</span>
      <span>Finished tasks: {finishedCount}</span>
      <span>Kanban board by Илья Денисович, 2025</span>
    </footer>
  );
}

export default Footer;