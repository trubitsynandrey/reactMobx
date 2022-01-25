import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react-lite'

class Timer {
  secondsPassed = 0;

  constructor() {
    makeAutoObservable(this)
  }

  inscreaseTimer() {
    this.secondsPassed +=1
  }
}

const clearTimer = () => {
  clearInterval(timerInterval)
}

const myTimer = new Timer();

const TimerView = observer(({ timer, onClickInterval }) => <>
<p>Seconds passed: {timer.secondsPassed}</p>
<button onClick={onClickInterval}>press me</button>
</>)

ReactDOM.render(
  <React.StrictMode>
    <TimerView timer={myTimer} onClickInterval={clearTimer} />
  </React.StrictMode>,
  document.getElementById('root')
);

const timerInterval = setInterval(() => {
  myTimer.inscreaseTimer()
}, 1000)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
