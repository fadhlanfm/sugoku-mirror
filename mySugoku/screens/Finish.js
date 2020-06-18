import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Button } from 'react-native';
import { useSelector } from 'react-redux'
import { Provider } from 'react-redux'
import store from '../store'

const FinishScreen = ({ navigation: { navigate }, route }) => {
  const { username, level } = route.params

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: 'http://pixelartmaker.com/art/c1c1b6835aa532f.png' }} />
        <Text>Congratulations, {username}!</Text>
        <Text> </Text>
        <View style={styles.button}>
          <Button
            title="Play Again"
            onPress={() => navigate('Home')}
          ></Button>
        </View>
      </View>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    height: 450,
    width: Dimensions.get('screen').width - 40,
  }
})

export default FinishScreen