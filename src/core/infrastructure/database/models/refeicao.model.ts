import mongoose, { Document, Schema, Model } from 'mongoose';
import { IRefeicao } from '../../../domain/entities/refeicao.entity';
import { TipoRefeicao } from '../../../domain/enums/tipo-refeicao.enum';

export interface IRefeicaoDocument extends Omit<IRefeicao, '_id'>, Document {}

const RefeicaoSchema = new Schema<IRefeicaoDocument>(
  {
    nome: { 
      type: String, 
      required: [true, 'Nome da refeição é obrigatório'] 
    },
    descricao: { 
      type: String, 
      required: [true, 'Descrição da refeição é obrigatória'] 
    },
    calorias: { 
      type: Number, 
      required: [true, 'Valor calórico é obrigatório'],
      min: [0, 'Calorias não podem ser negativas']
    },
    data: { 
      type: Date, 
      required: [true, 'Data da refeição é obrigatória'],
      default: Date.now 
    },
    tipo: { 
      type: String, 
      required: [true, 'Tipo de refeição é obrigatório'],
      enum: Object.values(TipoRefeicao)
    },
    favorito: {
      type: Boolean,
      default: false
    },
    imagemUrl: {
      type: String
    }
  },
  { 
    timestamps: true 
  }
);

RefeicaoSchema.index({ data: 1 });
RefeicaoSchema.index({ tipo: 1 });
RefeicaoSchema.index({ favorito: 1 });

const RefeicaoModel: Model<IRefeicaoDocument> = 
  mongoose.models.Refeicao as Model<IRefeicaoDocument> || 
  mongoose.model<IRefeicaoDocument>('Refeicao', RefeicaoSchema);

export default RefeicaoModel; 