import { View, Text,  TextInput } from 'react-native'
import React from 'react'

export default function Field(Props) {
  return (
    <TextInput {...Props} style={{borderRadius: 100, color: 'black' , backgroundColor:'white', fontWeight:'500' ,paddingHorizontal:15, paddingVertical:5, width:'80%' , marginVertical:10 }} placeholderTextColor='black'>

    </TextInput>
  )
}