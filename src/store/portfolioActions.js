import { fetchPortfolioFromServer } from '../data/portfolioData'

export const FETCH_PORTFOLIO_REQUEST = 'FETCH_PORTFOLIO_REQUEST'
export const FETCH_PORTFOLIO_SUCCESS = 'FETCH_PORTFOLIO_SUCCESS'
export const FETCH_PORTFOLIO_FAILURE = 'FETCH_PORTFOLIO_FAILURE'

const fetchPortfolioRequest = () => ({ type: FETCH_PORTFOLIO_REQUEST })

const fetchPortfolioSuccess = (data) => ({
  type: FETCH_PORTFOLIO_SUCCESS,
  payload: data,
})

const fetchPortfolioFailure = (error) => ({
  type: FETCH_PORTFOLIO_FAILURE,
  payload: error,
})

// Thunk: lets us dispatch a function instead of a plain action object.
// Redux Thunk middleware intercepts it and calls it with (dispatch, getState).
export function fetchPortfolioData() {
  return async function (dispatch) {
    dispatch(fetchPortfolioRequest())
    try {
      const data = await fetchPortfolioFromServer()
      dispatch(fetchPortfolioSuccess(data))
    } catch (error) {
      dispatch(fetchPortfolioFailure(error.message || 'Failed to load portfolio data'))
    }
  }
}
