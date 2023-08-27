import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Queue } from 'src/entities/queue.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Queue])],
  controllers: [],
  providers: [],
  exports: [],
})
export class CommonModule {}
