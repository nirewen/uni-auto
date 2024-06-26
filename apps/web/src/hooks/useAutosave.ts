import { useEffect, useRef, useState } from 'react'

import useDebounce from './useDebounce'

export interface CommonProps<TData, TReturn> {
  data: TData
  onSave: (data: TData) => Promise<TReturn> | TReturn | void
  interval?: number
  saveOnUnmount?: boolean
}

function useAutosave<TData, TReturn>({
  data,
  onSave,
  interval = 2000,
  saveOnUnmount = true,
}: CommonProps<TData, TReturn>) {
  const valueOnCleanup = useRef(data)
  const initialRender = useRef(true)
  const handleSave = useRef(onSave)
  const [saved, setSaved] = useState(false)

  const debouncedValueToSave = useDebounce(data, interval)

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
    } else {
      handleSave.current(debouncedValueToSave)

      setSaved(true)

      setTimeout(() => {
        setSaved(false)
      }, 1000)
    }
  }, [debouncedValueToSave])

  useEffect(() => {
    valueOnCleanup.current = data
  }, [data])

  useEffect(() => {
    handleSave.current = onSave
  }, [onSave])

  useEffect(
    () => () => {
      if (saveOnUnmount) {
        handleSave.current(valueOnCleanup.current)
      }
    },
    [saveOnUnmount],
  )

  return saved
}

export default useAutosave
