import { useLocalStorage } from 'usehooks-ts'

export function useCharacterAssets() {
  const [characterAssets, setCharacterAssets] =
    useLocalStorage<CharacterAssets>('character-assets', {
      inventory: [],
      houses: [],
      vehicles: [],
    })

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
    resetCharacterAssets,
    addCharacterAsset,
    removeCharacterAsset,
    updateCharacterAsset,
  }
}
