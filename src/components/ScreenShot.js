import React from 'react';
import screenshot from './screenshot.png';

const Screenshot = () => {
  return (
    <div className="screenshot">
      <img src={screenshot} alt="Screenshot of the app" />
    </div>
  );
};

export default Screenshot;