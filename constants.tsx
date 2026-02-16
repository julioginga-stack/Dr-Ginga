
import { Category, Episode, ListeningMetric } from './types';

export const MOCK_EPISODES: Episode[] = [
  {
    id: '1',
    title: 'The Art of the 5-Minute Pitch',
    host: 'Dr. Ricardo Ginga',
    duration: '18:45',
    date: '2024-05-10',
    category: Category.PITCH,
    description: 'Mastering the elevator pitch is crucial for modern entrepreneurs. We dive into the psychological triggers that make investors lean in.',
    coverImage: 'https://picsum.photos/seed/pitch1/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    isFavorite: true,
    chapters: [
      { time: '00:00', title: 'Introduction' },
      { time: '04:20', title: 'The Hook' },
      { time: '10:15', title: 'Data Visualization' },
      { time: '15:30', title: 'Closing the Deal' }
    ]
  },
  {
    id: '2',
    title: 'Digital Transformation in Legacy Companies',
    host: 'Ana Clara Mendes',
    duration: '42:10',
    date: '2024-05-08',
    category: Category.WORKSHOP,
    description: 'How to navigate the resistance to change in established corporate structures while maintaining core values.',
    coverImage: 'https://picsum.photos/seed/workshop1/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    isFavorite: false,
    chapters: [
      { time: '00:00', title: 'Initial Context' },
      { time: '12:00', title: 'Identifying Barriers' },
      { time: '30:00', title: 'Implementation Case Studies' }
    ]
  },
  {
    id: '3',
    title: 'Narrative Economics for CEOs',
    host: 'Dr. Ricardo Ginga',
    duration: '25:30',
    date: '2024-05-05',
    category: Category.STORYTELLING,
    description: 'Why stories drive markets more than math sometimes. Learn how to craft a narrative that resonates with stakeholders.',
    coverImage: 'https://picsum.photos/seed/story1/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    isFavorite: false
  },
  {
    id: '4',
    title: 'Leading Through Global Crisis',
    host: 'Marcus Aurelius',
    duration: '35:15',
    date: '2024-05-01',
    category: Category.LEADERSHIP,
    description: 'Strategies for emotional intelligence and rapid decision making during volatile market conditions.',
    coverImage: 'https://picsum.photos/seed/lead1/400/400',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    isFavorite: true
  }
];

export const MOCK_METRICS: ListeningMetric[] = [
  { day: 'Mon', minutes: 45 },
  { day: 'Tue', minutes: 30 },
  { day: 'Wed', minutes: 60 },
  { day: 'Thu', minutes: 20 },
  { day: 'Fri', minutes: 90 },
  { day: 'Sat', minutes: 15 },
  { day: 'Sun', minutes: 0 },
];
