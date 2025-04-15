import connectDB from '../mongodb';
import UsuarioModel from '../models/usuario.model';
import { IUsuario } from '../../../domain/entities/usuario.entity';
import { UsuarioUpdateDTO } from '../../../domain/dtos/usuario.dto';
import mongoose from 'mongoose';

const usuarioMemoria: IUsuario = {
  _id: 'default-user',
  preferencias: {
    metaCalorias: 2000
  },
  createdAt: new Date(),
  updatedAt: new Date()
};

let isDevMode = false;

export class UsuarioRepository {
  private static async checkConnection() {
    try {
      await connectDB();
      
      const isConnected = mongoose.connection.readyState === 1;
      isDevMode = !isConnected;
      
      if (isDevMode) {
        console.log('Usando armazenamento em memória para usuário');
      }
    } catch {
      console.warn('MongoDB não disponível, usando armazenamento em memória para usuário');
      isDevMode = true;
    }
  }

  static async getUsuarioAtual(): Promise<IUsuario> {
    await this.checkConnection();
    
    if (isDevMode) {
      return usuarioMemoria;
    }
    
    try {
      const usuarioDoc = await UsuarioModel.findOne();
      
      if (!usuarioDoc) {
        const novoUsuario = new UsuarioModel({
          preferencias: {
            metaCalorias: 2000
          }
        });
        
        const savedUsuario = await novoUsuario.save();
        
        return {
          ...savedUsuario.toObject(),
          _id: String(savedUsuario._id)
        } as IUsuario;
      }
      
      return {
        ...usuarioDoc.toObject(),
        _id: String(usuarioDoc._id)
      } as IUsuario;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return usuarioMemoria;
    }
  }
  
  static async atualizarPreferencias(preferencias: UsuarioUpdateDTO): Promise<IUsuario> {
    await this.checkConnection();
    
    if (isDevMode) {
      if (preferencias.preferencias) {
        usuarioMemoria.preferencias = {
          ...usuarioMemoria.preferencias,
          ...preferencias.preferencias
        };
      }
      
      if (preferencias.nome) {
        usuarioMemoria.nome = preferencias.nome;
      }
      
      if (preferencias.email) {
        usuarioMemoria.email = preferencias.email;
      }
      
      usuarioMemoria.updatedAt = new Date();
      
      return usuarioMemoria;
    }
    
    try {
      let usuario = await UsuarioModel.findOne();
      
      if (!usuario) {
        usuario = new UsuarioModel({
          preferencias: {
            metaCalorias: 2000
          }
        });
      }
      
      if (preferencias.preferencias) {
        usuario.preferencias = {
          ...usuario.preferencias,
          ...preferencias.preferencias
        };
      }
      
      if (preferencias.nome) {
        usuario.nome = preferencias.nome;
      }
      
      if (preferencias.email) {
        usuario.email = preferencias.email;
      }
      
      const atualizado = await usuario.save();
      
      return {
        ...atualizado.toObject(),
        _id: String(atualizado._id)
      } as IUsuario;
    } catch (error) {
      console.error('Erro ao atualizar preferências:', error);
      return usuarioMemoria;
    }
  }
} 