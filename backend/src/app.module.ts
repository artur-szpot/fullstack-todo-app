import { Module } from '@nestjs/common';

import { DbModule } from '@db/db.module';
import { TodoModule } from '@todo/todo.module';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [AuthModule, TodoModule, DbModule],
})
export class AppModule {}
