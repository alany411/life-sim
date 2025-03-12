import { useLocalStorage } from 'usehooks-ts'

type Asset = {
  name: string
  description: string
  price: number
  quantity: number
}

export function useCharacterAssets() {
  const [characterAssets, setCharacterAssets] = useLocalStorage(
    'character-assets',
    {
      inventory: [] as Asset[],
      houses: [] as Asset[],
      vehicles: [] as Asset[],
    }
  )

  const resetCharacterAssets = () => {
    setCharacterAssets({
      inventory: [],
      houses: [],
      vehicles: [],
    })
  }

  const updateCharacterAssets = <K extends keyof typeof characterAssets>(
    key: K,
    value: (typeof characterAssets)[K]
  ) => {
    setCharacterAssets((prev) => ({ ...prev, [key]: value }))
  }

  return {
    ...characterAssets,
    resetCharacterAssets,
    updateCharacterAssets,
  }
}
