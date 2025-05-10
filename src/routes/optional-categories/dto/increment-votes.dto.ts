import { IsUUID } from 'class-validator';

export class UuidParamValidator {
  @IsUUID()
  uuid: string;
}
