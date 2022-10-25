import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReportDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly firstName: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly lastName: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly subject: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly semester: number;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly year: number;
  @ApiProperty()
  readonly professor: string[];
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly grade: number;
}

export class GetReportByNameDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly firstName: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly lastName: string;
}

export class GetReportByProfessorDto {
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => value.split(','))
  @ApiProperty()
  professor: string[];
}
