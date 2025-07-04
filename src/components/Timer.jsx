import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, Pause, Play, Settings, Trash, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast, Toaster } from "sonner";
import alarm from "../assets/mixkit-happy-bells-notification-937.wav";
import ColorSelector from "./ColorSelector";

function Timer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [color, setColor] = useState("");
  const [startTime, setStartTime] = useState(null);
  //
  const [hourLimit, setHourLimit] = useState("");
  const [minuteLimit, setMinuteLimit] = useState("");
  const [secondLimit, setSecondLimit] = useState("");

  const limitMilliseconds =
    (Number(hourLimit) || 0) * 3600 * 1000 + (Number(minuteLimit) || 0) * 60 * 1000 + (Number(secondLimit) || 0) * 1000;

  const playSound = () => {
    const audio = new Audio(alarm);
    audio.play();
  };

  useEffect(() => {
    document.body.style.backgroundImage = `url(${color})`;
  }, [color]);

  useEffect(() => {
    let interval;
    if (isRunning && limitMilliseconds > 0) {
      interval = setInterval(() => {
        setTime(() => {
          const currentTime = Date.now();
          const elapsedTime = currentTime - startTime;
          
          if (elapsedTime >= limitMilliseconds) {
            playSound();
            clearInterval(interval);
            setIsRunning(false);
            toast.success("Timer completed!", {
              style: {
                background: "rgba(104, 71, 236, 0.55)",
                color: "#ffff",
              },
            });
            return limitMilliseconds;
          }

          return elapsedTime;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning, limitMilliseconds, startTime]);

  const displayTime = () => {
    const remainingTime = Math.max(0, limitMilliseconds - time);
    const h = Math.floor(remainingTime / 3600000);
    const m = Math.floor((remainingTime % 3600000) / 60000);
    const s = Math.floor((remainingTime % 60000) / 1000);
    const ms = Math.floor((remainingTime % 1000) / 100);
    return { h, m, s, ms };
  };

  function TimeDisplay({ h, m, s, ms }) {
    const pad = (val) => String(val).padStart(2, "0");
    return (
      <h1>
        {pad(h)} <span>hour</span> {pad(m)} <span>min</span> {pad(s)}{" "}
        <span>sec</span> {ms}
      </h1>
    );
  }

  const { h, m, s, ms } = displayTime(time);

  const handleStart = () => {
    if (!limitMilliseconds || isNaN(limitMilliseconds)) {
      toast.error("set timer please", {
        style: {
          background: "rgba(104, 71, 236, 0.55)",
          color: "#ffff",
        },
      });
      return;
    }
    setStartTime(Date.now());
    setIsRunning(true);
  };
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setStartTime(null);
    setSecondLimit("");
    setMinuteLimit("");
    setHourLimit("");
  };

  return (
    <div className="main-container">
      <h1 className="main-title ">CountDown Timer <span className="text-l">v1.1</span></h1>
      <h1 className="timer-display">
        <TimeDisplay h={h} m={m} s={s} ms={ms} />
      </h1>
      <div className="btns">
        <AlertDialog>
          <AlertDialogTrigger className="btn-set btn">
            <Settings />
          </AlertDialogTrigger>
          <AlertDialogContent className="dialog-content">
            <AlertDialogHeader>
              <AlertDialogTitle className="title-dialog">
                Set timer
              </AlertDialogTitle>
              <AlertDialogDescription className="main-dialog">
                <input
                  className="inp-hour inp"
                  type="number"
                  min={0}
                  placeholder="Hour"
                  value={hourLimit}
                  onChange={(e) => setHourLimit(e.target.value)}
                  disabled={isRunning}
                />
                <span className="timer-bet"></span>
                <input
                  className="inp-minute inp"
                  type="number"
                  min={0}
                  placeholder="Min"
                  value={minuteLimit}
                  onChange={(e) => setMinuteLimit(e.target.value)}
                  disabled={isRunning}
                />
                <span className="timer-bet"></span>
                <input
                  className="inp-second inp"
                  type="number"
                  min={0}
                  placeholder="Sec"
                  value={secondLimit}
                  onChange={(e) => setSecondLimit(e.target.value)}
                  disabled={isRunning}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                className="btn-cancel"
                onClick={() => {
                  setIsRunning(false);
                  setTime(0);
                  setStartTime(null);
                  setHourLimit("");
                  setMinuteLimit("");
                  setSecondLimit("");
                }}
              >
                <X />
              </AlertDialogCancel>
              <AlertDialogAction className="btn-confirm" onClick={handleStart}>
                <Check />
              </AlertDialogAction>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        <Button
          className="btn-start btn"
          onClick={handleStart}
          disabled={isRunning}
        >
          <Play />
        </Button>
        <Button
          className="btn-pause btn"
          onClick={handlePause}
          disabled={!isRunning}
        >
          <Pause />
        </Button>
        <Button className="btn-reset btn" onClick={handleReset}>
          <Trash />
        </Button>
      </div>
      <Toaster />
      <ColorSelector setColor={setColor} />
    </div>
  );
}

export default Timer;