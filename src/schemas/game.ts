import { z } from 'zod'

import { characterAssetsSchema } from './character-assets'
import { characterInfoSchema } from './character-info'
import { characterStatsSchema } from './character-stats'
import { characterStatusSchema } from './character-status'

const gameSchema = z.object({
  initialized: z.boolean(),
  started: z.boolean(),
})

const gameSaveSchema = z.object({
  characterAssets: characterAssetsSchema,
  characterInfo: characterInfoSchema,
  characterStats: characterStatsSchema,
  characterStatus: characterStatusSchema,
})

export { gameSaveSchema, gameSchema }

type Game = z.infer<typeof gameSchema>
type GameSave = z.infer<typeof gameSaveSchema>

export type { Game, GameSave }
