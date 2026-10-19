export type StatusTarefa =
| "PENDENTE"
| "EM_ANDAMENTO"
| "CONCLUIDA";

export type PrioridadeTarefa = 
| "BAIXA"
| "MEDIA"
| "ALTA";

export interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  status: StatusTarefa;
  prioridade: PrioridadeTarefa;
}