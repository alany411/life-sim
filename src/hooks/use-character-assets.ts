import { useStorage } from '~/hooks/use-storage'
import type {
  CharacterAsset,
  CharacterAssets,
} from '~/schemas/character-assets'
import type { CharacterAssetType } from '~/schemas/character-assets'

export function useCharacterAssets() {
  const [characterAssets, setCharacterAssets] = useStorage<CharacterAssets>(
    'character-assets',
    {
      inventory: [],
      houses: [],
      vehicles: [],
    }
  )

  const resetCharacterAssets = () => {
    setCharacterAssets({
      inventory: [],
      houses: [],
      vehicles: [],
    })
  }

  const addCharacterAsset = <K extends CharacterAssetType>(
    type: K,
    asset: CharacterAssets[K][number]
  ) => {
    setCharacterAssets((prev) => ({ ...prev, [type]: [...prev[type], asset] }))
  }

  const removeCharacterAsset = (
    type: CharacterAssetType,
    assetId: CharacterAsset['id']
  ) => {
    setCharacterAssets((prev) => ({
      ...prev,
      [type]: prev[type].filter((prevAsset) => prevAsset.id !== assetId),
    }))
  }

  const updateCharacterAsset = (
    type: CharacterAssetType,
    assetId: CharacterAsset['id'],
    asset: Partial<CharacterAssets[CharacterAssetType][number]>
  ) => {
    setCharacterAssets((prev) => ({
      ...prev,
      [type]: prev[type].map((prevAsset) =>
        prevAsset.id === assetId ? { ...prevAsset, ...asset } : prevAsset
      ),
    }))
  }

  return {
    characterAssets,
    setCharacterAssets,
    resetCharacterAssets,
    addCharacterAsset,
    removeCharacterAsset,
    updateCharacterAsset,
  }
}
