export const slugify = (str: string) =>
  str
    .trim()
    .replace(/([A-Z])/g, '-$1')
    .replace(/(^-|-$)+/g, '')
    .toLowerCase()
