type CharacterAssetType = 'inventory' | 'houses' | 'vehicles'

type CharacterAsset = {
  id: string
  name: string
  description: string
  price: number
  health: number
}

type CharacterAssets = Record<CharacterAssetType, CharacterAsset[]>
