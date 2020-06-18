import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  ActivityIndicator,
  Modal,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import SudokuBox from '../components/SudokuBox';
import { initiateBoard, submitSudoku, handleChange, setStatus, solveSudoku } from '../store/actions';

const mapStateToProps = (state) => {
  const { board, numbers, submitStatus, difficulty } = state.sudokuReducer;
  const { username } = state.userReducer;

  return {
    board,
    numbers,
    submitStatus,
    username,
    difficulty,
  };
};

const mapDispatchToProps = {
  initiateBoard,
  submitSudoku,
  handleChange,
  setStatus,
  solveSudoku,
};

function GameBoard(props) {
  const {
    board,
    numbers,
    submitStatus,
    difficulty,
    initiateBoard,
    username,
    submitSudoku,
    handleChange,
    setStatus,
    solveSudoku,
  } = props;
  const [ submitLoad, setSubmitLoad ] = useState(false);

  useEffect(() => {
    if (board.length === 0) {
      initiateBoard(difficulty);
    }
  }, [board]);

  useEffect(() => {
    if (submitStatus === 'solved' || submitStatus === 'broken') {
      props.navigation.navigate('Finish');
    } else if (submitStatus === 'unsolved') {
      alert(submitStatus);
      setStatus();
    }
    setSubmitLoad(false);
  }, [submitStatus]);

  function submit() {
    submitSudoku(numbers);
    setSubmitLoad(true);
  }

  return (
    <View style={styles.container}>
      <Modal
        visible={submitLoad}
        transparent
      >
        <View style={{ ...styles.container, backgroundColor: 'none' }}>
          <View style={styles.modal}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </View>
      </Modal>
      <Text>Hi! {username}</Text>
      <View>
        {
          board.length > 0 ? board.map((nums, indexRow) => (
            <View key={indexRow}>
              <View style={styles.board}>
                {
                  nums.map((el, indexCol) => (
                    <SudokuBox
                      boardNum={el}
                      num={numbers[indexRow][indexCol]}
                      onChangeText={(num) => handleChange(indexRow, indexCol, num)}
                      key={indexRow+indexCol}
                      pos={[indexRow, indexCol]}
                    />
                  ))
                }
              </View>
            </View>
          ))
          :
          <ActivityIndicator
            size="large"
            color="#0000ff"
          />
        }
      </View>
      <View style={styles.button}>
        <Button
          style={styles.button}
          title="Submit Sudoku"
          onPress={submit}
          color="green"
        />
      </View>
      <Button
        title="Solve"
        onPress={() => {
          solveSudoku(numbers);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  board: {
    flexDirection: 'row',
  },
  button: {
    padding: 20,
  },
  modal: {
    backgroundColor: '#f2f2f2',
    padding: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);