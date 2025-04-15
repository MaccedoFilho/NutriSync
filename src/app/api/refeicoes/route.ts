import { NextRequest, NextResponse } from 'next/server';
import { RefeicaoRepository } from '@/core/infrastructure/database/repositories/refeicao.repository';
import { refeicaoCreateSchema } from '@/core/infrastructure/validators/refeicao.validator';
import { TipoRefeicao } from '@/core/domain/enums/tipo-refeicao.enum';
import { RefeicaoCreateDTO } from '@/core/domain/dtos/refeicao.dto';
import { ZodError } from 'zod';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filtros: {
      tipo?: TipoRefeicao;
      dataInicio?: string;
      dataFim?: string;
      favorito?: boolean;
    } = {};
    
    const tipoParam = searchParams.get('tipo');
    if (tipoParam && Object.values(TipoRefeicao).includes(tipoParam as TipoRefeicao)) {
      filtros.tipo = tipoParam as TipoRefeicao;
    }
    
    const dataInicio = searchParams.get('dataInicio');
    if (dataInicio) filtros.dataInicio = dataInicio;
    
    const dataFim = searchParams.get('dataFim');
    if (dataFim) filtros.dataFim = dataFim;
    
    const favoritoParam = searchParams.get('favorito');
    if (favoritoParam === 'true') filtros.favorito = true;
    else if (favoritoParam === 'false') filtros.favorito = false;
    
    try {
      const refeicoes = await RefeicaoRepository.findAll(filtros);
      return NextResponse.json(refeicoes);
    } catch (validationError) {
      console.error('Erro na validação dos filtros:', validationError);
      const todasRefeicoes = await RefeicaoRepository.findAll();
      return NextResponse.json(todasRefeicoes);
    }
  } catch (error) {
    console.error('Erro ao buscar refeições:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar refeições' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    try {
      const validatedData = refeicaoCreateSchema.parse(data);
      
      const formattedData: RefeicaoCreateDTO = {
        ...validatedData,
        data: validatedData.data instanceof Date ? validatedData.data.toISOString() : validatedData.data
      };
      
      const novaRefeicao = await RefeicaoRepository.create(formattedData);
      
      return NextResponse.json(novaRefeicao, { status: 201 });
    } catch (validationError) {
      if (validationError instanceof ZodError) {
        return NextResponse.json(
          { 
            error: 'Dados inválidos',
            details: validationError.errors 
          },
          { status: 400 }
        );
      }
      throw validationError;
    }
  } catch (error) {
    console.error('Erro ao criar refeição:', error);
    return NextResponse.json(
      { error: 'Erro ao criar refeição' },
      { status: 500 }
    );
  }
}