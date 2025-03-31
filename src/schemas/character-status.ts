import { z } from 'zod'

const characterStatusSchema = z.object({
  happiness: z.number().min(0).max(100),
  health: z.number().min(0).max(100),
})

export { characterStatusSchema }

type CharacterStatus = z.infer<typeof characterStatusSchema>

export type { CharacterStatus }
