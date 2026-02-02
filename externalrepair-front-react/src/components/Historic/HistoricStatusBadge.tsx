import React from 'react';
import { StatusBadge } from './styles';

interface Props {
  status: string;
}

const HistoricStatusBadge = ({ status }: Props) => (
  <StatusBadge complete={status === 'Completo'}>{status}</StatusBadge>
);

export default HistoricStatusBadge;
