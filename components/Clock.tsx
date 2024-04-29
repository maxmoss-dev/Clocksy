import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ProgressBar from './ProgressBar';

const Clock = () => {
  const [time, setTime] = useState<{ hours: string, minutes: string, seconds: number }>
                            ({ hours: '', minutes: '', seconds: 60 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime({
        hours: now.getHours().toString().padStart(2, '0'),
        minutes: now.getMinutes().toString().padStart(2, '0'),
        seconds: now.getSeconds()
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{time.hours}</Text>
      <ProgressBar progress={time.seconds} />
      <Text style={styles.timeText}>{time.minutes}</Text>
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

export default Clock;