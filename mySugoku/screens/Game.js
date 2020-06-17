import React, { useEffect } from 'react'
import { View, Text, Button, TextInput, StyleSheet, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoard, updateBoard } from '../store/actions'

export default function Game({ navigation, route }) {
  const { username, level } = route.params
  const board = useSelector(state => state.board)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBoard(level))
  }, [])

  function onChangeText(text, indexRow, indexCol) {
    dispatch(updateBoard(text, indexRow, indexCol))
  }

  return (
    <View style={ styles.container }>
      <Text>{ `Name: ${username}` }</Text>
      <Text>{ `Level: ${level}` }</Text>
      <View style={{ padding: 8 }}>
        {
          board.map((rowArray, indexRow) => {
            return (
              <View style={ styles.column } key={ indexRow }>
                {
                  rowArray.map((colCell, indexCol) => {
                    return (
                      <TextInput
                        style={fancyStyle(board, indexRow, indexCol)}
                        onChangeText={ (text) => onChangeText(text, indexRow, indexCol) }
                        value={ String(colCell) }
                        keyboardType = 'number-pad'
                        editable={board[indexRow][indexCol] !==0 ? false : true}
                        key={ indexCol }
                      ></TextInput>
                    )
                  })
                }
              </View>
            )
          })
        }
      </View>
      <Button onPress={ () => { navigation.navigate('Finish') } } title="Go to finish"></Button>
    </View>
  )
}

const cellWidth = Dimensions.get('window').width / 10

function fancyStyle(board, indexRow, indexCol) {
  let style = {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    width: cellWidth,
    height: cellWidth,
    textAlign: 'center'
  }

  if(board[indexRow][indexCol] !== 0){
    style.backgroundColor = 'grey'
  }

  if (indexRow % 3 === 0) {
    style.borderTopWidth = 3,
    style.borderTopColor = 'blue'
  }

  if (indexCol % 3 === 0) {
    style.borderLeftWidth = 3,
    style.borderLeftColor = 'blue'
  }

  if (indexRow === 8) {
    style.borderBottomWidth = 3,
    style.borderBottomColor = 'blue'
  }

  if (indexCol === 8) {
    style.borderRightWidth = 3,
    style.borderRightColor = 'blue'
  }

  return style
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  column: {
    flexDirection: 'row'
  }
})