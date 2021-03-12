import _ from 'lodash'
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
      return {
        ...state,
        assets: _.uniqBy([...state.assets, action.asset], 'contract'),
      }
    case types.APPEND_FARM:
      return {
        ...state,
        farms: _.uniqBy([...state.farms, action.farm], 'name'),
      }
    case types.UPDATE_ACCOUNT:
      return { ...state, account: action.account, farms: [], assets: [] }
    case types.RESET_ASSET_AND_FARM:
      return { ...state, farms: [], assets: [] }
    default:
      return state
  }
}
