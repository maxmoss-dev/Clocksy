import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated } from 'react-native';
import Clock from './Clock';
import Timer from './Timer';

const Main = () => {
  const clockScale = useRef<Animated.Value>(new Animated.Value(1)).current;
  const timerScale = useRef<Animated.Value>(new Animated.Value(0)).current;
  const clockOpacity = useRef<Animated.Value>(new Animated.Value(1)).current;
  const [timerTime, setTimerTime] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const timerTimeRef = useRef<number>(timerTime);

  const timePoint = 15;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setTimerRunning(false);  // Stop the timer on touch
      },
      onPanResponderMove: (evt, gestureState) => {
        const dy = gestureState.dy;
        const moveUp = dy < 0;

        setTimerRunning(false);

        // timer time
        const newTimerTime = timerTimeRef.current + Math.floor(-dy / 5);
        setTimerTime(newTimerTime);

        if ((!moveUp && newTimerTime < timePoint) || moveUp) {
          const changeIndex = 2000;
          
          // clock opacity
          const newClockOpacity = Math.min(Math.max(clockOpacity._value + dy / 1000, 0.6), 1);
          clockOpacity.setValue(newClockOpacity);

          // clock scale
          const clockMin = 0.25;
          const clockChange = 1 - clockMin;
          const clockIndex = changeIndex / clockChange;
          const newClockScale = Math.min(Math.max(clockScale._value + dy / clockIndex, clockMin), 1.05);
          clockScale.setValue(newClockScale);
  
          // timer scale
          const timerMin = 0;
          const timerChange = 1 - timerMin;
          const timerIndex = changeIndex / timerChange;
          const newTimerScale = Math.min(Math.max(timerScale._value - dy / timerIndex, timerMin), 1.05);
          timerScale.setValue(newTimerScale);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        const dy = gestureState.dy;
        const newTimerTime = Math.floor(-dy / 5);
        const moveUp = dy < 0;

        setTimerRunning(true);

        setTimerTime(timerTimeRef.current + newTimerTime);
        timerTimeRef.current = timerTimeRef.current + newTimerTime;

        if (timerTimeRef.current > timePoint) {
          Animated.spring(clockScale, {
            toValue: 0.25,
            useNativeDriver: false,
          }).start();
          Animated.spring(clockOpacity, {
            toValue: 0.6,
            useNativeDriver: false,
          }).start();
          Animated.spring(timerScale, {
            toValue: 1,
            useNativeDriver: false,
          }).start();
        } else {
          Animated.spring(clockScale, {
            toValue: 1,
            useNativeDriver: false,
          }).start(() => {
            setTimerTime(0);
            timerTimeRef.current = 0;
          });
          Animated.spring(timerScale, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
          Animated.spring(clockOpacity, {
            toValue: 1,
            useNativeDriver: false,
          }).start();
        }
      }
    })
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Animated.View
        style={[
          styles.itemContainer,
          styles.clockContainer,
          {
            opacity: clockOpacity,
            transform: [
              { scale: clockScale }
            ],
          }
        ]}
      >
        <Clock />
      </Animated.View>
      <Animated.View
        style={[
          styles.itemContainer,
          styles.timerContainer,
          {
            transform: [
              { scale: timerScale }
            ],
          }
        ]}
      >
        <Timer {...{timerTime, timerRunning, setTimerTime}} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
  itemContainer: {
    display: 'flex',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clockContainer: {
    transformOrigin: 'left top',
    top: 0,
    left: 0,
  },
  timerContainer: {
    transformOrigin: 'right bottom',
    bottom: 0,
    right: 0,
  },
});

export default Main;