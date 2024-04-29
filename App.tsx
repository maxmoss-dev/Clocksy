import React from 'react';
import { View, StyleSheet } from 'react-native';
import Main from './components/Main'; // Adjust the path as necessary

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Main />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;