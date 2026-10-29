
import {
  IsIn,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

export class AtualizarTarefaDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  titulo?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  descricao?: string;

  @IsOptional()
  @IsIn(["PENDENTE", "EM_ANDAMENTO", "CONCLUIDA"])
  status?: "PENDENTE" | "EM_ANDAMENTO" | "CONCLUIDA";

  @IsOptional()
  @IsIn(["BAIXA", "MEDIA", "ALTA"])
  prioridade?: "BAIXA" | "MEDIA" | "ALTA";
}
