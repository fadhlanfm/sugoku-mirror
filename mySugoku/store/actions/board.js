const url = 'https://sugoku.herokuapp.com/';

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`, '')

const encodeParams = (params) =>
  Object.keys(params)
    .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&');

export function fetchBoard(level) {
  return (dispatch, getState) => {
    fetch(`${url}board?difficulty=${level}`)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: 'SET_BOARD',
          payload: data.board
        })
      })
      .catch(err => console.log(err))
  }
}

export function updateBoard(text, indexRow, indexCol) {
  return{
    type: 'UPDATE_BOARD',
    payload: {
      text,
      indexRow,
      indexCol
    }
  }
}

// export function submitSudoku(board) {
//   return (dispatch, getState) => {
//     fetch(url + 'validate', {
//       method: 'POST',
//       body: encodeParams({board}),
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         dispatch({ type: 'SUBMIT_SUDOKU', payload: data.status})
//       })
//       .catch(console.log)
//   }
// }

// export function solveSudoku(board) {
//   console.log('kena1')
//   return (dispatch, getState) => {
//     fetch('https://sugoku.herokuapp.com/solve', {
//       method: 'POST',
//       body: encodeParams({ board }),
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     })
//       .then((res) => res.json())
//       .then(data => {
//           console.log('kena2')
//           console.log(data)
//           dispatch({ type: 'SOLVE_BOARD', payload: data.solution })
//         })
//       .catch(console.log)
//   }
// }