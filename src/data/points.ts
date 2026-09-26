export type ReturnPoint = {
  id: string;
  name: string;
  brand: string;
  address: string;
  city: string;
  operator: string;
  distanceKm: number;
  latitude: number;
  longitude: number;
  types: string[];
  status: 'online' | 'busy';
  integration: 'demo' | 'planned';
};

export const returnPoints: ReturnPoint[] = [
  {
    id: 'rvm-001',
    name: 'Lidl — Wolska',
    brand: 'Lidl',
    address: 'Wolska 19/25',
    city: 'Warszawa',
    operator: 'Integracja demo',
    distanceKm: 1.2,
    latitude: 52.235088077901,
    longitude: 20.976182515913585,
    types: ['PET', 'Puszki'],
    status: 'online',
    integration: 'planned'
  },
  {
    id: 'rvm-002',
    name: 'Carrefour — Góralska',
    brand: 'Carrefour',
    address: 'Góralska 7',
    city: 'Warszawa',
    operator: 'Integracja demo',
    distanceKm: 1.9,
    latitude: 52.2389317,
    longitude: 20.9378533,
    types: ['PET', 'Puszki'],
    status: 'online',
    integration: 'planned'
  },
  {
    id: 'rvm-003',
    name: 'Biedronka — Jana Kazimierza',
    brand: 'Biedronka',
    address: 'Jana Kazimierza 62',
    city: 'Warszawa',
    operator: 'Integracja demo',
    distanceKm: 2.3,
    latitude: 52.222067946015166,
    longitude: 20.934931244825922,
    types: ['PET', 'Puszki'],
    status: 'online',
    integration: 'planned'
  },
  {
    id: 'rvm-004',
    name: 'Biedronka — Jana Olbrachta',
    brand: 'Biedronka',
    address: 'Jana Olbrachta 46',
    city: 'Warszawa',
    operator: 'Integracja demo',
    distanceKm: 2.5,
    latitude: 52.2355252,
    longitude: 20.9374052,
    types: ['PET', 'Puszki'],
    status: 'online',
    integration: 'planned'
  },
  {
    id: 'rvm-005',
    name: 'Biedronka — Leszno',
    brand: 'Biedronka',
    address: 'Leszno 15',
    city: 'Warszawa',
    operator: 'Integracja demo',
    distanceKm: 2.7,
    latitude: 52.23757591721888,
    longitude: 20.97577940497239,
    types: ['PET', 'Puszki'],
    status: 'online',
    integration: 'planned'
  },
  {
    id: 'rvm-006',
    name: 'Biedronka — Obozowa',
    brand: 'Biedronka',
    address: 'Obozowa 16',
    city: 'Warszawa',
    operator: 'Integracja demo',
    distanceKm: 2.9,
    latitude: 52.244617127293985,
    longitude: 20.966228151798067,
    types: ['PET', 'Puszki'],
    status: 'busy',
    integration: 'planned'
  },
  {
    id: 'rvm-007',
    name: 'Kaufland — Górczewska',
    brand: 'Kaufland',
    address: 'Górczewska 218',
    city: 'Warszawa',
    operator: 'Integracja demo',
    distanceKm: 3.0,
    latitude: 52.2401527,
    longitude: 20.9051948,
    types: ['PET', 'Puszki'],
    status: 'online',
    integration: 'planned'
  },
  {
    id: 'rvm-008',
    name: 'Auchan — Wola Park',
    brand: 'Auchan',
    address: 'Górczewska 124',
    city: 'Warszawa',
    operator: 'Integracja demo',
    distanceKm: 3.2,
    latitude: 52.24292025225239,
    longitude: 20.93114092149381,
    types: ['PET', 'Puszki'],
    status: 'online',
    integration: 'planned'
  }
];
