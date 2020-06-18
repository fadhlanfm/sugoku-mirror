const initialState = {
  board: [],
  shadowBoard: [],
  status: ''
}

export default function boardReducer(state = initialState, action) {
  switch(action.type) {
    case 'SET_BOARD':
      return { ...state, board: action.payload, shadowBoard: action.payload }
    case 'UPDATE_BOARD':
      let { text, indexRow, indexCol } = action.payload
      let newBoard = JSON.parse(JSON.stringify(state.board)) //trick
      newBoard[indexRow][indexCol] = Number(text)
      return { ...state, board: newBoard }
    case 'SUBMIT_SUDOKU':
      return { ...state, status: action.payload }
    case 'SOLVE_BOARD':
      return { ...state, board: action.payload }
    default:
      return state
  }
}