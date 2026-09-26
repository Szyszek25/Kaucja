import React, { createContext, useContext, useMemo, useState } from 'react';

type ContainerType = 'PET' | 'CAN' | 'GLASS';

export type Refund = {
  id: string;
  createdAt: string;
  pointName: string;
  operator: string;
  counts: Record<ContainerType, number>;
  amount: number;
  status: 'paid' | 'processing';
};

type WalletContextValue = {
  balance: number;
  lifetime: number;
  refunds: Refund[];
  addRefund: (refund: Omit<Refund, 'id' | 'createdAt'>) => Refund;
};

const seed: Refund[] = [
  {
    id: 'seed-1',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    pointName: 'Kaucjomat Wola Park',
    operator: 'Demo Operator',
    counts: { PET: 6, CAN: 4, GLASS: 0 },
    amount: 5,
    status: 'paid'
  }
];

const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [refunds, setRefunds] = useState(seed);

  const addRefund: WalletContextValue['addRefund'] = (input) => {
    const refund: Refund = {
      ...input,
      id: `refund-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setRefunds((current) => [refund, ...current]);
    return refund;
  };

  const value = useMemo(() => {
    const paid = refunds.filter((item) => item.status === 'paid');
    const balance = paid.reduce((sum, item) => sum + item.amount, 0);
    const lifetime = refunds.reduce((sum, item) => sum + item.amount, 0);
    return { balance, lifetime, refunds, addRefund };
  }, [refunds]);

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used inside WalletProvider');
  return context;
}
