
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TarefasModule } from "./tarefas/tarefas.module.js";
import { Tarefa } from "./tarefas/tarefa.entity.js";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "taskflow.sqlite",
      entities: [Tarefa],
      synchronize: true,
    }),
    TarefasModule,
  ],
})
export class AppModule {}
