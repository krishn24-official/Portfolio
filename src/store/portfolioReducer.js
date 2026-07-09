import {
  FETCH_PORTFOLIO_REQUEST,
  FETCH_PORTFOLIO_SUCCESS,
  FETCH_PORTFOLIO_FAILURE,
} from './portfolioActions'

const initialState = {
  loading: false,
  data: null,
  error: null,
}

export function portfolioReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PORTFOLIO_REQUEST:
      return { ...state, loading: true, error: null }
    case FETCH_PORTFOLIO_SUCCESS:
      return { ...state, loading: false, data: action.payload }
    case FETCH_PORTFOLIO_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
