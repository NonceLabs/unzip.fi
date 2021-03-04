import types from './actionTypes'

export const defaultState = {
  bnbPrice: 250.0,
  farms: [],
  assets: [],
}

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.UPDATE_BNB_PRICE:
      return { ...state, bnbPrice: action.bnbPrice }
    case types.UPDATE_FARMS:
      return { ...state, farms: action.farms }
    case types.UPDATE_ASSETS:
      return { ...state, assets: action.assets }
    case types.APPEND_ASSET:
      return { ...state, assets: [...state.assets, action.asset] }
    case types.APPEND_FARM:
      return { ...state, farms: [...state.farms, action.farm] }
    default:
      return state
  }
}
