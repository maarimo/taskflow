
import { tarefas } from "./data/tarefas";

function App() {
  const tarefasPendentes = tarefas.filter(
    (tarefa) => tarefa.status === "PENDENTE"
  );

  const tarefaEncontrada = tarefas.find(
    (tarefa) => tarefa.id === 2
  );

  const titulos = tarefas.map(
    (tarefa) => tarefa.titulo
  );

  return (
    <main>
      <h1>TaskFlow</h1>

      <h2>Todas as tarefas</h2>

      {tarefas.map((tarefa) => (
        <article key={tarefa.id}>
          <h3>{tarefa.titulo}</h3>
          <p>{tarefa.descricao}</p>
          <p>Status: {tarefa.status}</p>
          <p>Prioridade: {tarefa.prioridade}</p>
        </article>
      ))}

      <hr />

      <h2>Tarefas pendentes</h2>

      {tarefasPendentes.map((tarefa) => (
        <p key={tarefa.id}>{tarefa.titulo}</p>
      ))}

      <hr />

      <h2>Tarefa encontrada pelo ID 2</h2>

      <p>
        {tarefaEncontrada
          ? tarefaEncontrada.titulo
          : "Tarefa não encontrada"}
      </p>

      <hr />

      <h2>Títulos das tarefas</h2>

      <ul>
        {titulos.map((titulo) => (
          <li key={titulo}>{titulo}</li>
        ))}
      </ul>
    </main>
  );
}

export default App;
