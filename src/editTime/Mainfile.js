import { View, Text } from 'react-native'
import React, {useState} from 'react'
import Perent from './Perent'


export default function Mainfile() {
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const openEdit = () => {
        setShowEdit(!showEdit); // Toggle the state
      };
      
  return (
    <View>
      <Perent />
    </View>
  )
}