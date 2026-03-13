import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '@auth/guards/jwt.guard';
import { PermisionsGuard } from '@auth/guards/permissions.guard';
import { GetEntityByIdDto } from '@common/dto/in/get-entity-by-id.dto';
import { PaginationDto } from '@common/pagination/dto/in/pagination.dto';
import { paginationMapper } from '@common/pagination/mapper/pagination.mapper';
import { Paginated } from '@common/pagination/Paginated';

import { CreateUserDto } from './dto/in/create-user.dto';
import { UpdateUserDto } from './dto/in/update-user.dto';
import { UserResponse } from './dto/out/user.response';
import { USER_GATEWAY, UserGateway } from './infrastructure/user.gateway';

@Controller('users')
@UseGuards(JwtAuthGuard, PermisionsGuard)
export class UserController {
  constructor(
    @Inject(USER_GATEWAY)
    private readonly gateway: UserGateway,
  ) {}

  @Get('/:id')
  public async getUserById(
    @Param() params: GetEntityByIdDto,
  ): Promise<UserResponse> {
    return this.gateway.getById(params.id);
  }

  @Get()
  public async getUsers(
    @Query() pagination: PaginationDto,
  ): Promise<Paginated<UserResponse>> {
    return this.gateway.getMany(paginationMapper.fromDto(pagination));
  }

  @Post()
  public async createUser(@Body() body: CreateUserDto): Promise<UserResponse> {
    return this.gateway.create(body);
  }

  @Patch('/:id')
  public async updateUser(
    @Param() params: GetEntityByIdDto,
    @Body() body: UpdateUserDto,
  ): Promise<UserResponse> {
    return this.gateway.update(params.id, body);
  }

  @Delete('/:id')
  public async deleteUser(
    @Param() params: GetEntityByIdDto,
  ): Promise<UserResponse> {
    return this.gateway.delete(params.id);
  }
}
