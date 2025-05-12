'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRefeicoes } from '@/hooks/useRefeicoes';
import { IRefeicao } from '@/core/domain/entities/refeicao.entity';
import { TipoRefeicao } from '@/core/domain/enums/tipo-refeicao.enum';
import RefeicaoCard from '@/components/ui/RefeicaoCard';
import FiltroTipo from '@/components/ui/FiltroTipo';
import Dashboard from '@/components/ui/Dashboard';
import FormRefeicao from '@/components/forms/FormRefeicao';

interface FormData {
  _id?: string;
  nome: string;
  descricao: string;
  calorias: number;
  data: string;
  tipo: TipoRefeicao;
  favorito?: boolean;
  imagemUrl?: string;
}

export default function RefeicoesPage() {
  const {
    refeicoes,
    isLoading,
    error,
    adicionarRefeicao,
    atualizarRefeicao,
    removerRefeicao,
    toggleFavorito,
    filtrarPorTipo,
    refeicoesHoje,
    totalCaloriasHoje,
    tipoSelecionado,
  } = useRefeicoes();

  const [refeicaoEmEdicao, setRefeicaoEmEdicao] = useState<IRefeicao | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [animacaoModal, setAnimacaoModal] = useState(false);

  useEffect(() => {
    if (mostrarFormulario) {
      setTimeout(() => {
        setAnimacaoModal(true);
      }, 10);
    } else {
      setAnimacaoModal(false);
    }
  }, [mostrarFormulario]);

  const handleEditar = (id: string) => {
    const refeicao = refeicoes.find(r => r._id === id);
    if (refeicao) {
      setRefeicaoEmEdicao(refeicao);
      setMostrarFormulario(true);
    }
  };

  const handleExcluir = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta refeição?')) {
      await removerRefeicao(id);
    }
  };

  const handleSubmitForm = async (data: FormData) => {
    try {
      const dataProcessada = {
        ...data,
        data: data.data,
      };
      
      if (refeicaoEmEdicao && refeicaoEmEdicao._id) {
        await atualizarRefeicao(refeicaoEmEdicao._id, dataProcessada);
      } else {
        await adicionarRefeicao(dataProcessada);
      }
      
      fecharFormulario();
    } catch (err) {
      console.error('Erro ao salvar refeição:', err);
    }
  };

  const fecharFormulario = () => {
    setAnimacaoModal(false);
    setTimeout(() => {
      setMostrarFormulario(false);
      setRefeicaoEmEdicao(null);
    }, 300);
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 p-4 rounded-lg text-red-800">
          <h2 className="text-lg font-semibold mb-2">Erro ao carregar refeições</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-blue-600 text-4xl mr-3">🍲</div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">NutriSync</h1>
              <p className="text-sm text-gray-600">Gerencie suas refeições com facilidade</p>
            </div>
          </div>
          <Link 
            href="/" 
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors flex items-center shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Voltar
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Dashboard 
          refeicoesHoje={refeicoesHoje} 
          totalCalorias={totalCaloriasHoje} 
        />

        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <span className="text-green-600 mr-2">📋</span>
            Suas Refeições
          </h2>
          <button
            onClick={() => {
              setRefeicaoEmEdicao(null);
              setMostrarFormulario(true);
            }}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-sm hover:shadow flex items-center justify-center sm:w-auto w-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Nova Refeição
          </button>
        </div>

        <FiltroTipo 
          tipoSelecionado={tipoSelecionado} 
          onFiltrar={filtrarPorTipo} 
        />

        {mostrarFormulario && (
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
               style={{ opacity: animacaoModal ? 1 : 0 }}
               onClick={fecharFormulario}
          >
            <div 
              className={`bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 transition-transform duration-300 transform ${animacaoModal ? 'scale-100' : 'scale-95'}`}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <span className="text-blue-600 mr-2">
                    {refeicaoEmEdicao ? '✏️' : '➕'}
                  </span>
                  {refeicaoEmEdicao ? 'Editar Refeição' : 'Nova Refeição'}
                </h2>
                <button 
                  onClick={fecharFormulario}
                  className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1.5 rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <FormRefeicao
                refeicao={refeicaoEmEdicao || undefined}
                onSubmit={handleSubmitForm}
                onCancel={fecharFormulario}
              />
            </div>
          </div>
        )}

        <div className="mt-6">
          {isLoading ? (
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-700">Carregando refeições...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
              <div className="text-red-600 text-xl mb-2">😕 Ooops!</div>
              <p className="text-red-700">{error}</p>
            </div>
          ) : refeicoes.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="inline-flex justify-center items-center w-20 h-20 bg-blue-100 text-blue-600 rounded-full text-4xl mb-4">
                🍽️
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Nenhuma refeição encontrada</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Você ainda não registrou nenhuma refeição. Comece adicionando sua primeira refeição!
              </p>
              <button
                onClick={() => {
                  setRefeicaoEmEdicao(null);
                  setMostrarFormulario(true);
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-colors shadow-sm inline-flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 00-1 1v5H4a1 1 0 100 2h5v5a1 1 0 102 0v-5h5a1 1 0 100-2h-5V4a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Adicionar Primeira Refeição
              </button>
            </div>
          ) : (
            <>
              <div className="text-sm text-gray-600 mb-4 flex justify-between items-center">
                <span>Exibindo {refeicoes.length} refeições</span>
                {tipoSelecionado && (
                  <button 
                    onClick={() => filtrarPorTipo(null)}
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <span>Limpar filtro</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {refeicoes.map((refeicao) => (
                  <RefeicaoCard
                    key={refeicao._id}
                    refeicao={refeicao}
                    onEdit={handleEditar}
                    onDelete={handleExcluir}
                    onToggleFavorito={toggleFavorito}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12 py-8 text-center text-gray-600 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>MealTracker © {new Date().getFullYear()} - Seu app para gerenciar refeições</p>
        </div>
      </footer>
    </div>
  );
} 