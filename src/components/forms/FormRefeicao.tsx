import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TipoRefeicao } from '@/core/domain/enums/tipo-refeicao.enum';
import { IRefeicao } from '@/core/domain/entities/refeicao.entity';

const refeicaoSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  descricao: z.string().min(5, 'Descrição deve ter pelo menos 5 caracteres'),
  calorias: z.number().min(1, 'Calorias devem ser maiores que zero'),
  data: z.string().refine(
    (date) => !isNaN(new Date(date).getTime()),
    { message: 'Data inválida' }
  ),
  tipo: z.enum([
    TipoRefeicao.CAFE_DA_MANHA,
    TipoRefeicao.ALMOCO, 
    TipoRefeicao.LANCHE, 
    TipoRefeicao.JANTA
  ]),
  favorito: z.boolean().optional(),
  imagemUrl: z.string().optional(),
});

type FormRefeicaoValues = z.infer<typeof refeicaoSchema>;

type FormRefeicaoProps = {
  refeicao?: IRefeicao;
  onSubmit: (data: FormRefeicaoValues) => void;
  onCancel: () => void;
};

export default function FormRefeicao({ refeicao, onSubmit, onCancel }: FormRefeicaoProps) {
  const { 
    control, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormRefeicaoValues>({
    resolver: zodResolver(refeicaoSchema),
    defaultValues: refeicao 
      ? {
          nome: refeicao.nome,
          descricao: refeicao.descricao,
          calorias: refeicao.calorias,
          tipo: refeicao.tipo as TipoRefeicao,
          favorito: refeicao.favorito || false,
          imagemUrl: refeicao.imagemUrl || '',
          data: refeicao.data instanceof Date 
            ? refeicao.data.toISOString().substring(0, 16) 
            : new Date(refeicao.data).toISOString().substring(0, 16),
        } 
      : {
          nome: '',
          descricao: '',
          calorias: 0,
          data: new Date().toISOString().substring(0, 16),
          tipo: TipoRefeicao.CAFE_DA_MANHA,
          favorito: false,
          imagemUrl: '',
        },
  });

  React.useEffect(() => {
    if (refeicao) {
      reset({
        nome: refeicao.nome,
        descricao: refeicao.descricao,
        calorias: refeicao.calorias,
        tipo: refeicao.tipo as TipoRefeicao,
        favorito: refeicao.favorito || false,
        imagemUrl: refeicao.imagemUrl || '',
        data: refeicao.data instanceof Date 
          ? refeicao.data.toISOString().substring(0, 16) 
          : new Date(refeicao.data).toISOString().substring(0, 16),
      });
    }
  }, [refeicao, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome <span className="text-red-500">*</span>
        </label>
        <Controller
          name="nome"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nome da refeição"
            />
          )}
        />
        {errors.nome && (
          <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descrição <span className="text-red-500">*</span>
        </label>
        <Controller
          name="descricao"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Descrição da refeição"
              rows={3}
            />
          )}
        />
        {errors.descricao && (
          <p className="mt-1 text-sm text-red-600">{errors.descricao.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Calorias <span className="text-red-500">*</span>
          </label>
          <Controller
            name="calorias"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Calorias"
                min="0"
              />
            )}
          />
          {errors.calorias && (
            <p className="mt-1 text-sm text-red-600">{errors.calorias.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo <span className="text-red-500">*</span>
          </label>
          <Controller
            name="tipo"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.values(TipoRefeicao).map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            )}
          />
          {errors.tipo && (
            <p className="mt-1 text-sm text-red-600">{errors.tipo.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Data e Hora <span className="text-red-500">*</span>
        </label>
        <Controller
          name="data"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="datetime-local"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          )}
        />
        {errors.data && (
          <p className="mt-1 text-sm text-red-600">{errors.data.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          URL da Imagem
        </label>
        <Controller
          name="imagemUrl"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="URL da imagem (opcional)"
            />
          )}
        />
      </div>

      <div className="flex items-center">
        <Controller
          name="favorito"
          control={control}
          render={({ field }) => (
            <input
              id="favorito"
              type="checkbox"
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
          )}
        />
        <label htmlFor="favorito" className="ml-2 block text-sm text-gray-700">
          Marcar como favorito
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {refeicao ? 'Atualizar' : 'Adicionar'} Refeição
        </button>
      </div>
    </form>
  );
}