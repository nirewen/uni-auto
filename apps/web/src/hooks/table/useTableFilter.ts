import React from 'react'

import useDebounce from '../useDebounce'

export const useTableFilter = () => {
  const [raw, setFilter] = React.useState<string>('')
  const filter = useDebounce(raw, 500)

  return [filter, [raw, setFilter]] as const
}
