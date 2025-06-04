import { FilterQuery } from 'mongoose';
import connectDB from '../mongodb';
import RefeicaoModel, { IRefeicaoDocument } from '../models/refeicao.model';
import { IRefeicao } from '../../../domain/entities/refeicao.entity';
import { RefeicaoFilterDTO, RefeicaoCreateDTO, RefeicaoUpdateDTO } from '../../../domain/dtos/refeicao.dto';
import mongoose from 'mongoose';
import { TipoRefeicao } from '../../../domain/enums/tipo-refeicao.enum';

const inMemoryDb: IRefeicao[] = [];

let isDevMode = false;
let devDataInitialized = false; 

const generateId = () => Math.random().toString(36).substring(2, 15);

const initializeDevData = () => {
  if (devDataInitialized || inMemoryDb.length > 0) {
    return;
  }
  
  devDataInitialized = true;
  
  const agora = new Date();
  const ontem = new Date(agora);
  ontem.setDate(ontem.getDate() - 1);
  const amanha = new Date(agora);
  amanha.setDate(amanha.getDate() + 1);
  
  const exemploRefeicoes: IRefeicao[] = [
    {
      _id: generateId(),
      nome: 'Café da Manhã',
      descricao: 'Pão integral com ovos mexidos e suco de laranja',
      calorias: 450,
      data: new Date(agora.setHours(8, 0, 0, 0)),
      tipo: TipoRefeicao.CAFE_DA_MANHA,
      favorito: true,
      createdAt: ontem,
      updatedAt: ontem
    },
    {
      _id: generateId(),
      nome: 'Almoço',
      descricao: 'Arroz, feijão, filé de frango grelhado e salada',
      calorias: 680,
      data: new Date(agora.setHours(12, 30, 0, 0)),
      tipo: TipoRefeicao.ALMOCO,
      favorito: false,
      createdAt: ontem,
      updatedAt: ontem
    },
    {
      _id: generateId(),
      nome: 'Lanche da Tarde',
      descricao: 'Iogurte com granola e mel',
      calorias: 320,
      data: new Date(agora.setHours(16, 0, 0, 0)),
      tipo: TipoRefeicao.LANCHE,
      favorito: false,
      createdAt: ontem,
      updatedAt: ontem
    }
  ];
  
  inMemoryDb.push(...exemploRefeicoes);
  console.log('Dados de exemplo inicializados para modo de desenvolvimento');
};

export class RefeicaoRepository {
  private static async checkConnection() {
    try {
      await connectDB();
      
      const isConnected = mongoose.connection.readyState === 1;
      isDevMode = !isConnected;
      
      if (isDevMode) {
        console.log('Usando armazenamento em memória para desenvolvimento');
        initializeDevData();
      }
    } catch {
      console.warn('MongoDB não disponível, usando armazenamento em memória para desenvolvimento');
      isDevMode = true;
      initializeDevData();
    }
  }

  static async findAll(filtros?: RefeicaoFilterDTO): Promise<IRefeicao[]> {
    await this.checkConnection();
    
    if (isDevMode) {
      let result = [...inMemoryDb];
      
      if (filtros) {
        if (filtros.tipo) {
          result = result.filter(r => r.tipo === filtros.tipo);
        }
        
        if (filtros.dataInicio || filtros.dataFim) {
          result = result.filter(r => {
            const dataRefeicao = new Date(r.data);
            if (filtros.dataInicio && new Date(filtros.dataInicio) > dataRefeicao) {
              return false;
            }
            if (filtros.dataFim && new Date(filtros.dataFim) < dataRefeicao) {
              return false;
            }
            return true;
          });
        }
        
        if (filtros.favorito !== undefined) {
          result = result.filter(r => r.favorito === filtros.favorito);
        }
      }
      
      return result.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
    }
    
    try {
      const query: FilterQuery<IRefeicaoDocument> = {};
      
      if (filtros) {
        if (filtros.tipo) {
          query.tipo = filtros.tipo;
        }
        
        if (filtros.dataInicio || filtros.dataFim) {
          query.data = {};
          if (filtros.dataInicio) {
            query.data.$gte = new Date(filtros.dataInicio);
          }
          if (filtros.dataFim) {
            query.data.$lte = new Date(filtros.dataFim);
          }
        }
        
        if (filtros.favorito !== undefined) {
          query.favorito = filtros.favorito;
        }
      }
      
      const refeicoes = await RefeicaoModel.find(query).sort({ data: -1 }).lean();
      return refeicoes.map(doc => ({
        ...doc,
        _id: String(doc._id)
      })) as IRefeicao[];
    } catch (error) {
      console.error('Erro ao buscar refeições do MongoDB:', error);
      return this.findAll(filtros);
    }
  }
  
  static async findById(id: string): Promise<IRefeicao | null> {
    await this.checkConnection();
    
    if (isDevMode) {
      return inMemoryDb.find(r => r._id === id) || null;
    }
    
    const refeicao = await RefeicaoModel.findById(id).lean();
    if (!refeicao) return null;
    
    return {
      ...refeicao,
      _id: String(refeicao._id)
    } as IRefeicao;
  }
  
  static async create(refeicao: RefeicaoCreateDTO): Promise<IRefeicao> {
    await this.checkConnection();
    
    const dataProcessada = {
      ...refeicao,
      data: new Date(refeicao.data)
    };
    
    if (isDevMode) {
      const now = new Date();
      const novaRefeicao: IRefeicao = {
        _id: generateId(),
        ...dataProcessada,
        favorito: refeicao.favorito !== undefined ? refeicao.favorito : false,
        createdAt: now,
        updatedAt: now
      };
      
      inMemoryDb.push(novaRefeicao);
      return novaRefeicao;
    }
    
    const dadosPersistencia = {
      ...dataProcessada
    };
    
    const novaRefeicao = new RefeicaoModel(dadosPersistencia);
    const saved = await novaRefeicao.save();
    const result = saved.toObject();
    
    return {
      ...result,
      _id: String(result._id)
    } as IRefeicao;
  }
  
  static async update(id: string, refeicao: RefeicaoUpdateDTO): Promise<IRefeicao | null> {
    await this.checkConnection();
    
    try {
      const dados: RefeicaoUpdateDTO = { ...refeicao };
      
      if (isDevMode) {
        const index = inMemoryDb.findIndex(r => r._id === id);
        if (index === -1) return null;
        
        const now = new Date();
        
        const refeicaoOriginal = inMemoryDb[index];
        const refeicaoAtualizada: IRefeicao = {
          ...refeicaoOriginal,
          nome: dados.nome ?? refeicaoOriginal.nome,
          descricao: dados.descricao ?? refeicaoOriginal.descricao,
          calorias: dados.calorias ?? refeicaoOriginal.calorias,
          tipo: dados.tipo ?? refeicaoOriginal.tipo,
          data: dados.data ? new Date(dados.data) : refeicaoOriginal.data,
          favorito: dados.favorito ?? refeicaoOriginal.favorito,
          imagemUrl: dados.imagemUrl ?? refeicaoOriginal.imagemUrl,
          updatedAt: now
        };
        
        inMemoryDb[index] = refeicaoAtualizada;
        return refeicaoAtualizada;
      }
      
      const updateData: Record<string, unknown> = {};
      if (dados.nome !== undefined) updateData.nome = dados.nome;
      if (dados.descricao !== undefined) updateData.descricao = dados.descricao;
      if (dados.calorias !== undefined) updateData.calorias = dados.calorias;
      if (dados.tipo !== undefined) updateData.tipo = dados.tipo;
      if (dados.data !== undefined) updateData.data = new Date(dados.data);
      if (dados.favorito !== undefined) updateData.favorito = dados.favorito;
      if (dados.imagemUrl !== undefined) updateData.imagemUrl = dados.imagemUrl;
      
      const updated = await RefeicaoModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true, lean: true }
      );
      
      if (!updated) return null;
      
      return {
        ...updated,
        _id: String(updated._id)
      } as IRefeicao;
    } catch (error) {
      console.error('Erro ao atualizar refeição no repositório:', error);
      throw error;
    }
  }
  
  static async delete(id: string): Promise<IRefeicao | null> {
    await this.checkConnection();
    
    if (isDevMode) {
      const index = inMemoryDb.findIndex(r => r._id === id);
      if (index === -1) return null;
      
      const refeicaoRemovida = inMemoryDb[index];
      inMemoryDb.splice(index, 1);
      return refeicaoRemovida;
    }
    
    const deleted = await RefeicaoModel.findByIdAndDelete(id).lean();
    if (!deleted) return null;
    
    return {
      ...deleted,
      _id: String(deleted._id)
    } as IRefeicao;
  }
  
  static async findToday(): Promise<IRefeicao[]> {
    await this.checkConnection();
    
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const amanha = new Date(hoje);
    amanha.setDate(amanha.getDate() + 1);
    
    if (isDevMode) {
      return inMemoryDb.filter(r => {
        const dataRefeicao = new Date(r.data);
        dataRefeicao.setHours(0, 0, 0, 0);
        return dataRefeicao.getTime() >= hoje.getTime() && dataRefeicao.getTime() < amanha.getTime();
      }).sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
    }
    
    const refeicoes = await RefeicaoModel.find({
      data: { $gte: hoje, $lt: amanha }
    }).sort({ data: 1 }).lean();
    
    return refeicoes.map(doc => ({
      ...doc,
      _id: String(doc._id)
    })) as IRefeicao[];
  }
} 