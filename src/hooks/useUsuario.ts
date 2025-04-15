import { useState, useEffect, useCallback } from 'react';
import { IUsuario } from '@/core/domain/entities/usuario.entity';
import { UsuarioUpdateDTO } from '@/core/domain/dtos/usuario.dto';

const apiUrl = '/api/usuario';

interface UseUsuarioReturn {
  usuario: IUsuario | null;
  isLoading: boolean;
  error: string | null;
  atualizarPreferencias: (preferencias: UsuarioUpdateDTO) => Promise<boolean>;
  metaCalorias: number;
  atualizarMetaCalorias: (novaMeta: number) => Promise<boolean>;
}

export function useUsuario(): UseUsuarioReturn {
  const [usuario, setUsuario] = useState<IUsuario | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const carregarUsuario = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Erro ao carregar preferências do usuário');
      }
      
      const data = await response.json();
      setUsuario(data);
    } catch (err) {
      setError((err as Error).message);
      console.error('Erro ao carregar usuário:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarUsuario();
  }, [carregarUsuario]);

  const atualizarPreferencias = async (preferencias: UsuarioUpdateDTO): Promise<boolean> => {
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferencias),
      });
      
      if (!response.ok) {
        throw new Error('Erro ao atualizar preferências');
      }
      
      const usuarioAtualizado = await response.json();
      setUsuario(usuarioAtualizado);
      return true;
    } catch (err) {
      setError((err as Error).message);
      console.error('Erro ao atualizar preferências:', err);
      return false;
    }
  };

  const atualizarMetaCalorias = async (novaMeta: number): Promise<boolean> => {
    if (novaMeta < 0) {
      setError('Meta de calorias não pode ser negativa');
      return false;
    }
    
    return await atualizarPreferencias({
      preferencias: {
        metaCalorias: novaMeta
      }
    });
  };

  // valor padrão é 2000, porem o usuario pode mudar 
  const metaCalorias = usuario?.preferencias?.metaCalorias || 2000;

  return {
    usuario,
    isLoading,
    error,
    atualizarPreferencias,
    metaCalorias,
    atualizarMetaCalorias,
  };
} 