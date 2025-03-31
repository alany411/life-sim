import type { SuperJSONResult } from 'superjson'
import { deserialize, serialize } from 'superjson'
import { useLocalStorage } from 'usehooks-ts'

export function useStorage<T>(
  ...params: Parameters<typeof useLocalStorage<T>>
) {
  const [key, initialValue, paramOptions] = params

  const options = {
    deserializer: (value: string) => {
      const { json, meta } = JSON.parse(value) as SuperJSONResult
      return deserialize<T>({ json, meta })
    },
    serializer: (value: T) => {
      const { json, meta } = serialize(value)
      return JSON.stringify({ json, meta })
    },
    ...paramOptions,
  }

  return useLocalStorage<T>(key, initialValue, options)
}
