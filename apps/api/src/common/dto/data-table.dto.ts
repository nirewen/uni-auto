import { IsOptional } from 'class-validator'
import { IPaginationOptions } from 'nestjs-typeorm-paginate'
import { SortingOptions } from '../filters/data-table.filter'

export class DataTableFilterDto<T> {
  @IsOptional()
  filter: string

  @IsOptional()
  pagination: IPaginationOptions = {
    page: 1,
    limit: 10,
  }

  @IsOptional()
  sorting: SortingOptions<T> = {
    id: 'id' as keyof T,
    desc: 'false',
  }
}
