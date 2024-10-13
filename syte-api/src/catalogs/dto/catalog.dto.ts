import {
  IsBoolean,
  IsString,
  IsArray,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { Locale, Vertical } from '../interfaces/catalog.interface';

export class CreateCatalogDto {
  @IsString()
  name: string;

  @IsEnum(['fashion', 'home', 'general'])
  vertical: Vertical;

  @IsBoolean()
  isPrimary: boolean;

  @IsArray()
  locales: Locale[];
}

export class UpdateCatalogDto {
  @IsString()
  _id: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(['fashion', 'home', 'general'])
  vertical?: Vertical;

  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;

  @IsOptional()
  @IsArray()
  locales?: Locale[];

  @IsOptional()
  @IsString()
  indexedAt?: string;
}
