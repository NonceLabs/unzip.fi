import types from './actionTypes'

export const defaultState = {
  account: '',
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
    case types.UPDATE_ACCOUNT:
      return { ...state, account: action.account, farms: [], assets: [] }
    default:
      return state
  }
}
