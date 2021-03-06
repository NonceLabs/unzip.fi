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

export function appendAsset(asset) {
  return {
    type: types.APPEND_ASSET,
    asset,
  }
}

export function appendFarm(farm) {
  return {
    type: types.APPEND_FARM,
    farm,
  }
}

export function updateAccount(account: string) {
  return {
    type: types.UPDATE_ACCOUNT,
    account,
  }
}
