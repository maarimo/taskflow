
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query
} from "@nestjs/common";

import { TarefasService } from "./tarefas.service.js";
import { CriarTarefaDto } from "./dto/criar-tarefa.dto.js";
import { AtualizarTarefaDto } from "./dto/atualizar-tarefa-dto.js";

@Controller("tarefas")
export class TarefasController {
  constructor(
    private readonly tarefasService: TarefasService,
  ) {}

  @Post()
  criar(@Body() dto: CriarTarefaDto) {
    return this.tarefasService.criar(dto);
  }

  @Get()
  listar(@Query("status") status?: string) {
    return this.tarefasService.listar(status);
  }

  @Get(":id")
  buscarPorId(
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.tarefasService.buscarPorId(id);
  }

  @Patch(":id")
  atualizar(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: AtualizarTarefaDto,
  ) {
    return this.tarefasService.atualizar(id, dto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  excluir(
    @Param("id", ParseIntPipe) id: number,
  ) {
    this.tarefasService.excluir(id);
  }
}
