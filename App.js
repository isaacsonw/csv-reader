/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

import DocumentPicker from 'react-native-document-picker';
import Paper from 'papaparse';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getCSVFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: DocumentPicker.types.csv,
      });
      const filePath = res[0].uri;

      Paper.parse(filePath, {
        download: true,
        delimiter: '',
        header: true,
        complete: function (results) {
          console.log(results.data);
        },
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        console.log(err.message);
      }
    }
  };

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <Text style={{fontWeight: '700'}}>Upload a CSV file</Text>

      <TouchableOpacity onPress={getCSVFile}>
        <View style={styles.btn}>
          <Text style={{color: 'white', fontWeight: '700'}}>Select CSV</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  btn: {
    backgroundColor: '#333',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 5,
    marginTop: 30,
  },
});

export default App;
