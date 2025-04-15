import mongoose, { Schema, Document } from 'mongoose';
import { IUsuario } from '@/core/domain/entities/usuario.entity';

export interface IUsuarioDocument extends Document, Omit<IUsuario, '_id'> {}

const UsuarioSchema = new Schema<IUsuarioDocument>(
  {
    nome: { 
      type: String 
    },
    email: { 
      type: String
    },
    preferencias: {
      metaCalorias: {
        type: Number,
        default: 2000,
        min: [0, 'Meta de calorias não pode ser negativa']
      }
    }
  },
  { 
    timestamps: true 
  }
);

// cria o modelo ou usa o existente
const UsuarioModel = mongoose.models.Usuario || mongoose.model<IUsuarioDocument>('Usuario', UsuarioSchema);

export default UsuarioModel; 