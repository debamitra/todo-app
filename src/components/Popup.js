import React from 'react';
import PropTypes from 'prop-types';
import './Popup.css';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faStopwatch } from '@fortawesome/free-solid-svg-icons'

const Popup = ({ todoText, onClose, onStop,timeSpent, id }) => {
 

  /*changes*/
  const [isRunning, setIsRunning] = React.useState(false);
  const [time, setTime] = React.useState(timeSpent);
  const intervalRef = React.useRef();

  React.useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);


  function handleStart() {
    setIsRunning(true);
  }

  function handleStop() {
    setIsRunning(false);
    console.log(time)
    onStop(id,time);
    

  }
  function handleClose() {
    setIsRunning(false);
    
    onStop(id,time);
    onClose();
    

  }
  function handleReset() {
    setIsRunning(false);
    setTime(0);
    onStop(id,0);
  }


  //   const handleStop = () => {
  //     onStop(seconds);
  //     setSeconds(0);
  //   };

  //   React.useEffect(() => {
  //     const intervalId = setInterval(() => {
  //       setSeconds(prevSeconds => prevSeconds + 1);
  //     }, 1000);

  //     return () => {
  //       clearInterval(intervalId);
  //     };
  //   }, []);

  const formatTimeSecs = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  const formatTimeMins = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <div className="popup">
      <div className="content">
        <div className="todo-text-container">
          <h3>{todoText}</h3>
        </div>
        <div className="timer">
          {/*<FontAwesomeIcon icon={faStopwatch} />*/}
          <span className="timermins">
            {formatTimeMins(time)}

          </span>
          <span className="timersecs">
            {formatTimeSecs(time)}
          </span>

        </div>
        <div className="line"></div>
        <div className="popup-buttons">
          <button onClick={handleReset}>Reset</button>
          {isRunning ? (
            <button onClick={handleStop}>Stop</button>
          ) : (
            <button onClick={handleStart}>Start</button>
          )}


          <button onClick={handleClose}>Close</button>

        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  todoText: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onStop: PropTypes.func.isRequired,
};

export default Popup;
