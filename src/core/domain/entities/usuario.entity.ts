export interface IUsuario {
  _id?: string;
  nome?: string;
  email?: string;
  preferencias: {
    metaCalorias: number;
  };
  createdAt?: Date;
  updatedAt?: Date;
} 