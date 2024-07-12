import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment-hijri';

moment.locale('en');
export default function Calendar() {
  const hijriDate = moment().format('iYYYY/iD/');
  const hijriMonthName = moment().format('iMMMM');

  return (
    <View style={styles.container}>
      <View style={{
        height: 50,
        width: '95%',
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,
        elevation: 3,
      }}>
        <Text style={styles.dateText}>{hijriDate} {hijriMonthName}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',

  },
  dateText: {
    fontSize: 20,
    color: '#0F3E3F',
    fontWeight: '600'
  },
});