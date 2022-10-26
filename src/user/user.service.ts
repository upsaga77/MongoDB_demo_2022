import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserProfileRequestDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(dto: Prisma.UserCreateInput): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: {
        username: dto.username,
      },
    });

    if (user) {
      throw new HttpException('Username already exists', 409);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const createdUser = await this.prismaService.user.create({
      data: {
        ...dto,
        password: hashedPassword,
      },
    });

    delete createdUser.password;
    return createdUser;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.prismaService.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async editUserProfile(
    id: string,
    dto: EditUserProfileRequestDTO,
  ): Promise<User> {
    const idInt = parseInt(id)
    const user = await this.prismaService.user.findFirst({
      where: {
        id: idInt,
      },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return await this.prismaService.user.update({
      where: {
        id: idInt,
      },
      data: {
        firstname: dto.firstname,
        lastname: dto.lastname,
        phoneNumber: dto.phoneNumber,
      },
    });
  }

  async deleteUser(id: string): Promise<User> {
    const idInt = parseInt(id)
    const user = await this.prismaService.user.findFirst({
      where: {
        id: idInt,
      },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return await this.prismaService.user.delete({
      where: { id: idInt },
    });
  }
}
