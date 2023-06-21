import { useEffect, useRef, useState } from "react";
import "./App.css";
import Control from "./components/Control";
import a from "./assets/Heater-4_1.mp3";
function App() {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [timeLeft, setTimeLeft] = useState(sessionTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    setTimeLeft(sessionTime * 60);
  }, [sessionTime]);
  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft === 0) {
            audioRef.current.play();
            if (timerLabel === "Session") {
              setTimerLabel("Break");
              return breakTime * 60;
            } else {
              setTimerLabel("Session");
              return sessionTime * 60;
            }
          } else {
            return prevTimeLeft - 1;
          }
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [breakTime, isRunning, sessionTime, timerLabel]);
  const audioRef = useRef();
  const handleStartStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };
  const handleReset = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsRunning(false);
    setTimerLabel("Session");
    setBreakTime(5);
    setSessionTime(25);
    setTimeLeft(25 * 60);
  };
  return (
    <div id="container">
      <div className="app">
        <h1 className="main-title">25 + 5 Clock</h1>
        <Control
          isRunning={isRunning}
          title={"Break Length"}
          value={breakTime}
          setValue={setBreakTime}
        />
        <Control
          isRunning={isRunning}
          title={"Session Length"}
          value={sessionTime}
          setValue={setSessionTime}
        />
        <div className="timer" style={{ color: "white" }}>
          <div className="timer-wrapper">
            <div id="timer-label">{timerLabel}</div>
            <div id="time-left">{formatTime(timeLeft)}</div>
          </div>
        </div>
        <div className="timer-control">
          <button id="start_stop" onClick={handleStartStop}>
            <i className="fa fa-play fa-2x"></i>
            <i className="fa fa-pause fa-2x"></i>
          </button>
          <button id="reset" onClick={handleReset}>
            <i className="fa fa-refresh fa-2x"></i>
          </button>
        </div>
      </div>
      <audio id="beep" ref={audioRef} src={a} type="audio/mpeg" />
    </div>
  );
}

export default App;
