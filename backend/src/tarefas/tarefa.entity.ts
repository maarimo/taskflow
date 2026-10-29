
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("tarefas")
export class Tarefa {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 120 })
  titulo!: string;

  @Column("text")
  descricao!: string;

  @Column({ default: "PENDENTE" })
  status!: "PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDA";

  @Column({ default: "MEDIA" })
  prioridade!: "BAIXA" | "MEDIA" | "ALTA";
}
