import React from 'react';
import { TipoRefeicao } from '@/core/domain/enums/tipo-refeicao.enum';

interface FiltroTipoProps {
  tipoSelecionado: TipoRefeicao | null;
  onFiltrar: (tipo: TipoRefeicao | null) => void;
  className?: string;
}

export default function FiltroTipo({ tipoSelecionado, onFiltrar, className = '' }: FiltroTipoProps) {
  const tiposConfig = [
    {
      id: null,
      nome: 'Todas',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
      color: 'border-blue-200 text-blue-800 bg-blue-50',
      activeColor: 'border-blue-500 bg-blue-600 text-white',
    },
    {
      id: TipoRefeicao.CAFE_DA_MANHA,
      nome: 'Café da Manhã',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: 'border-amber-200 text-amber-800 bg-amber-50',
      activeColor: 'border-amber-500 bg-amber-600 text-white',
    },
    {
      id: TipoRefeicao.ALMOCO,
      nome: 'Almoço',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      color: 'border-green-200 text-green-800 bg-green-50',
      activeColor: 'border-green-500 bg-green-600 text-white',
    },
    {
      id: TipoRefeicao.LANCHE,
      nome: 'Lanche da tarde',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
      color: 'border-orange-200 text-orange-800 bg-orange-50',
      activeColor: 'border-orange-500 bg-orange-600 text-white',
    },
    {
      id: TipoRefeicao.JANTA,
      nome: 'Jantar',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ),
      color: 'border-purple-200 text-purple-800 bg-purple-50',
      activeColor: 'border-purple-500 bg-purple-600 text-white',
    }
  ];

  return (
    <div className={`mb-8 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">Filtrar Refeições</h2>
        
        {tipoSelecionado && (
          <button 
            onClick={() => onFiltrar(null)}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            <span>Limpar filtro</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {tiposConfig.map((tipo) => (
          <button
            key={tipo.id || 'todos'}
            onClick={() => onFiltrar(tipo.id)}
            className={`
              border p-3 rounded-xl flex flex-col items-center justify-center transition-all
              ${tipoSelecionado === tipo.id ? tipo.activeColor : tipo.color}
              hover:shadow-sm h-24 sm:h-28
            `}
          >
            <div className="mb-2">
              {tipo.icon}
            </div>
            <span className="text-sm font-medium">{tipo.nome}</span>
          </button>
        ))}
      </div>
    </div>
  );
} 