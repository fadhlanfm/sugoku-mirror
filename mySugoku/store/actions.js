export function fetchBoard(level) {
  return (dispatch) => {
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${level}`)
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