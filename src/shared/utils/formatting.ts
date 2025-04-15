export function formatarCalorias(calorias: number): string {
  return `${calorias} kcal`;
}

export function truncarTexto(texto: string, tamanhoMaximo: number): string {
  if (texto.length <= tamanhoMaximo) {
    return texto;
  }
  return texto.substring(0, tamanhoMaximo) + '...';
}

export function formatarNomeRefeicao(nome: string): string {
  if (!nome) return '';
  return nome.charAt(0).toUpperCase() + nome.slice(1);
}

export function emojiParaTipoRefeicao(tipo: string): string {
  switch (tipo) {
    case 'Café da manhã':
      return '☕';
    case 'Almoço':
      return '🍽️';
    case 'Lanche da tarde':
      return '🥪';
    case 'Janta':
      return '🍲';
    default:
      return '🍔';
  }
}

export function corParaTipoRefeicao(tipo: string): string {
  switch (tipo) {
    case 'Café da manhã':
      return 'bg-yellow-100 border-yellow-400';
    case 'Almoço':
      return 'bg-green-100 border-green-400';
    case 'Lanche da tarde':
      return 'bg-blue-100 border-blue-400';
    case 'Janta':
      return 'bg-purple-100 border-purple-400';
    default:
      return 'bg-gray-100 border-gray-400';
  }
} 