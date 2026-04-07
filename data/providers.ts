export interface Provider {
  id: string;
  name: string;
  category: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
  about: string;
  experience: string;
  location: string;
  fee: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export const PROVIDERS: Provider[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    category: 'Healthcare',
    specialty: 'General Physician',
    rating: 4.9,
    reviews: 312,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    about: 'Board-certified physician with 12 years of experience in primary care and preventive medicine. Committed to providing compassionate, evidence-based care.',
    experience: '12 yrs',
    location: 'Downtown Medical Center',
    fee: '$80',
  },
  {
    id: '2',
    name: 'James Thornton',
    category: 'Fitness',
    specialty: 'Personal Trainer',
    rating: 4.8,
    reviews: 198,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    about: 'Certified personal trainer specializing in strength training, weight loss, and sports performance. Tailored programs for all fitness levels.',
    experience: '8 yrs',
    location: 'FitLife Gym, Westside',
    fee: '$60',
  },
  {
    id: '3',
    name: 'Dr. Priya Sharma',
    category: 'Wellness',
    specialty: 'Therapist & Counselor',
    rating: 4.9,
    reviews: 245,
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    about: 'Licensed therapist offering cognitive behavioral therapy and mindfulness-based stress reduction for anxiety, depression, and life transitions.',
    experience: '10 yrs',
    location: 'Harmony Wellness Center',
    fee: '$120',
  },
  {
    id: '4',
    name: 'Marcus Lee',
    category: 'Beauty',
    specialty: 'Hair Stylist',
    rating: 4.7,
    reviews: 421,
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    about: 'Award-winning stylist with expertise in modern cuts, coloring, balayage, and hair treatments. Creating looks that match your personality.',
    experience: '15 yrs',
    location: 'Studio M Salon',
    fee: '$75',
  },
  {
    id: '5',
    name: 'Dr. Elena Vasquez',
    category: 'Healthcare',
    specialty: 'Dentist',
    rating: 4.8,
    reviews: 289,
    image: 'https://randomuser.me/api/portraits/women/26.jpg',
    about: 'Cosmetic and general dentist focused on creating beautiful, healthy smiles with gentle, anxiety-free care using the latest technology.',
    experience: '9 yrs',
    location: 'Bright Smile Dental',
    fee: '$100',
  },
  {
    id: '6',
    name: 'Ryan Patel',
    category: 'Fitness',
    specialty: 'Yoga Instructor',
    rating: 4.9,
    reviews: 176,
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
    about: 'RYT-500 certified yoga instructor specializing in Vinyasa, Hatha, and restorative yoga. Classes for beginners to advanced practitioners.',
    experience: '7 yrs',
    location: 'Zen Flow Studio',
    fee: '$45',
  },
  {
    id: '7',
    name: 'Dr. Aisha Okonkwo',
    category: 'Healthcare',
    specialty: 'Dermatologist',
    rating: 4.8,
    reviews: 203,
    image: 'https://randomuser.me/api/portraits/women/90.jpg',
    about: 'Board-certified dermatologist specializing in medical and cosmetic dermatology, acne treatment, and skin rejuvenation procedures.',
    experience: '11 yrs',
    location: 'ClearSkin Clinic',
    fee: '$150',
  },
  {
    id: '8',
    name: 'Sophie Laurent',
    category: 'Beauty',
    specialty: 'Makeup Artist',
    rating: 4.7,
    reviews: 334,
    image: 'https://randomuser.me/api/portraits/women/55.jpg',
    about: 'Professional makeup artist for weddings, events, and editorial shoots. Specializing in natural glam and airbrush techniques.',
    experience: '6 yrs',
    location: 'Glow Studio',
    fee: '$90',
  },
];

export const CATEGORIES = ['All', 'Healthcare', 'Fitness', 'Wellness', 'Beauty'];

export const CATEGORY_ICONS: Record<string, string> = {
  All: 'apps',
  Healthcare: 'medical-bag',
  Fitness: 'dumbbell',
  Wellness: 'brain',
  Beauty: 'shimmer',
};

export const TIME_SLOTS: TimeSlot[] = [
  { id: '1',  time: '09:00 AM', available: true },
  { id: '2',  time: '09:30 AM', available: true },
  { id: '3',  time: '10:00 AM', available: false },
  { id: '4',  time: '10:30 AM', available: true },
  { id: '5',  time: '11:00 AM', available: true },
  { id: '6',  time: '11:30 AM', available: false },
  { id: '7',  time: '02:00 PM', available: true },
  { id: '8',  time: '02:30 PM', available: true },
  { id: '9',  time: '03:00 PM', available: true },
  { id: '10', time: '03:30 PM', available: false },
  { id: '11', time: '04:00 PM', available: true },
  { id: '12', time: '04:30 PM', available: true },
];
