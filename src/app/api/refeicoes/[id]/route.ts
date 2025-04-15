import { NextRequest, NextResponse } from 'next/server';
import { RefeicaoRepository } from '@/core/infrastructure/database/repositories/refeicao.repository';
import { refeicaoUpdateSchema } from '@/core/infrastructure/validators/refeicao.validator';
import { ZodError } from 'zod';
import { RefeicaoUpdateDTO } from '@/core/domain/dtos/refeicao.dto';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID da refeição não fornecido' },
        { status: 400 }
      );
    }
    
    const refeicao = await RefeicaoRepository.findById(id);
    
    if (!refeicao) {
      return NextResponse.json(
        { error: 'Refeição não encontrada' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(refeicao);
  } catch (error) {
    console.error('Erro ao buscar refeição por ID:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar refeição' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID da refeição não fornecido' },
        { status: 400 }
      );
    }
    
    const data = await request.json();
    
    try {
      const validatedData = refeicaoUpdateSchema.parse(data);
      
      const formattedData: RefeicaoUpdateDTO = {
        ...validatedData,
        data: validatedData.data instanceof Date ? validatedData.data.toISOString() : validatedData.data
      };
      
      const refeicaoAtualizada = await RefeicaoRepository.update(id, formattedData);
      
      if (!refeicaoAtualizada) {
        return NextResponse.json(
          { error: 'Refeição não encontrada' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(refeicaoAtualizada);
    } catch (validationError) {
      if (validationError instanceof ZodError) {
        return NextResponse.json(
          { 
            error: 'Dados de atualização inválidos',
            details: validationError.errors 
          },
          { status: 400 }
        );
      }
      throw validationError;
    }
  } catch (error) {
    console.error('Erro ao atualizar refeição:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar refeição' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID da refeição não fornecido' },
        { status: 400 }
      );
    }
    
    const refeicaoDeletada = await RefeicaoRepository.delete(id);
    
    if (!refeicaoDeletada) {
      return NextResponse.json(
        { error: 'Refeição não encontrada' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Refeição removida com sucesso', data: refeicaoDeletada }
    );
  } catch (error) {
    console.error('Erro ao remover refeição:', error);
    return NextResponse.json(
      { error: 'Erro ao remover refeição' },
      { status: 500 }
    );
  }
}