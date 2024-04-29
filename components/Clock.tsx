import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, useWindowDimensions } from 'react-native';
import ProgressBar from './ProgressBar';

const Clock = () => {
  const [time, setTime] = useState<{ hours: string, minutes: string, seconds: number }>
                            ({ hours: '', minutes: '', seconds: 60 });
  const { width, height } = useWindowDimensions();

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

  const fontSize = height > width ? 80 : 180;

  return (
    <View style={styles.container}>
      <Text style={[styles.timeText, { fontSize }]}>{time.hours}</Text>
      <ProgressBar progress={time.seconds} />
      <Text style={[styles.timeText, { fontSize }]}>{time.minutes}</Text>
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

export default Clock;