
import type { Tarefa } from "../types/tarefa"

export const tarefas: Tarefa[] = [
  {
    id: 1,
    titulo: "Estudar TypeScript",
    descricao: "Aprender interfaces e tipos",
    status: "EM_ANDAMENTO",
    prioridade: "ALTA",
  },
  {
    id: 2,
    titulo: "Estudar JavaScript",
    descricao: "Praticar arrays e funções",
    status: "CONCLUIDA",
    prioridade: "MEDIA",
  },
  {
    id: 3,
    titulo: "Criar API REST",
    descricao: "Implementar endpoints com NestJS",
    status: "PENDENTE",
    prioridade: "ALTA",
  },
  {
    id: 4,
    titulo: "Criar interface",
    descricao: "Construir telas com React",
    status: "PENDENTE",
    prioridade: "BAIXA",
  },
];
