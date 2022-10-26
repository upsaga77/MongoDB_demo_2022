import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString } from "class-validator";

export enum Role {
  STUDENT = 'STUDENT',
  PROFESSOR = 'PROFESSOR',
  ADMIN = 'ADMIN',
}

export class CreateUserRequestDTO {
  @ApiProperty({
    example: 'Firstname',
  })
  @IsString()
  firstname: string;

  @ApiProperty({
    example: 'Lastname',
  })
  @IsString()
  lastname: string;

  @ApiProperty({
    example: 'testUser',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'testUserPassword',
  })
  @IsString()
  password: string;

  @ApiProperty({
    example: '0999999999',
  })
  @IsString()
  phoneNumber: string;

  @ApiProperty({
    required: false,
    nullable: true,
    default: 'STUDENT',
  })
  @IsEnum(Role)
  role?: Role;
}

export class EditUserProfileRequestDTO {
  @ApiProperty()
  firstname?: string;

  @ApiProperty()
  lastname?: string;

  @ApiProperty()
  phoneNumber?: string;
}
