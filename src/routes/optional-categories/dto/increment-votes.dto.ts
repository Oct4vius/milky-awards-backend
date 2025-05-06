import { IsUUID } from 'class-validator';

export class IncrementVotesDto {
  @IsUUID()
  uuid: string;
}
