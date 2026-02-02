export const useWarehouseState = (warehouseStatus: string) => {
  const isFinished = warehouseStatus === 'finished';
  const isNone = warehouseStatus === 'none';

  return {
    isFinished,
    isNone,
    canEdit: !isFinished,
    showOnlyView: isFinished,
  };
};
