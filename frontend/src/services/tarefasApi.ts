
import type { Tarefa } from "../types/tarefa";

const API_URL = "http://localhost:3000/tarefas";


export async function listarTarefas(
  status?: Tarefa["status"],
): Promise<Tarefa[]> {
  const url = status
    ? `${API_URL}?status=${encodeURIComponent(status)}`
    : API_URL;

  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error("Não foi possível carregar as tarefas.");
  }

  return resposta.json();
}



export interface NovaTarefa {
  titulo: string;
  descricao: string;
  status: "PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDA";
  prioridade: "BAIXA" | "MEDIA" | "ALTA";
}

export async function criarTarefa(
  tarefa: NovaTarefa,
): Promise<Tarefa> {
  const resposta = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tarefa),
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível cadastrar a tarefa.");
  }

  return resposta.json();
}


export async function atualizarTarefa(
  id: number,
  dados: Partial<NovaTarefa>,
): Promise<Tarefa> {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível atualizar a tarefa.");
  }

  return resposta.json();
}


export async function excluirTarefa(id: number): Promise<void> {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!resposta.ok) {
    throw new Error("Não foi possível excluir a tarefa.");
  }
}

