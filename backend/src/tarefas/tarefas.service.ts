

import {
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Tarefa } from "./tarefa.entity.js";
import { CriarTarefaDto } from "./dto/criar-tarefa.dto.js";
import { AtualizarTarefaDto } from "./dto/atualizar-tarefa-dto.js";

@Injectable()
export class TarefasService {
  constructor(
    @InjectRepository(Tarefa)
    private readonly tarefasRepository: Repository<Tarefa>,
  ) {}

  async criar(dto: CriarTarefaDto): Promise<Tarefa> {
    const tarefa = this.tarefasRepository.create(dto);
    return this.tarefasRepository.save(tarefa);
  }

  async listar(status?: string): Promise<Tarefa[]> {
    if (status) {
      return this.tarefasRepository.find({
        where: { status: status as Tarefa["status"] },
      });
    }

    return this.tarefasRepository.find();
  }

  async buscarPorId(id: number): Promise<Tarefa> {
    const tarefa = await this.tarefasRepository.findOneBy({ id });

    if (!tarefa) {
      throw new NotFoundException("Tarefa não encontrada");
    }

    return tarefa;
  }

  async atualizar(
    id: number,
    dto: AtualizarTarefaDto,
  ): Promise<Tarefa> {
    const tarefa = await this.buscarPorId(id);
    Object.assign(tarefa, dto);

    return this.tarefasRepository.save(tarefa);
  }

  async excluir(id: number): Promise<void> {
    const tarefa = await this.buscarPorId(id);
    await this.tarefasRepository.remove(tarefa);
  }
}
