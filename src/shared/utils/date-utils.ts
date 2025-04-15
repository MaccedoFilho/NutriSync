import { format, isToday, parseISO, startOfDay, endOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { IRefeicao } from '@/core/domain/entities/refeicao.entity';

export function formatarData(data: Date | string, formatStr: string = 'PPpp'): string {
  const dataObj = typeof data === 'string' ? parseISO(data) : data;
  return format(dataObj, formatStr, { locale: ptBR });
}

export function ehHoje(data: Date | string): boolean {
  const dataObj = typeof data === 'string' ? parseISO(data) : data;
  return isToday(dataObj);
}

export function obterLimitesDataHoje(): { inicio: Date; fim: Date } {
  const hoje = new Date();
  return {
    inicio: startOfDay(hoje),
    fim: endOfDay(hoje),
  };
}

export function formatarDataParaInput(data: Date | string): string {
  const dataObj = typeof data === 'string' ? parseISO(data) : data;
  return dataObj.toISOString().substring(0, 16);
}

export function dataAtualParaInput(): string {
  return new Date().toISOString().substring(0, 16);
}

export function parseDataSegura(dataStr: string): Date {
  try {
    return parseISO(dataStr);
  } catch (error) {
    console.error('Erro ao converter data:', error);
    return new Date();
  }
}

export function calcularTotalCalorias(refeicoes: IRefeicao[]): number {
  return refeicoes.reduce((total, refeicao) => total + refeicao.calorias, 0);
}

export function filtrarPorTipo(refeicoes: IRefeicao[], tipo: string | null): IRefeicao[] {
  if (!tipo) return refeicoes;
  return refeicoes.filter(refeicao => refeicao.tipo === tipo);
} 