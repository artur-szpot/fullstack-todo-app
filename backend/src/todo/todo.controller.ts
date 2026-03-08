import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';

import { Permissions } from '@auth/decorators/permissions.decorator';
import { PermissionLevel } from '@auth/enums/permission-level.enum';
import { PermissionType } from '@auth/enums/permission-type.enum';
import { JwtAuthGuard } from '@auth/guards/jwt.guard';
import { PermisionsGuard } from '@auth/guards/permissions.guard';
import { UsersRepository } from '@db/repositories/users.repository';
import { USERS_CONNECTOR } from '@db/symbols';

@Controller('todo')
@UseGuards(JwtAuthGuard, PermisionsGuard)
export class TodoController {
  constructor(
    @Inject(USERS_CONNECTOR)
    private readonly dbConnector: UsersRepository,
  ) {}

  @Get('/:id')
  @Permissions([PermissionType.TODOS, PermissionLevel.READ])
  public async getTodo(@Param('id') id: number): Promise<string> {
    const user = await this.dbConnector.getUserById('123-abc');
    return `This will return todo with ID ${id} (current user: ${user})`;
  }

  // post to create a new one

  // patch to update an existing one

  // get all with pagination or other params

  // delete to remove unwanted one
}
