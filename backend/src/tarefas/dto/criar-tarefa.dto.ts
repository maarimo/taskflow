
import {
  IsIn,
  IsString,
  MinLength,
} from "class-validator";

export class CriarTarefaDto {
  @IsString()
  @MinLength(3)
  titulo: string;

  @IsString()
  @MinLength(3)
  descricao: string;

  @IsIn(["PENDENTE", "EM_ANDAMENTO", "CONCLUIDA"])
  status: "PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDA";

  @IsIn(["BAIXA", "MEDIA", "ALTA"])
  prioridade: "BAIXA" | "MEDIA" | "ALTA";
}
