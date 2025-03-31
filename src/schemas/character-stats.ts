import { z } from 'zod'

const characterStatsSchema = z.object({
  charisma: z.number().min(0),
  dexterity: z.number().min(0),
  intelligence: z.number().min(0),
  strength: z.number().min(0),
  wisdom: z.number().min(0),
})

export { characterStatsSchema }

type CharacterStats = z.infer<typeof characterStatsSchema>

export type { CharacterStats }
