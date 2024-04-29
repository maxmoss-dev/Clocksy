import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ProgressBar from './ProgressBar';

interface TimerProps {
  timerTime: number, 
  setTimerTime: (timerTime: number) => void, 
  timerRunning: boolean
}

const Timer = (props: TimerProps) => {
  const {timerTime, setTimerTime, timerRunning} = props;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const secondsIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(60);

  useEffect(() => {
    setHours(Math.floor(timerTime / 60));
    setMinutes(timerTime % 60);
    setSeconds(60);
  }, [timerTime]);

  useEffect(() => {
    if (timerRunning) {
      startTimer();
      startSecondsTimer();
    } else {
      stopTimer();
      stopSecondsTimer();
    }

    return () => {
      stopTimer();
      stopSecondsTimer();
    };
  }, [timerRunning]);

  const startTimer = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        if (timerTime > 0) {
          setTimerTime(timerTime - 1);
        } else {
          stopTimer();
        }
      }, 60000); // Interval set for minute decrement
    }
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startSecondsTimer = () => {
    if (!secondsIntervalRef.current) {
      secondsIntervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            return 60;
          }
        });
      }, 1000);
    }
  };

  const stopSecondsTimer = () => {
    if (secondsIntervalRef.current) {
      clearInterval(secondsIntervalRef.current);
      secondsIntervalRef.current = null;
    }
  };

  return (
    <View style={styles.container}>
      {timerTime > 0 ? (
        <View style={styles.container}>
          <Text style={styles.timeText}>{hours.toString().padStart(1, '0')}</Text>
          <ProgressBar progress={seconds} />
          <Text style={styles.timeText}>{minutes.toString().padStart(2, '0')}</Text>
        </View>
      ) : (
        <Text style={styles.timeText}>0</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 160,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Timer;

