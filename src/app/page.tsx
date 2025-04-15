"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [pulseButton, setPulseButton] = useState(false);

  const toggleFeature = (index: number) => {
    setActiveFeature(index === activeFeature ? -1 : index);
  };

  const handleButtonPulse = () => {
    setPulseButton(true);
    setTimeout(() => setPulseButton(false), 700);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-x-hidden">
      <main>
        <div className="relative">
          <div className="absolute inset-0 bg-[url('/img/grid.svg')] bg-center opacity-5 z-0 animate-pulse"></div>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 relative z-10">
            <div className="pt-20 pb-24 px-4 sm:px-6 lg:pt-32 lg:pb-36 lg:px-8">
              <div className="text-center relative animate-fadeIn">
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-float"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-200 rounded-full opacity-20 animate-float-delayed"></div>
                
                <h1 className="text-5xl tracking-tight font-extrabold sm:text-6xl md:text-7xl group animate-slideUp">
                  <span className="block text-gray-900 mb-2 group-hover:text-blue-900 transition-colors duration-300">Controle sua alimentação</span>
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 group-hover:from-blue-500 group-hover:to-indigo-600 transition-all duration-500 animate-gradient">com o NutriSync</span>
                </h1>
                <p className="mt-6 max-w-md mx-auto text-base text-gray-600 sm:text-lg md:mt-8 md:text-xl md:max-w-3xl leading-relaxed hover:text-gray-800 transition-colors duration-300 animate-fadeIn">
                  Registre suas refeições, acompanhe suas calorias e mantenha hábitos alimentares saudáveis.
                </p>
                <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-10 animate-slideUp" style={{ animationDelay: '0.2s' }}>
                  <div className="rounded-md shadow-lg relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <Link 
                      href="/refeicoes" 
                      className={`w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-indigo-600 transform hover:scale-110 transition-all duration-300 hover:shadow-xl md:py-5 md:text-lg md:px-10 ${pulseButton ? 'animate-pulse' : ''}`}
                      onClick={handleButtonPulse}
                      onMouseEnter={() => handleButtonPulse()}
                    >
                      <span className="mr-2">Começar Agora</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                    <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-blue-300 rounded-full opacity-0 group-hover:opacity-30 transform group-hover:scale-150 transition-all duration-500"></div>
                  </div>
                  <div className="mt-4 rounded-md shadow-md sm:mt-0 sm:ml-4 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-indigo-200 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <a 
                      href="#recursos" 
                      className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 hover:text-blue-800 transform hover:scale-110 transition-all duration-300 hover:shadow-xl md:py-5 md:text-lg md:px-10"
                    >
                      <span>Saiba Mais</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-y-1 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="recursos" className="py-16 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-100 rounded-full opacity-30 animate-float-delayed"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-100 rounded-full opacity-30 animate-float"></div>
            
            <div className="lg:text-center relative z-10 animate-slideUp">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase bg-blue-50 rounded-full px-3 py-1 inline-block mb-1 shadow-sm hover:bg-blue-100 hover:shadow-md transition-all duration-300 transform hover:scale-105 cursor-default">
                RECURSOS
              </h2>
              <p className="mt-4 text-4xl md:text-5xl leading-tight font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-indigo-600 transition-all duration-500 animate-gradient">
                Uma maneira melhor de registrar sua alimentação
              </p>
              <p className="mt-5 max-w-3xl text-xl text-gray-600 lg:mx-auto leading-relaxed hover:text-gray-800 transition-colors duration-300">
                Características que tornam o NutriSync a escolha ideal para o controle de suas refeições.
              </p>
            </div>

            <div className="mt-16 relative z-10">
              <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                <div 
                  className={`relative p-5 rounded-xl bg-white shadow-lg hover:shadow-2xl transform transition-all duration-300 flex flex-col items-center hover:bg-blue-50 cursor-pointer group ${activeFeature === 0 ? 'scale-105 bg-blue-50 shadow-xl' : 'hover:-translate-y-3'}`}
                  onClick={() => toggleFeature(0)}
                >
                  <div className={`flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md mb-1 group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300 ${activeFeature === 0 ? 'scale-110' : 'group-hover:scale-110'}`}>
                    <span className="text-2xl">📊</span>
                  </div>
                  <h3 className="mt-5 text-xl leading-6 font-bold text-gray-900 group-hover:text-blue-800 transition-colors duration-300">Dashboard Intuitivo</h3>
                  <p className="mt-3 text-base text-gray-600 text-center group-hover:text-gray-800 transition-colors duration-300">
                    Visualize suas refeições diárias e o total de calorias consumidas em um painel simples e informativo.
                  </p>
                  <div className={`mt-4 overflow-hidden transition-all duration-500 max-h-0 ${activeFeature === 0 ? 'max-h-40' : ''}`}>
                    <p className="text-blue-700 text-sm italic">
                      Toque novamente para recolher esta seção
                    </p>
                    <p className="text-gray-700 mt-2">
                      Nosso dashboard apresenta visualizações gráficas simples e estatísticas rápidas que ajudam a entender seus padrões alimentares.
                    </p>
                  </div>
                </div>

                <div 
                  className={`relative p-5 rounded-xl bg-white shadow-lg hover:shadow-2xl transform transition-all duration-300 flex flex-col items-center hover:bg-blue-50 cursor-pointer group ${activeFeature === 1 ? 'scale-105 bg-blue-50 shadow-xl' : 'hover:-translate-y-3'}`}
                  onClick={() => toggleFeature(1)}
                >
                  <div className={`flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md mb-1 group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300 ${activeFeature === 1 ? 'scale-110' : 'group-hover:scale-110'}`}>
                    <span className="text-2xl">🍽️</span>
                  </div>
                  <h3 className="mt-5 text-xl leading-6 font-bold text-gray-900 group-hover:text-blue-800 transition-colors duration-300">Classificação por Tipo</h3>
                  <p className="mt-3 text-base text-gray-600 text-center group-hover:text-gray-800 transition-colors duration-300">
                    Categorize suas refeições como café da manhã, almoço, lanche ou jantar e mantenha tudo organizado.
                  </p>
                  <div className={`mt-4 overflow-hidden transition-all duration-500 max-h-0 ${activeFeature === 1 ? 'max-h-40' : ''}`}>
                    <p className="text-blue-700 text-sm italic">
                      Toque novamente para recolher esta seção
                    </p>
                    <p className="text-gray-700 mt-2">
                      Cada tipo de refeição tem cores e ícones distintos, facilitando a identificação visual rápida ao consultar seu histórico.
                    </p>
                  </div>
                </div>

                <div 
                  className={`relative p-5 rounded-xl bg-white shadow-lg hover:shadow-2xl transform transition-all duration-300 flex flex-col items-center hover:bg-blue-50 cursor-pointer group ${activeFeature === 2 ? 'scale-105 bg-blue-50 shadow-xl' : 'hover:-translate-y-3'}`}
                  onClick={() => toggleFeature(2)}
                >
                  <div className={`flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md mb-1 group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300 ${activeFeature === 2 ? 'scale-110' : 'group-hover:scale-110'}`}>
                    <span className="text-2xl">⭐</span>
                  </div>
                  <h3 className="mt-5 text-xl leading-6 font-bold text-gray-900 group-hover:text-blue-800 transition-colors duration-300">Refeições Favoritas</h3>
                  <p className="mt-3 text-base text-gray-600 text-center group-hover:text-gray-800 transition-colors duration-300">
                    Marque suas refeições favoritas para encontrá-las facilmente quando precisar.
                  </p>
                  <div className={`mt-4 overflow-hidden transition-all duration-500 max-h-0 ${activeFeature === 2 ? 'max-h-40' : ''}`}>
                    <p className="text-blue-700 text-sm italic">
                      Toque novamente para recolher esta seção
                    </p>
                    <p className="text-gray-700 mt-2">
                      O sistema de favoritos permite criar uma biblioteca pessoal de refeições que você costuma repetir, simplificando o registro.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-indigo-800 transition-all duration-500 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/img/grid.svg')] bg-center opacity-5 animate-pulse"></div>
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between relative z-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block animate-slideUp" style={{ animationDelay: '0.1s' }}>Pronto para começar?</span>
              <span className="block text-blue-200 hover:text-white transition-colors duration-300 animate-slideUp" style={{ animationDelay: '0.2s' }}>Comece a registrar suas refeições hoje.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0 animate-slideUp" style={{ animationDelay: '0.3s' }}>
              <div className="inline-flex rounded-md shadow hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-200 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Link 
                  href="/refeicoes" 
                  className="inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 hover:text-blue-800 transition-all duration-300 shadow-lg transform hover:scale-110"
                  onClick={handleButtonPulse}
                >
                  <span className="relative z-10">Começar Agora</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 relative z-10 transform group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-300 rounded-full opacity-0 group-hover:opacity-40 transform group-hover:scale-150 transition-all duration-500"></div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-b from-white to-blue-50 border-t border-blue-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 mb-8 hover:from-blue-500 hover:to-indigo-600 transition-all duration-500 cursor-pointer animate-pulse transform hover:scale-110 hover:rotate-1">
              NutriSync
            </span>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 w-full max-w-2xl">
              <a href="#" className="text-center group">
                <div className="flex justify-center">
                  <div className="text-gray-500 hover:text-blue-600 transition-colors duration-300 transform group-hover:scale-110 relative px-3 py-2 overflow-hidden">
                    <span className="relative z-10">Sobre nós</span>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></div>
                  </div>
                </div>
              </a>
              <a href="#" className="text-center group">
                <div className="flex justify-center">
                  <div className="text-gray-500 hover:text-blue-600 transition-colors duration-300 transform group-hover:scale-110 relative px-3 py-2 overflow-hidden">
                    <span className="relative z-10">Termos de uso</span>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></div>
                  </div>
                </div>
              </a>
              <a href="#" className="text-center group">
                <div className="flex justify-center">
                  <div className="text-gray-500 hover:text-blue-600 transition-colors duration-300 transform group-hover:scale-110 relative px-3 py-2 overflow-hidden">
                    <span className="relative z-10">Política de privacidade</span>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></div>
                  </div>
                </div>
              </a>
              <a href="#" className="text-center group">
                <div className="flex justify-center">
                  <div className="text-gray-500 hover:text-blue-600 transition-colors duration-300 transform group-hover:scale-110 relative px-3 py-2 overflow-hidden">
                    <span className="relative z-10">Contato</span>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></div>
                  </div>
                </div>
              </a>
            </div>
            
            <div className="flex justify-center space-x-8 mb-8">
              <a href="#" className="group relative transform transition duration-300 hover:scale-125">
                <div className="absolute inset-0 bg-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 scale-110"></div>
                <div className="relative flex items-center justify-center h-12 w-12 rounded-full bg-gray-50 shadow-inner group-hover:shadow-md transition-all duration-300">
                  <svg className="h-6 w-6 text-[#1877F2] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 text-xs text-blue-500 left-1/2 transform -translate-x-1/2 whitespace-nowrap">Facebook</span>
              </a>
              <a href="#" className="group relative transform transition duration-300 hover:scale-125">
                <div className="absolute inset-0 bg-pink-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 scale-110"></div>
                <div className="relative flex items-center justify-center h-12 w-12 rounded-full bg-gray-50 shadow-inner group-hover:shadow-md transition-all duration-300">
                  <svg className="h-6 w-6 text-[#E4405F] transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 text-xs text-pink-500 left-1/2 transform -translate-x-1/2 whitespace-nowrap">Instagram</span>
              </a>
              <a href="#" className="group relative transform transition duration-300 hover:scale-125">
                <div className="absolute inset-0 bg-black rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 scale-110"></div>
                <div className="relative flex items-center justify-center h-12 w-12 rounded-full bg-gray-50 shadow-inner group-hover:shadow-md transition-all duration-300">
                  <svg className="h-6 w-6 text-black transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2 text-xs text-black left-1/2 transform -translate-x-1/2 whitespace-nowrap">X</span>
              </a>
            </div>
            
            <div className="relative w-full max-w-4xl mx-auto mt-2 overflow-hidden h-px bg-gradient-to-r from-transparent via-blue-100 to-transparent"></div>
            
            <div className="mt-6 relative group cursor-pointer" id="footerCopyright">
              <p className="text-center text-base text-gray-500 transition-all duration-300 transform group-hover:scale-105 group-hover:text-blue-600">
                © 2024 NutriSync. Todos os direitos reservados.
              </p>
              <div className="heart-animation absolute opacity-0 -top-4 left-1/2 transform -translate-x-1/2 text-red-500 text-lg">❤️</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = `
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes slideUp {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes float {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

@keyframes floatDelayed {
  0% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 1s ease-out forwards;
}

.animate-slideUp {
  animation: slideUp 0.8s ease-out forwards;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: floatDelayed 8s ease-in-out infinite;
}
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = styles + `
    @keyframes heartBeat {
      0% { transform: translateY(0) scale(0); opacity: 0; }
      50% { transform: translateY(-20px) scale(1.5); opacity: 1; }
      100% { transform: translateY(-40px) scale(1); opacity: 0; }
    }
    
    .heart-animation {
      animation: heartBeat 1s ease-out forwards;
    }
  `;
  document.head.appendChild(styleSheet);
  
  // Adicionar interação para o copyright no rodapé
  setTimeout(() => {
    const copyright = document.getElementById('footerCopyright');
    if (copyright) {
      copyright.addEventListener('click', () => {
        const heart = copyright.querySelector('.heart-animation');
        if (heart) {
          heart.classList.remove('heart-animation');
          void (heart as HTMLElement).offsetWidth; // Força reflow com type casting
          heart.classList.add('heart-animation');
        }
      });
    }
  }, 1000);
}
