import { z } from 'zod'

const gameSchema = z.object({
  initialized: z.boolean(),
  started: z.boolean(),
})

export { gameSchema }

type Game = z.infer<typeof gameSchema>

export type { Game }
