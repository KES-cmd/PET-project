// Цвета для палитры
export const themeColors = [
  { name: 'Фиолетовый', value: '#6c33ce' },
  { name: 'Розовый неон', value: '#ce4388' },
  { name: 'Океан', value: '#06b6d4' },
  { name: 'Лайм', value: '#84cc16' },
];

// Получить градиент для хедера и меню
export const getHeaderGradient = (color: string): string => {
  const gradients: Record<string, string> = {
    '#6c33ce': 'linear-gradient(135deg, #4c1d95, #7c3aed, #db2777)',
    '#ce4388': 'linear-gradient(135deg, #be185d, #ec4899, #f97316)',
    '#06b6d4': 'linear-gradient(135deg, #0e7490, #06b6d4, #10b981)',
    '#84cc16': 'linear-gradient(135deg, #4d7c0f, #84cc16, #22d3ee)',
  };
  return gradients[color] || gradients['#6c33ce'];
};

// Получить градиент для кнопок
export const getButtonGradient = (color: string): string => {
  const gradients: Record<string, string> = {
    '#6c33ce': 'from-purple-500 via-pink-500 to-purple-500',
    '#ce4388': 'from-pink-500 via-rose-500 to-pink-500',
    '#06b6d4': 'from-cyan-500 via-blue-500 to-cyan-500',
    '#84cc16': 'from-lime-500 via-emerald-500 to-lime-500',
  };
  return gradients[color] || gradients['#6c33ce'];
};

// Получить цвет свечения для кнопки
export const getButtonGlow = (color: string): string => {
  const glows: Record<string, string> = {
    '#6c33ce': 'rgba(139,92,246,0.5)',
    '#ce4388': 'rgba(236,72,153,0.5)',
    '#06b6d4': 'rgba(6,182,212,0.5)',
    '#84cc16': 'rgba(132,204,22,0.5)',
  };
  return glows[color] || glows['#6c33ce'];
};

// Получить градиент для слова "дизайнерские"
export const getWordGradient = (color: string): string => {
  const gradients: Record<string, string> = {
    '#6c33ce': 'from-purple-400 via-pink-400 to-blue-400',
    '#ce4388': 'from-pink-400 via-rose-400 to-orange-400',
    '#06b6d4': 'from-cyan-400 via-blue-400 to-emerald-400',
    '#84cc16': 'from-lime-400 via-emerald-400 to-cyan-400',
  };
  return gradients[color] || gradients['#6c33ce'];
};

// Получить градиент для прогресс-бара
export const getProgressGradient = (color: string): string => {
  const gradients: Record<string, string> = {
    '#6c33ce': 'url(#purpleGradient)',
    '#ce4388': 'url(#pinkGradient)',
    '#06b6d4': 'url(#cyanGradient)',
    '#84cc16': 'url(#limeGradient)',
  };
  return gradients[color] || gradients['#6c33ce'];
};

// Получить цвет для курсора (при наведении)
export const getCursorColor = (color: string): string => {
  const colors: Record<string, string> = {
    '#6c33ce': '#7c3aed',
    '#ce4388': '#ec4899',
    '#06b6d4': '#06b6d4',
    '#84cc16': '#84cc16',
  };
  return colors[color] || colors['#6c33ce'];
};

//  Получить цвет свечения для курсора
export const getCursorGlow = (color: string): string => {
  const glows: Record<string, string> = {
    '#6c33ce': 'rgba(139,92,246,0.5)',
    '#ce4388': 'rgba(236,72,153,0.5)',
    '#06b6d4': 'rgba(6,182,212,0.5)',
    '#84cc16': 'rgba(132,204,22,0.5)',
  };
  return glows[color] || glows['#6c33ce'];
};

export const getScrollbarColor = (color: string): string => {
  const colors: Record<string, string> = {
    '#6c33ce': '#6d28d9',
    '#ce4388': '#db2777',
    '#06b6d4': '#0891b2',
    '#84cc16': '#65a30d',
  };
  return colors[color] || colors['#6c33ce'];
};