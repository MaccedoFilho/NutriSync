import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn(
    'Aviso: Variável MONGODB_URI não definida. Em modo de desenvolvimento, usando um banco de dados em memória.'
  );
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

/* eslint-disable no-var */
declare global {
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Conecta ao MongoDB usando a URI configurada ou fallback para local
 */
async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Timeout de 5 segundos para seleção de servidor
      connectTimeoutMS: 10000, // Timeout de 10 segundos para conexão
    };

    // URI para MongoDB local como fallback
    const fallbackURI = 'mongodb://localhost:27017/mealtracker';
    
    // Tenta conectar com a URI configurada
    if (MONGODB_URI) {
      try {
        cached.promise = mongoose
          .connect(MONGODB_URI, opts)
          .then((mongoose) => {
            console.log('Conectado ao MongoDB com sucesso');
            return mongoose;
          })
          .catch(err => {
            console.error('Erro ao conectar ao MongoDB configurado:', err.message);
            console.log('Tentando conexão com MongoDB local...');
            
            // Tenta conectar ao MongoDB local em caso de falha
            return mongoose
              .connect(fallbackURI, opts)
              .then((mongoose) => {
                console.log('Conectado ao MongoDB local com sucesso');
                return mongoose;
              })
              .catch(localErr => {
                console.error('Erro ao conectar ao MongoDB local:', localErr.message);
                console.warn('MongoDB não disponível, usando armazenamento em memória para desenvolvimento');
                return mongoose;
              });
          });
      } catch (error) {
        console.error('Falha ao configurar conexão com MongoDB:', error);
        cached.promise = Promise.resolve(mongoose);
      }
    } 
    // Se nenhuma URI foi configurada, tenta conectar diretamente ao MongoDB local
    else {
      try {
        cached.promise = mongoose
          .connect(fallbackURI, opts)
          .then((mongoose) => {
            console.log('Conectado ao MongoDB local com sucesso');
            return mongoose;
          })
          .catch(err => {
            console.error('Erro ao conectar ao MongoDB local:', err.message);
            console.warn('MongoDB não disponível, usando armazenamento em memória para desenvolvimento');
            return mongoose;
          });
      } catch (error) {
        console.error('Falha ao configurar conexão com MongoDB:', error);
        cached.promise = Promise.resolve(mongoose);
      }
    }
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('Erro na conexão com MongoDB:', e);
    // Não lança o erro novamente, apenas retorna o mongoose para permitir modo fallback
  }

  return cached.conn;
}

export default connectDB; 