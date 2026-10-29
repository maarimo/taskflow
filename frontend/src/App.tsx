
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import type { Tarefa } from "./types/tarefa";
import "./App.css";
import {
  listarTarefas,
  criarTarefa,
  atualizarTarefa,
  excluirTarefa,
} from "./services/tarefasApi";

type Prioridade = "BAIXA" | "MEDIA" | "ALTA";
type Filtro = "TODAS" | Tarefa["status"];

function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState<Prioridade>("MEDIA");
  const [filtro, setFiltro] = useState<Filtro>("TODAS");
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  const totalTarefas = tarefas.length;

  const tarefasPendentes = tarefas.filter(
    (tarefa) => tarefa.status === "PENDENTE",
  ).length;

  const tarefasConcluidas = tarefas.filter(
    (tarefa) => tarefa.status === "CONCLUIDA",
  ).length;

  async function carregarTarefas() {
    try {
      setErro("");

      const dados =
        filtro === "TODAS"
          ? await listarTarefas()
          : await listarTarefas(filtro);

      setTarefas(dados);
    } catch {
      setErro("Não foi possível carregar as tarefas.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    void carregarTarefas();
  }, [filtro]);

  function limparFormulario() {
    setTitulo("");
    setDescricao("");
    setPrioridade("MEDIA");
    setEditandoId(null);
  }

  function iniciarEdicao(tarefa: Tarefa) {
    setEditandoId(tarefa.id);
    setTitulo(tarefa.titulo);
    setDescricao(tarefa.descricao);
    setPrioridade(tarefa.prioridade);
    setErro("");
    setMensagem("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSalvando(true);
    setErro("");
    setMensagem("");

    try {
      if (editandoId !== null) {
        await atualizarTarefa(editandoId, {
          titulo,
          descricao,
          prioridade,
        });
        setMensagem("Tarefa atualizada com sucesso!");
      } else {
        await criarTarefa({
          titulo,
          descricao,
          status: "PENDENTE",
          prioridade,
        });
        setMensagem("Tarefa cadastrada com sucesso!");
      }

      limparFormulario();
      await carregarTarefas();
    } catch {
      setErro(
        editandoId !== null
          ? "Não foi possível atualizar a tarefa."
          : "Não foi possível cadastrar a tarefa.",
      );
    } finally {
      setSalvando(false);
    }
  }

  async function concluirTarefa(id: number) {
    try {
      setErro("");
      setMensagem("");

      await atualizarTarefa(id, { status: "CONCLUIDA" });
      setMensagem("Tarefa concluída com sucesso!");
      await carregarTarefas();
    } catch {
      setErro("Não foi possível concluir a tarefa.");
    }
  }

  async function removerTarefa(id: number) {
    if (!window.confirm("Tem certeza de que deseja excluir esta tarefa?")) {
      return;
    }

    try {
      setErro("");
      setMensagem("");

      await excluirTarefa(id);

      if (editandoId === id) {
        limparFormulario();
      }

      setMensagem("Tarefa excluída com sucesso!");
      await carregarTarefas();
    } catch {
      setErro("Não foi possível excluir a tarefa.");
    }
  }

  return (
    <main>
      <h1>TaskFlow</h1>
      <p>Gerenciador de tarefas</p>

      <div className="resumo-tarefas">
        <article>
          <span>Total de tarefas</span>
          <strong>{totalTarefas}</strong>
        </article>

        <article>
          <span>Pendentes</span>
          <strong>{tarefasPendentes}</strong>
        </article>

        <article>
          <span>Concluídas</span>
          <strong>{tarefasConcluidas}</strong>
        </article>
      </div>

      <section>
        <h2>{editandoId !== null ? "Editar tarefa" : "Nova tarefa"}</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="titulo">Título</label>
            <input
              id="titulo"
              type="text"
              value={titulo}
              onChange={(event) => setTitulo(event.target.value)}
              required
              minLength={3}
              maxLength={120}
            />
          </div>

          <div>
            <label htmlFor="descricao">Descrição</label>
            <textarea
              id="descricao"
              value={descricao}
              onChange={(event) => setDescricao(event.target.value)}
              required
              minLength={3}
            />
          </div>

          <div>
            <label htmlFor="prioridade">Prioridade</label>
            <select
              id="prioridade"
              value={prioridade}
              onChange={(event) =>
                setPrioridade(event.target.value as Prioridade)
              }
            >
              <option value="BAIXA">Baixa</option>
              <option value="MEDIA">Média</option>
              <option value="ALTA">Alta</option>
            </select>
          </div>

          <button type="submit" disabled={salvando}>
            {salvando
              ? "Salvando..."
              : editandoId !== null
                ? "Salvar alterações"
                : "Cadastrar tarefa"}
          </button>

          {editandoId !== null && (
            <button type="button" onClick={limparFormulario}>
              Cancelar edição
            </button>
          )}
        </form>
      </section>

      {mensagem && <p role="status">{mensagem}</p>}
      {erro && <p role="alert">{erro}</p>}

      <section>
        <h2>Minhas tarefas</h2>

        <label htmlFor="filtro">Filtrar por status:</label>
        <select
          id="filtro"
          value={filtro}
          onChange={(event) => setFiltro(event.target.value as Filtro)}
        >
          <option value="TODAS">Todas</option>
          <option value="PENDENTE">Pendentes</option>
          <option value="EM_ANDAMENTO">Em andamento</option>
          <option value="CONCLUIDA">Concluídas</option>
        </select>

        {carregando ? (
          <p>Carregando tarefas...</p>
        ) : tarefas.length === 0 ? (
          <p>Nenhuma tarefa encontrada.</p>
        ) : (
          <ul>
            {tarefas.map((tarefa) => (
              <li key={tarefa.id}>
                <h3>{tarefa.titulo}</h3>
                <p>{tarefa.descricao}</p>
                <p>
                  Status: <span className={`status status-${tarefa.status.toLowerCase()}`}>
                    {tarefa.status.replace("_", " ")}
                  </span>
                </p>

                <p>
                  Prioridade: <span className={`prioridade prioridade-${tarefa.prioridade.toLowerCase()}`}>
                    {tarefa.prioridade}
                  </span>
                </p>

                <button
                  type="button"
                  onClick={() => iniciarEdicao(tarefa)}
                >
                  Editar
                </button>

                {tarefa.status !== "CONCLUIDA" && (
                  <button
                    type="button"
                    onClick={() => concluirTarefa(tarefa.id)}
                  >
                    Concluir tarefa
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => removerTarefa(tarefa.id)}
                >
                  Excluir tarefa
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
