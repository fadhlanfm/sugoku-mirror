import React, { useEffect, useState } from 'react'
import { View, Text, Button, TextInput, StyleSheet, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoard, updateBoard, submitSudoku, solveSudoku } from '../store/actions/board'

export default function Game({ navigation: { navigate }, route }) {
  const { username, level } = route.params
  const board = useSelector(state => state.boardReducer.board)
  const shadowBoard = useSelector(state => state.boardReducer.shadowBoard)
  const [shadow, setShadow] = useState(shadowBoard)
  const dispatch = useDispatch()

  const solve = () => {
    const answer = { board: shadowBoard }
    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')
    const encodeParams = (params) =>
      Object.keys(params)
          .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
          .join('&');
    fetch(`https://sugoku2.herokuapp.com/solve`, {
      method: 'POST',
      body: encodeParams(answer),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(result => {
        setShadow(result.solution)
        alert('The sudoku has been solved by helper')
      })
      .catch(console.log)
  }

  const validate = () => {
    const answer = { board: shadow }
    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')
    const encodeParams = (params) =>
      Object.keys(params)
        .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
        .join('&');

    fetch(`https://sugoku2.herokuapp.com/validate`, {
      method: 'POST',
      body: encodeParams(answer),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(result => {
        result.status === 'solved' ? navigate('Finish', { username }) : alert(`The sudoku hasn't been solved.`)
      })
      .catch(console.log)
  }
  

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
      {!board && <Text> loading board... </Text>}
      <View style={{ padding: 8 }}>
        {
          shadow.map((rowArray, indexRow) => {
            return (
              <View style={ styles.column } key={ indexRow }>
                {
                  rowArray.map((colCell, indexCol) => {
                    return (
                      <TextInput
                        style={ fancyStyle(shadow, indexRow, indexCol) }
                        onChangeText={ (text) => onChangeText(text, indexRow, indexCol) }
                        value={ String(colCell) }
                        keyboardType = 'number-pad'
                        // editable={ disabledPos[indexRow][indexCol] }
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
      <Button onPress={validate} title="Submit"></Button>
      <Button
        title="Solve"
        onPress={() => {
          solve(board)
        }}
      />
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