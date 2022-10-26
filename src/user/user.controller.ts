import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CreateUserRequestDTO, EditUserProfileRequestDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ description: 'Create user' })
  @ApiResponse({ status: 201, description: 'User is created' })
  @ApiResponse({ status: 409, description: 'Username is already exist' })
  async createUser(@Body() dto: CreateUserRequestDTO): Promise<User> {
    return this.userService.createUser(dto);
  }

  @Get('/:username')
  @ApiOperation({ description: 'Get user by username' })
  @ApiResponse({ status: 200, description: 'User is sent' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserByUsername(@Param('username') username: string) {
    return await this.userService.getUserByUsername(username);
  }

  @Get()
  @ApiOperation({ description: 'Get all user' })
  @ApiResponse({ status: 200, description: 'List of users is sent' })
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Put('/:id')
  @ApiOperation({ description: 'Edit user profile by id' })
  @ApiResponse({ status: 200, description: 'User profile is changed' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async editUserProfile(
    @Param('id') id: string,
    @Body() dto: EditUserProfileRequestDTO,
  ): Promise<User> {
    return await this.userService.editUserProfile(id, dto);
  }

  @Delete('/:id')
  @ApiOperation({ description: 'Delete user by id' })
  @ApiResponse({ status: 200, description: 'User is deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteUser(@Param('id') id: string): Promise<User> {
    return await this.userService.deleteUser(id);
  }
}
