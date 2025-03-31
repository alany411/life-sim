import { z } from 'zod'

const characterAssetTypeSchema = z.enum(['inventory', 'houses', 'vehicles'])

const characterAssetSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number().min(0),
  health: z.number().min(0),
})

const characterAssetsSchema = z.object(
  Object.fromEntries(
    characterAssetTypeSchema.options.map((type) => [
      type,
      z.array(characterAssetSchema).default([]),
    ])
  ) as Record<
    CharacterAssetType,
    z.ZodDefault<z.ZodArray<typeof characterAssetSchema>>
  >
)

export { characterAssetSchema, characterAssetsSchema, characterAssetTypeSchema }

type CharacterAssetType = z.infer<typeof characterAssetTypeSchema>
type CharacterAsset = z.infer<typeof characterAssetSchema>
type CharacterAssets = z.infer<typeof characterAssetsSchema>

export type { CharacterAsset, CharacterAssets, CharacterAssetType }
