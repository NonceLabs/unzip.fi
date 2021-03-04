import types from './actionTypes'

export function updateBNBPrice(bnbPrice) {
  return {
    type: types.UPDATE_BNB_PRICE,
    bnbPrice,
  }
}

export function updateFarms(farms) {
  return {
    type: types.UPDATE_FARMS,
    farms,
  }
}

export function updateAssets(assets) {
  return {
    type: types.UPDATE_ASSETS,
    assets,
  }
}
