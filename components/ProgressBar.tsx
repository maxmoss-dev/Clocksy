import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressBarProps {
  progress: number
}

const ProgressBar = (props: ProgressBarProps) => {
  const {progress} = props;
  return (
    <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, {top: `${100 - (progress / 60 * 100)}%`}]} />
    </View>
  );
};

const styles = StyleSheet.create({
    progressBarContainer: {
      width: 10,
      height: 50,
      backgroundColor: '#222',
      borderRadius: 50,
      marginHorizontal: 20,
      overflow: 'hidden',
      position: 'relative',
    },
    progressBar: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
      borderRadius: 50,
    },
});

export default ProgressBar;