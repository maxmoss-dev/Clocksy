import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, useWindowDimensions } from 'react-native';
import ProgressBar from './ProgressBar';

interface TimerProps {
  timerTime: number, 
  setTimerTime: (updateFunction: (currentTimerTime: number) => number) => void; 
  timerRunning: boolean
}

const Timer = (props: TimerProps) => {
  const {timerTime, setTimerTime, timerRunning} = props;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const secondsIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(60);
  const { width, height } = useWindowDimensions();

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
        setTimerTime(prevTimerTime => {
          if (prevTimerTime > 0) {
            return prevTimerTime - 1;
          } else {
            stopTimer();
            return 0; // Ensure the state is set to 0 when the timer stops.
          }
        });
      }, 60 * 1000); // Assuming you want the timer to tick every second.
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

  const fontSize = height > width ? 80 : 180;

  return (
    <View style={styles.container}>
      {timerTime > 0 ? (
        <View style={styles.container}>
          <Text style={[styles.timeText, { fontSize }]}>{hours.toString().padStart(1, '0')}</Text>
          <ProgressBar progress={seconds} />
          <Text style={[styles.timeText, { fontSize }]}>{minutes.toString().padStart(2, '0')}</Text>
        </View>
      ) : (
        <Text style={[styles.timeText, { fontSize }]}>0</Text>
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
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Timer;

