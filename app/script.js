import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const App = () => {

  const [status, setStatus] = useState('off');
  const [time, setTime] = useState (5);
  const [timer, setTimer] = useState(null);

  const formatTime = (seconds) => {
    const minutes = Math.floor((seconds % 3600) / 60);
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = (seconds % 60).toString().padStart(2, '0');
    const formatedTime =  formattedMinutes +':'+ formattedSeconds;
    return formatedTime
  }

  useEffect(() => {
    let timeGo; //zmienna która przechowuje wartośći setInterval z hooka useEffect() w zależności od stanu isRunning (czyli czy stoper jest uruchomiony czy nie)

    if (timer) {
      timeGo = setInterval(() => setTime((prevValue) => prevValue - 1), 1000); //Za pomocą hooka useEffect() definiowana jest funkcja, która co 10ms zwiększa wartość stanu time o 10
    }
    if (time === 0) {
      if(status === 'work') {
        setStatus('rest');
        setTime(20)
        clearInterval(timeGo);
      }
      else {
        startTimer();
      }
    }

    return () => {
      clearInterval(timeGo);
    };
  }, [timer, time]);
  
  const startTimer = () => {
    setTimer(true);
    setTime(5);
    setStatus('work');
  }

  const stopTimer = () => {
    setTimer(null)
    setTime(0);
    setStatus('off');
  }

  const closeApp = () => {
    window.close();
  }

    return (
      <div>
        <h1>Protect your eyes</h1>
        {status === 'off' && (
          <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
          </div>
        )}
        {status === 'work' && (
          <img src="./images/work.png" />
        )}
        {status === 'rest' && (
          <img src="./images/rest.png" />
        )}
        {status !== 'off' && (
          <div className="timer">
            {formatTime(time)}
          </div>
        )}
        {status === 'off' && (
          <button className="btn" onClick={startTimer}>Start</button>
        )}
        {status !== 'off' && (
          <button className="btn" onClick={stopTimer}>Stop</button>
        )}
        <button className="btn btn-close" onClick={closeApp}>X</button>
      </div>
    )
  }

render(<App />, document.querySelector('#app'));
