import { IPaginationOptions } from 'nestjs-typeorm-paginate'
import { ILike } from 'typeorm'

export interface SortingOptions<T> {
  id: keyof T
  desc: 'true' | 'false'
}
interface NestedObject {
  [key: string]: NestedObject | string
}

export function nestedObject(input: string, getValue: () => any): NestedObject {
  const keys = input.split('_')
  const result: NestedObject = {}

  let tempObj: NestedObject = result
  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      tempObj[key] = getValue()
    } else {
      tempObj[key] = {}
      tempObj = tempObj[key] as NestedObject
    }
  })

  return result
}

export const sortToOrder = (sorting: SortingOptions<any>) => {
  return nestedObject(sorting.id as string, () =>
    sorting.desc === 'true' ? 'DESC' : 'ASC',
  )
}

export const filterToWhere = (query: string, filterableFields: string[]) => {
  if (!query) return

  const or = filterableFields.map(field => ({
    ...nestedObject(field, () => ILike(`%${query}%`)),
  }))

  return or
}

export const paginationToPaging = (pagination: IPaginationOptions) => {
  return {
    page: pagination.page ?? 1,
    limit: pagination.limit ?? 10,
  }
}
