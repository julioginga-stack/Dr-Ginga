
export enum Category {
  PITCH = 'Pitch para Investidores',
  WORKSHOP = 'Workshops Institucionais',
  STORYTELLING = 'Storytelling Corporativo',
  LEADERSHIP = 'Liderança Executiva',
  LIVE = 'Transmissão em Directo'
}

export interface Episode {
  id: string;
  title: string;
  host: string;
  hostAvatar: string;
  duration: string;
  date: string;
  category: Category;
  description: string;
  coverImage: string;
  audioUrl: string;
  isFavorite: boolean;
  isLive?: boolean;
  chapters?: { time: string; title: string }[];
  transcript?: string;
}

export interface ListeningMetric {
  day: string;
  minutes: number;
}
