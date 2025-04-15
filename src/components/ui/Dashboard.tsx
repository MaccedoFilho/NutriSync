import React, { useState } from 'react';
import { IRefeicao } from '@/core/domain/entities/refeicao.entity';
import { TipoRefeicao } from '@/core/domain/enums/tipo-refeicao.enum';
import { formatarCalorias } from '@/shared/utils/formatting';
import { useUsuario } from '@/hooks/useUsuario';

interface DashboardProps {
  refeicoesHoje: IRefeicao[];
  totalCalorias: number;
}

export default function Dashboard({ refeicoesHoje, totalCalorias }: DashboardProps) {
  const { metaCalorias, atualizarMetaCalorias, isLoading: isLoadingUsuario } = useUsuario();
  const [isEditingMeta, setIsEditingMeta] = useState(false);
  const [novaMeta, setNovaMeta] = useState<number>(metaCalorias);
  const [isSalvando, setIsSalvando] = useState(false);
  
  const refeicoesPorTipo: Record<string, IRefeicao[]> = {};
  
  Object.values(TipoRefeicao).forEach(tipo => {
    refeicoesPorTipo[tipo] = [];
  });
  
  refeicoesHoje.forEach(refeicao => {
    if (refeicoesPorTipo[refeicao.tipo]) {
      refeicoesPorTipo[refeicao.tipo].push(refeicao);
    }
  });
  
  const percentualMeta = Math.min(Math.round((totalCalorias / metaCalorias) * 100), 100);
  
  let progressoEstilo = 'bg-green-500';
  if (percentualMeta > 90) progressoEstilo = 'bg-red-500';
  else if (percentualMeta > 75) progressoEstilo = 'bg-orange-500';
  
  let mensagemRecomendacao = '';
  if (totalCalorias < metaCalorias * 0.5) {
    mensagemRecomendacao = 'Seu consumo calórico está abaixo do recomendado hoje.';
  } else if (totalCalorias > metaCalorias * 1.25) {
    mensagemRecomendacao = 'Seu consumo calórico está acima do recomendado hoje.';
  } else {
    mensagemRecomendacao = 'Seu consumo calórico está dentro do ideal.';
  }

  const handleEditMeta = () => {
    setNovaMeta(metaCalorias);
    setIsEditingMeta(true);
  };

  const handleSaveMetaCalorias = async () => {
    setIsSalvando(true);
    try {
      await atualizarMetaCalorias(novaMeta);
      setIsEditingMeta(false);
    } catch (error) {
      console.error('Erro ao salvar meta de calorias:', error);
    } finally {
      setIsSalvando(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingMeta(false);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Resumo do Dia</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-2xl shadow p-5 border border-gray-100">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-medium text-gray-700">Calorias</h3>
            
            {isEditingMeta ? (
              <div className="flex items-center">
                <input
                  type="number"
                  value={novaMeta}
                  onChange={(e) => setNovaMeta(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-20 p-1 border border-blue-300 rounded text-xs mr-2"
                  disabled={isSalvando}
                />
                <button
                  onClick={handleSaveMetaCalorias}
                  disabled={isSalvando}
                  className="text-green-600 hover:text-green-800 focus:outline-none p-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <button
                  onClick={handleCancelEdit}
                  disabled={isSalvando}
                  className="text-red-600 hover:text-red-800 focus:outline-none p-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                  Meta: {formatarCalorias(metaCalorias)}
                </span>
                <button 
                  onClick={handleEditMeta}
                  className="ml-1 text-blue-600 hover:text-blue-800 focus:outline-none"
                  disabled={isLoadingUsuario}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
              </div>
            )}
          </div>
          
          <div className="mb-2">
            <div className="text-3xl font-bold text-gray-900">
              {formatarCalorias(totalCalorias)}
            </div>
            <div className="text-sm text-gray-500 mt-1">{percentualMeta}% da meta diária</div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
            <div 
              className={`h-2.5 rounded-full ${progressoEstilo}`}
              style={{ width: `${percentualMeta}%` }}
            ></div>
          </div>
          
          <div className="text-xs text-gray-600 italic">{mensagemRecomendacao}</div>
        </div>
        
        <div className="bg-white rounded-2xl shadow p-5 border border-gray-100">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Refeições de Hoje</h3>
          
          <div className="flex items-end space-x-2 mb-4">
            <div className="text-3xl font-bold text-gray-900">{refeicoesHoje.length}</div>
            <div className="text-sm text-gray-500 pb-1">registradas</div>
          </div>
          
          <div className="space-y-2">
            {Object.entries(refeicoesPorTipo).map(([tipo, refeicoes]) => (
              <div key={tipo} className="flex justify-between text-sm">
                <div className="text-gray-600">{tipo}</div>
                <div className="font-medium">{refeicoes.length}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow p-5 border border-gray-100">
          <h3 className="text-lg font-medium text-gray-700 mb-3">Distribuição de Calorias</h3>
          
          {refeicoesHoje.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-gray-400 text-center">
              <p>Registre refeições para ver<br />a distribuição de calorias</p>
            </div>
          ) : (
            <div className="space-y-3">
              {Object.entries(refeicoesPorTipo)
                .filter(([, refeicoes]) => refeicoes.length > 0)
                .map(([tipo, refeicoes]) => {
                  const caloriasTipo = refeicoes.reduce((sum, r) => sum + r.calorias, 0);
                  const percentual = Math.round((caloriasTipo / totalCalorias) * 100) || 0;
                  
                  let barColor = 'bg-gray-500';
                  if (tipo === TipoRefeicao.CAFE_DA_MANHA) barColor = 'bg-yellow-500';
                  if (tipo === TipoRefeicao.ALMOCO) barColor = 'bg-green-500';
                  if (tipo === TipoRefeicao.LANCHE) barColor = 'bg-blue-500';
                  if (tipo === TipoRefeicao.JANTA) barColor = 'bg-purple-500';
                  
                  return (
                    <div key={tipo}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{tipo}</span>
                        <span className="font-medium">{formatarCalorias(caloriasTipo)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${barColor}`} 
                          style={{ width: `${percentual}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow p-5 border border-gray-100">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Refeições Registradas Hoje</h3>
        
        {refeicoesHoje.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p className="text-lg">Nenhuma refeição registrada hoje</p>
            <p className="mt-2 text-sm">Registre sua primeira refeição do dia</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {refeicoesHoje.map((refeicao) => {
              let tipoCor = 'text-gray-600 bg-gray-100';
              if (refeicao.tipo === TipoRefeicao.CAFE_DA_MANHA) tipoCor = 'text-yellow-800 bg-yellow-100';
              if (refeicao.tipo === TipoRefeicao.ALMOCO) tipoCor = 'text-green-800 bg-green-100';
              if (refeicao.tipo === TipoRefeicao.LANCHE) tipoCor = 'text-blue-800 bg-blue-100';
              if (refeicao.tipo === TipoRefeicao.JANTA) tipoCor = 'text-purple-800 bg-purple-100';
              
              return (
                <div key={refeicao._id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className={`text-xs px-2 py-1 rounded-full ${tipoCor} mr-3`}>
                      {refeicao.tipo}
                    </span>
                    <span className="font-medium">{refeicao.nome}</span>
                  </div>
                  <div className="font-bold">{formatarCalorias(refeicao.calorias)}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
} 