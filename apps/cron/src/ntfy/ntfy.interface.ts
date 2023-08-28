export type NtfyPayload = {
  message?: string
  title?: string
  tags?: string[]
  priority?: number
  attach?: string
  filename?: string
  click?: string
  actions?: Action[]
}

export type Action = {
  action: string
  label: string
  url: string
}
