import { IsOptional } from 'class-validator'
import { IPaginationOptions } from 'nestjs-typeorm-paginate'
import { SortingOptions } from '../../utils/table.util'

export class TableQueryDto<T> {
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
