
import { Category, Episode, ListeningMetric } from './types';

export const MOCK_EPISODES: Episode[] = [
  {
    id: 'live-1',
    title: 'Mentoria Estratégica: Q3 e Q4',
    host: 'Dr. Ricardo Ginga',
    hostAvatar: 'https://i.pravatar.cc/150?u=ginga',
    duration: 'Ao Vivo',
    date: 'Hoje',
    category: Category.LIVE,
    description: 'Sessão interactiva sobre planeamento estratégico para o segundo semestre. Participe com perguntas via áudio.',
    coverImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800',
    audioUrl: '',
    isFavorite: false,
    isLive: true
  },
  {
    id: '1',
    title: 'A Arte do Pitch de 5 Minutos',
    host: 'Dr. Ricardo Ginga',
    hostAvatar: 'https://i.pravatar.cc/150?u=ginga',
    duration: '18:45',
    date: '10 Mai 2024',
    category: Category.PITCH,
    description: 'Dominar o pitch de elevador é crucial para empreendedores modernos. Mergulhamos nos gatilhos psicológicos que atraem investidores.',
    coverImage: 'https://picsum.photos/seed/pitch1/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    isFavorite: true,
    chapters: [
      { time: '00:00', title: 'Introdução' },
      { time: '04:20', title: 'O Gancho' },
      { time: '10:15', title: 'Visualização de Dados' },
      { time: '15:30', title: 'Fechando o Negócio' }
    ]
  },
  {
    id: '2',
    title: 'Transformação Digital em Empresas Legadas',
    host: 'Ana Clara Mendes',
    hostAvatar: 'https://i.pravatar.cc/150?u=ana',
    duration: '42:10',
    date: '08 Mai 2024',
    category: Category.WORKSHOP,
    description: 'Como navegar a resistência à mudança em estruturas corporativas estabelecidas mantendo os valores centrais.',
    coverImage: 'https://picsum.photos/seed/workshop1/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    isFavorite: false,
    chapters: [
      { time: '00:00', title: 'Contexto Inicial' },
      { time: '12:00', title: 'Identificando Barreiras' },
      { time: '30:00', title: 'Casos de Implementação' }
    ]
  }
];

export const MOCK_METRICS: ListeningMetric[] = [
  { day: 'Seg', minutes: 45 },
  { day: 'Ter', minutes: 30 },
  { day: 'Qua', minutes: 60 },
  { day: 'Qui', minutes: 20 },
  { day: 'Sex', minutes: 90 },
  { day: 'Sáb', minutes: 15 },
  { day: 'Dom', minutes: 0 },
];
