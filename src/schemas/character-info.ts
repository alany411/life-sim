import { z } from 'zod'

const characterInfoSchema = z.object({
  avatar: z.string(),
  name: z.string(),
  birthday: z.date(),
  age: z.number().min(0),
  gender: z.string(),
  profession: z.string(),
  money: z.number(),
})

export { characterInfoSchema }

type CharacterInfo = z.infer<typeof characterInfoSchema>

export type { CharacterInfo }
