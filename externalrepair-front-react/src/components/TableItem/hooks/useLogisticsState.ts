export const useLogisticsState = (status: string) => {
  const isCompleted = status === 'completed';
  const isNone = status === 'none';

  return {
    isCompleted,
    isNone,
    canEdit: !isCompleted,
    showOnlyView: isCompleted,
  };
};
