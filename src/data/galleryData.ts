export interface GalleryItem {
  id: number;
  title: string;
  description: string;
  image: string; // URL или путь к картинке
  gradient: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: 'Проект 1',
    description: 'Интерактивный лендинг с 3D-эффектами',
    image: 'https://picsum.photos/seed/1/600/400',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 2,
    title: 'Проект 2',
    description: 'Дашборд для аналитики с анимациями',
    image: 'https://picsum.photos/seed/2/600/400',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    id: 3,
    title: 'Проект 3',
    description: 'E-commerce сайт с микро-интеракциями',
    image: 'https://picsum.photos/seed/3/600/400',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    id: 4,
    title: 'Проект 4',
    description: 'Портфолио с нестандартной навигацией',
    image: 'https://picsum.photos/seed/4/600/400',
    gradient: 'from-emerald-500 to-teal-400',
  },
  {
    id: 5,
    title: 'Проект 5',
    description: 'Креативная страница с параллакс-эффектом',
    image: 'https://picsum.photos/seed/5/600/400',
    gradient: 'from-rose-500 to-red-400',
  },
];