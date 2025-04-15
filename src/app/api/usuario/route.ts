import { NextRequest, NextResponse } from 'next/server';
import { UsuarioRepository } from '@/core/infrastructure/database/repositories/usuario.repository';
import { UsuarioUpdateDTO } from '@/core/domain/dtos/usuario.dto';

// ter o usuário atual (só existe um usuário no sistema)
export async function GET() {
  try {
    const usuario = await UsuarioRepository.getUsuarioAtual();
    return NextResponse.json(usuario, { status: 200 });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    return NextResponse.json(
      { message: 'Erro ao buscar usuário', error: (error as Error).message },
      { status: 500 }
    );
  }
}

// atualizar as preferências do usuário
export async function PUT(request: NextRequest) {
  try {
    const dados = await request.json() as UsuarioUpdateDTO;
    
    const usuarioAtualizado = await UsuarioRepository.atualizarPreferencias(dados);
    
    return NextResponse.json(usuarioAtualizado, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar preferências:', error);
    return NextResponse.json(
      { message: 'Erro ao atualizar preferências', error: (error as Error).message },
      { status: 400 }
    );
  }
} 