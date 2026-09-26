export type ReturnPoint = {
  id: string;
  name: string;
  address: string;
  operator: string;
  distanceKm: number;
  types: string[];
  status: 'online' | 'busy';
};

export const returnPoints: ReturnPoint[] = [
  { id: 'rvm-001', name: 'Kaucjomat Wola Park', address: 'Górczewska 124, Warszawa', operator: 'Demo Operator', distanceKm: 0.8, types: ['PET', 'Puszki'], status: 'online' },
  { id: 'rvm-002', name: 'Punkt zwrotu Młynów', address: 'Płocka 17, Warszawa', operator: 'Demo Operator', distanceKm: 1.4, types: ['PET', 'Puszki', 'Szkło'], status: 'online' },
  { id: 'rvm-003', name: 'Kaucjomat Rondo Daszyńskiego', address: 'Towarowa 22, Warszawa', operator: 'Partner RVM', distanceKm: 2.1, types: ['PET', 'Puszki'], status: 'busy' }
];
