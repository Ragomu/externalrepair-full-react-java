import React from 'react';
import { isHydrated } from 'mobx-persist-store';
import { observer } from 'mobx-react-lite';
import { useStore } from '~/stores';

interface LoadingBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const LoadingBoundary: React.FC<LoadingBoundaryProps> = ({
  children,
  fallback,
}) => {
  const { userStore, settingsStore, historyStore } = useStore();

  // Verificar se os stores críticos estão hidratados
  const isUserHydrated = isHydrated(userStore);
  const isSettingsHydrated = isHydrated(settingsStore);
  const isHistoryHydrated = isHydrated(historyStore);

  const allHydrated = isUserHydrated && isSettingsHydrated && isHistoryHydrated;

  if (!allHydrated) {
    return (
      fallback || (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div>Carregando configurações...</div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            {!isUserHydrated && '• Dados do usuário'}
            <br />
            {!isSettingsHydrated && '• Configurações'}
            <br />
            {!isHistoryHydrated && '• Histórico'}
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
};

export default observer(LoadingBoundary);
