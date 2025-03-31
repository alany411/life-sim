import { z } from 'zod'

const characterAssetTypeSchema = z.enum(['inventory', 'houses', 'vehicles'])

const characterAssetSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number().min(0),
  health: z.number().min(0),
})

const characterAssetsSchema = z.record(
  characterAssetTypeSchema,
  z.array(characterAssetSchema)
)

export { characterAssetSchema, characterAssetsSchema, characterAssetTypeSchema }

type CharacterAssetType = z.infer<typeof characterAssetTypeSchema>
type CharacterAsset = z.infer<typeof characterAssetSchema>
type CharacterAssets = Required<z.infer<typeof characterAssetsSchema>>

export type { CharacterAsset, CharacterAssets, CharacterAssetType }
