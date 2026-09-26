export type ReturnPoint = {
  id: string;
  name: string;
  brand: string;
  address: string;
  city: string;
  operator: string;
  distanceKm: number;
  types: string[];
  status: 'online' | 'busy';
  integration: 'demo' | 'planned';
};

export const returnPoints: ReturnPoint[] = [
  {
    id: 'rvm-001',
    name: 'Biedronka — Górczewska',
    brand: 'Biedronka',
    address: 'Górczewska 15',
    city: 'Warszawa',
    operator: 'System kaucyjny',
    distanceKm: 0.7,
    types: ['PET', 'Puszki', 'Szkło'],
    status: 'online',
    integration: 'demo'
  },
  {
    id: 'rvm-002',
    name: 'Lidl — Wolska',
    brand: 'Lidl',
    address: 'Wolska 19/25',
    city: 'Warszawa',
    operator: 'Integracja demo',
    distanceKm: 1.2,
    types: ['PET', 'Puszki'],
    status: 'online',
    integration: 'planned'
  },
  {
    id: 'rvm-003',
    name: 'Biedronka — Obozowa',
    brand: 'Biedronka',
    address: 'Obozowa 16',
    city: 'Warszawa',
    operator: 'Integracja demo',
    distanceKm: 1.6,
    types: ['PET', 'Puszki'],
    status: 'online',
    integration: 'planned'
  },
  {
    id: 'rvm-004',
    name: 'Carrefour Market — Góralska',
    brand: 'Carrefour',
    address: 'Góralska 7',
    city: 'Warszawa',
    operator: 'Integracja demo',
    distanceKm: 1.9,
    types: ['PET', 'Puszki'],
    status: 'busy',
    integration: 'planned'
  },
  {
    id: 'rvm-005',
    name: 'Biedronka — Jana Kazimierza',
    brand: 'Biedronka',
    address: 'Jana Kazimierza 12',
    city: 'Warszawa',
    operator: 'Integracja demo',
    distanceKm: 2.3,
    types: ['PET', 'Puszki'],
    status: 'online',
    integration: 'planned'
  },
  {
    id: 'rvm-006',
    name: 'Carrefour — Arkadia',
    brand: 'Carrefour',
    address: 'al. Jana Pawła II 82',
    city: 'Warszawa',
    operator: 'Integracja demo',
    distanceKm: 3.1,
    types: ['PET', 'Puszki', 'Szkło'],
    status: 'online',
    integration: 'planned'
  }
];
