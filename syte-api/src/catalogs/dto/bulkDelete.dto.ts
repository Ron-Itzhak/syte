import { Transform } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

export class BulkDeleteDto {
  @Transform(({ value }) => (Array.isArray(value) ? value : value.split(',')))
  @IsArray()
  @IsString({ each: true })
  ids: string[];
}
