import { TipoRefeicao } from '@/core/domain/enums/tipo-refeicao.enum';

export interface RefeicaoCreateDTO {
  nome: string;
  descricao: string;
  calorias: number;
  data: string;
  tipo: TipoRefeicao;
  favorito?: boolean;
  imagemUrl?: string;
}

export interface RefeicaoUpdateDTO {
  nome?: string;
  descricao?: string;
  calorias?: number;
  data?: string;
  tipo?: TipoRefeicao;
  favorito?: boolean;
  imagemUrl?: string;
}

export interface RefeicaoResponseDTO {
  _id: string;
  nome: string;
  descricao: string;
  calorias: number;
  data: string;
  tipo: TipoRefeicao;
  favorito: boolean;
  imagemUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RefeicaoFilterDTO {
  tipo?: TipoRefeicao;
  dataInicio?: string;
  dataFim?: string;
  favorito?: boolean;
} 