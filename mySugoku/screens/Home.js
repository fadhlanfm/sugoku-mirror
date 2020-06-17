import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput } from 'react-native'

export default function Home({ navigation }) {
  const [username, setUsername] = useState('')

  function onPress(level) {
    // alert(level)
    navigation.navigate('Game', {
      username,
      level
    })
  }

  return (
    <View style={ styles.container }>
      <Text>Welcome to Sugoku!</Text>
      <TextInput
        onChangeText={ (text) => setUsername(text) }
        value={ username }
        placeholder="input username"
      ></TextInput>
      <View>
        <Button onPress={ () => onPress('easy') } title="Easy"></Button>
        <Button onPress={ () => onPress('medium') } title="Medium"></Button>
        <Button onPress={ () => onPress('hard') } title="Hard"></Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
})