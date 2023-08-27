import { Injectable } from '@nestjs/common'

@Injectable()
export abstract class ModuleInterface {
  abstract trigger(): Promise<any>
}
