import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const App = () => {
  return (
    <View style={styles.container}>
     
      <WebView
        source={{ uri: 'http://192.168.1.84:5173' }} 
        style={styles.webview}
        javaScriptEnabled={true} 
        domStorageEnabled={true} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default App;
