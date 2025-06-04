import { useState, useEffect, useCallback } from 'react';
import { IRefeicao } from '@/core/domain/entities/refeicao.entity';
import { TipoRefeicao } from '@/core/domain/enums/tipo-refeicao.enum';
import { RefeicaoCreateDTO, RefeicaoUpdateDTO } from '@/core/domain/dtos/refeicao.dto';

const apiUrl = '/api/refeicoes';

class RefeicaoService {
  static async getAll(): Promise<IRefeicao[]> {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Erro ao buscar refeições');
    }
    return response.json();
  }

  static async getById(id: string): Promise<IRefeicao> {
    const response = await fetch(`${apiUrl}/${id}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar refeição');
    }
    return response.json();
  }

  static async getToday(): Promise<IRefeicao[]> {
    const today = new Date().toISOString().split('T')[0];
    const response = await fetch(`${apiUrl}?dataInicio=${today}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar refeições de hoje');
    }
    return response.json();
  }

  static async create(refeicao: RefeicaoCreateDTO): Promise<IRefeicao> {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(refeicao),
    });
    if (!response.ok) {
      throw new Error('Erro ao criar refeição');
    }
    return response.json();
  }

  static async update(id: string, refeicao: RefeicaoUpdateDTO): Promise<IRefeicao> {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(refeicao),
    });
    if (!response.ok) {
      throw new Error('Erro ao atualizar refeição');
    }
    return response.json();
  }

  static async delete(id: string): Promise<void> {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erro ao excluir refeição');
    }
  }
}

interface UseRefeicoesReturn {
  refeicoes: IRefeicao[];
  refeicoesHoje: IRefeicao[];
  isLoading: boolean;
  error: string | null;
  tipoSelecionado: TipoRefeicao | null;
  totalCaloriasHoje: number;
  adicionarRefeicao: (refeicao: RefeicaoCreateDTO) => Promise<IRefeicao | null>;
  atualizarRefeicao: (id: string, refeicao: RefeicaoUpdateDTO) => Promise<IRefeicao | null>;
  removerRefeicao: (id: string) => Promise<boolean>;
  toggleFavorito: (id: string) => Promise<IRefeicao | null>;
  filtrarPorTipo: (tipo: TipoRefeicao | null) => void;
  recarregarRefeicoes: () => Promise<void>;
}

export function useRefeicoes(): UseRefeicoesReturn {
  const [refeicoes, setRefeicoes] = useState<IRefeicao[]>([]);
  const [refeicoesOriginal, setRefeicoesOriginal] = useState<IRefeicao[]>([]);
  const [refeicoesHoje, setRefeicoesHoje] = useState<IRefeicao[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tipoSelecionado, setTipoSelecionado] = useState<TipoRefeicao | null>(null);
  const [totalCaloriasHoje, setTotalCaloriasHoje] = useState(0);

  const calcularTotalCalorias = (refeicoes: IRefeicao[]): number => {
    return refeicoes.reduce((total, refeicao) => total + refeicao.calorias, 0);
  };

  const carregarRefeicoes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const todasRefeicoes = await RefeicaoService.getAll();
      setRefeicoesOriginal(todasRefeicoes);
      
      if (tipoSelecionado) {
        const refeicoesDoTipo = todasRefeicoes.filter(r => r.tipo === tipoSelecionado);
        setRefeicoes(refeicoesDoTipo);
      } else {
        setRefeicoes(todasRefeicoes);
      }
      
      const refeicoesDeHoje = await RefeicaoService.getToday();
      setRefeicoesHoje(refeicoesDeHoje);
      
      setTotalCaloriasHoje(calcularTotalCalorias(refeicoesDeHoje));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [tipoSelecionado]);

  useEffect(() => {
    carregarRefeicoes();
  }, [carregarRefeicoes]);

  const adicionarRefeicao = async (refeicao: RefeicaoCreateDTO): Promise<IRefeicao | null> => {
    try {
      const novaRefeicao = await RefeicaoService.create(refeicao);
      await carregarRefeicoes();
      return novaRefeicao;
    } catch (err) {
      setError((err as Error).message);
      return null;
    }
  };

  const atualizarRefeicao = async (id: string, refeicao: RefeicaoUpdateDTO): Promise<IRefeicao | null> => {
    try {
      const refeicaoAtualizada = await RefeicaoService.update(id, refeicao);
      await carregarRefeicoes();
      return refeicaoAtualizada;
    } catch (err) {
      setError((err as Error).message);
      return null;
    }
  };

  const removerRefeicao = async (id: string): Promise<boolean> => {
    try {
      await RefeicaoService.delete(id);
      
      const novasRefeicoesOriginal = refeicoesOriginal.filter(r => r._id !== id);
      setRefeicoesOriginal(novasRefeicoesOriginal);
      
      if (tipoSelecionado) {
        setRefeicoes(novasRefeicoesOriginal.filter(r => r.tipo === tipoSelecionado));
      } else {
        setRefeicoes(novasRefeicoesOriginal);
      }
      
      const novasRefeicoesHoje = refeicoesHoje.filter(r => r._id !== id);
      setRefeicoesHoje(novasRefeicoesHoje);
      setTotalCaloriasHoje(calcularTotalCalorias(novasRefeicoesHoje));
      
      return true;
    } catch (err) {
      setError((err as Error).message);
      return false;
    }
  };

  const toggleFavorito = async (id: string): Promise<IRefeicao | null> => {
    try {
      const refeicao = refeicoes.find(r => r._id === id);
      if (!refeicao) return null;
      
      const novoEstadoFavorito = !refeicao.favorito;
      return await atualizarRefeicao(id, { favorito: novoEstadoFavorito });
    } catch (err) {
      setError((err as Error).message);
      return null;
    }
  };

  const filtrarPorTipo = (tipo: TipoRefeicao | null) => {
    setTipoSelecionado(tipo);
    if (tipo) {
      setRefeicoes(refeicoesOriginal.filter(r => r.tipo === tipo));
    } else {
      setRefeicoes(refeicoesOriginal);
    }
  };

  return {
    refeicoes,
    refeicoesHoje,
    isLoading,
    error,
    tipoSelecionado,
    totalCaloriasHoje,
    adicionarRefeicao,
    atualizarRefeicao,
    removerRefeicao,
    toggleFavorito,
    filtrarPorTipo,
    recarregarRefeicoes: carregarRefeicoes,
  };
} 