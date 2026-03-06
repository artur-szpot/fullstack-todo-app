import { Controller, Get, Inject, Param } from '@nestjs/common';

import { UsersConnector } from '@db/interfaces/users.connector';
import { USERS_CONNECTOR } from '@db/symbols';

@Controller('todo')
export class TodoController {
  constructor(
    @Inject(USERS_CONNECTOR)
    private readonly dbConnector: UsersConnector,
  ) {}

  @Get('/:id')
  public async getTodo(@Param('id') id: number): Promise<string> {
    const user = await this.dbConnector.getUser('123-abc');
    return `This will return todo with ID ${id} (current user: ${user})`;
  }
}
