import { TipoRefeicao } from '@/core/domain/enums/tipo-refeicao.enum';

export interface IRefeicao {
  _id?: string;
  nome: string;
  descricao: string;
  calorias: number;
  data: Date;
  tipo: TipoRefeicao;
  favorito?: boolean;
  imagemUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
} 