/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

export interface IRefeicao {
  _id?: string;
  nome: string;
  descricao: string;
  calorias: number;
  data: Date;
  tipo: 'Café da manhã' | 'Almoço' | 'Lanche da tarde' | 'Janta';
  favorito?: boolean;
  imagemUrl?: string;
}

export enum TipoRefeicao {
  CAFE_DA_MANHA = 'Café da manhã',
  ALMOCO = 'Almoço',
  LANCHE = 'Lanche da tarde',
  JANTA = 'Janta'
} 