export interface UsuarioPreferenciasDTO {
  metaCalorias: number;
}

export interface UsuarioUpdateDTO {
  nome?: string;
  email?: string;
  preferencias?: UsuarioPreferenciasDTO;
}

export interface UsuarioResponseDTO {
  _id: string;
  nome?: string;
  email?: string;
  preferencias: UsuarioPreferenciasDTO;
  createdAt: string;
  updatedAt: string;
} 