import { z } from 'zod';
import { TipoRefeicao } from '@/core/domain/enums/tipo-refeicao.enum';

export const refeicaoCreateSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  descricao: z.string().min(5, 'Descrição deve ter pelo menos 5 caracteres'),
  calorias: z.number().min(1, 'Calorias devem ser maiores que zero'),
  data: z.string().or(z.date()),
  tipo: z.nativeEnum(TipoRefeicao, {
    errorMap: () => ({ message: 'Tipo de refeição inválido' }),
  }),
  favorito: z.boolean().optional().default(false),
  imagemUrl: z.string().optional(),
});

export const refeicaoUpdateSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres').optional(),
  descricao: z.string().min(5, 'Descrição deve ter pelo menos 5 caracteres').optional(),
  calorias: z.number().min(1, 'Calorias devem ser maiores que zero').optional(),
  data: z.string().or(z.date()).optional(),
  tipo: z
    .nativeEnum(TipoRefeicao, {
      errorMap: () => ({ message: 'Tipo de refeição inválido' }),
    })
    .optional(),
  favorito: z.boolean().optional(),
  imagemUrl: z.string().optional(),
});

export const refeicaoFilterSchema = z.object({
  tipo: z
    .nativeEnum(TipoRefeicao, {
      errorMap: () => ({ message: 'Tipo de refeição inválido' }),
    })
    .optional(),
  dataInicio: z.string().optional(),
  dataFim: z.string().optional(),
  favorito: z.boolean().optional(),
});

export type RefeicaoCreateDTO = z.infer<typeof refeicaoCreateSchema>;
export type RefeicaoUpdateDTO = z.infer<typeof refeicaoUpdateSchema>;
export type RefeicaoFilterDTO = z.infer<typeof refeicaoFilterSchema>; 