import React from 'react';
import { IRefeicao } from '@/core/domain/entities/refeicao.entity';
import { TipoRefeicao } from '@/core/domain/enums/tipo-refeicao.enum';

interface RefeicaoCardProps {
  refeicao: IRefeicao;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleFavorito: (id: string) => void;
}

export default function RefeicaoCard({ 
  refeicao, 
  onEdit, 
  onDelete, 
  onToggleFavorito 
}: RefeicaoCardProps) {
  
  const tiposConfig = {
    [TipoRefeicao.CAFE_DA_MANHA]: {
      cor: 'text-yellow-800',
      bgCor: 'bg-yellow-100',
      icone: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.5A1.5 1.5 0 017.5 7h1A1.5 1.5 0 0110 5.5V5z" clipRule="evenodd" />
        </svg>
      )
    },
    [TipoRefeicao.ALMOCO]: {
      cor: 'text-green-800',
      bgCor: 'bg-green-100',
      icone: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
        </svg>
      )
    },
    [TipoRefeicao.LANCHE]: {
      cor: 'text-blue-800',
      bgCor: 'bg-blue-100',
      icone: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a2 2 0 00-2 2v1a2 2 0 00-2 2v.683a3.7 3.7 0 011.055.485 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0A3.7 3.7 0 0118 12.683V12a2 2 0 00-2-2V9a2 2 0 00-2-2V6a1 1 0 10-2 0v1h-1V6a1 1 0 10-2 0v1H8V6zm10 8.868a3.704 3.704 0 01-4.055-.036 1.704 1.704 0 00-1.89 0 3.704 3.704 0 01-4.11 0 1.704 1.704 0 00-1.89 0A3.704 3.704 0 012 14.868V17a1 1 0 001 1h14a1 1 0 001-1v-2.132zM9 3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm3 0a1 1 0 011-1h.01a1 1 0 110 2H13a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      )
    },
    [TipoRefeicao.JANTA]: {
      cor: 'text-purple-800',
      bgCor: 'bg-purple-100',
      icone: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
        </svg>
      )
    }
  };
  
  const formatarData = (data: string | Date) => {
    const dataObj = data instanceof Date ? data : new Date(data);
    
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const dataRefeicao = new Date(dataObj);
    dataRefeicao.setHours(0, 0, 0, 0);
    
    const diaRefeicao = dataRefeicao.getDate().toString().padStart(2, '0');
    const mesRefeicao = (dataRefeicao.getMonth() + 1).toString().padStart(2, '0');
    
    let prefixo = '';
    if (dataRefeicao.getTime() === hoje.getTime()) {
      prefixo = 'Hoje';
    } else {
      prefixo = `${diaRefeicao}/${mesRefeicao}`;
    }
    
    const hora = dataObj.getHours().toString().padStart(2, '0');
    const minutos = dataObj.getMinutes().toString().padStart(2, '0');
    
    return `${prefixo} às ${hora}:${minutos}`;
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-4">
        <div className="flex items-center mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${tiposConfig[refeicao.tipo]?.bgCor} ${tiposConfig[refeicao.tipo]?.cor} mr-2 flex items-center`}>
            {tiposConfig[refeicao.tipo]?.icone}
            <span className="ml-1">{refeicao.tipo}</span>
          </span>
          <span className="text-sm text-gray-500">{formatarData(refeicao.data)}</span>
          <div className="ml-auto">
            <button 
              onClick={() => onToggleFavorito(refeicao._id || '')} 
              className="text-gray-400 hover:text-yellow-500 focus:outline-none transition-colors duration-200"
            >
              {refeicao.favorito ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{refeicao.nome}</h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{refeicao.descricao}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
            </svg>
            {refeicao.calorias} cal
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => onEdit(refeicao._id || '')} 
              className="p-1 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            
            <button 
              onClick={() => onDelete(refeicao._id || '')} 
              className="p-1 bg-red-50 text-red-600 rounded hover:bg-red-100 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            
            <button 
              onClick={() => window.open(refeicao.imagemUrl, '_blank')}
              className={`p-1 ${refeicao.imagemUrl ? 'bg-gray-50 text-gray-600 hover:bg-gray-100' : 'bg-gray-50 text-gray-300 cursor-not-allowed'} rounded focus:outline-none`}
              disabled={!refeicao.imagemUrl}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 