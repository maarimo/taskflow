
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TarefasController } from "./tarefas.controller.js";
import { TarefasService } from "./tarefas.service.js";
import { Tarefa } from "./tarefa.entity.js";

@Module({
  imports: [TypeOrmModule.forFeature([Tarefa])],
  controllers: [TarefasController],
  providers: [TarefasService],
})
export class TarefasModule {}



