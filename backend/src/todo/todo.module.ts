import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  controllers: [TodoController],
  imports: [DbModule],
})
export class TodoModule {}
