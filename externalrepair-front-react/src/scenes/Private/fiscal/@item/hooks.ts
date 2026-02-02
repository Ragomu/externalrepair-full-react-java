import { useStore } from '~/stores';

export const useFiscalData = () => {
  const { fiscalStore } = useStore();

  const transformedData = fiscalStore.fiscalNfItems
    ? fiscalStore.fiscalNfItems.items.map((item) => ({
        request: item.request,
        material: item.material,
        quantity: item.quantity,
        description: item.description,
        totalPrice: item.totalPrice,
        shippingDate: item.date,
        dimensions: item.dimensions,
        label: item.label,
      }))
    : [];

  return { fiscalStore, transformedData };
};

export const useFormatters = () => {
  const formatCurrency = (value: any): string => {
    if (!value || (typeof value === 'number' && isNaN(value))) return '';
    if (typeof value === 'number') {
      return `R$ ${value.toFixed(2).replace('.', ',')}`;
    }
    return value.toString();
  };

  const formatters: ((value: any) => string | React.ReactNode)[] = [
    (value: any) => value?.toString() || '', // request
    (value: any) => value?.toString() || '', // material
    (value: any) => value?.toString() || '', // quantity
    (value: any) => value?.toString() || '', // description
    (value: any) => value?.toString() || '', // dimensions
    (value: any) => value?.toString() || '', // label
    formatCurrency, // totalPrice
    (value: any) => value?.toString() || '', // shippingDate
  ];

  return { formatters };
};
