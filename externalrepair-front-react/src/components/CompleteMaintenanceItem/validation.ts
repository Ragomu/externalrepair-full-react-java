import moment from 'moment';
import * as yup from 'yup';

export const maintenanceValidationSchema = yup.object().shape({
  returnDate: yup
    .string()
    .required('Data de retorno é obrigatória')
    .test('valid-date', 'Data inválida', function (value) {
      if (!value) return false;
      const momentDate = moment(value, 'YYYY-MM-DD', true);
      return momentDate.isValid();
    })
    .test(
      'not-future',
      'Data de retorno não pode ser futura',
      function (value) {
        if (!value) return true; // Se não tem valor, deixa o required handle
        const momentDate = moment(value, 'YYYY-MM-DD');
        return momentDate.isSameOrBefore(moment(), 'day');
      },
    ),

  returnNf: yup
    .string()
    .required('NF-e de retorno é obrigatória')
    .matches(/^\d+$/, 'NF-e deve conter apenas números')
    .min(1, 'NF-e deve ter pelo menos 1 dígito'),

  pdfFile: yup
    .mixed()
    .required('PDF é obrigatório')
    .test('fileSize', 'Arquivo muito grande (máximo 10MB)', function (value) {
      if (!value) return true; // Se não tem arquivo, deixa o required handle
      return (value as File).size <= 10 * 1024 * 1024; // 10MB
    })
    .test('fileType', 'Apenas arquivos PDF são permitidos', function (value) {
      if (!value) return true; // Se não tem arquivo, deixa o required handle
      return (value as File).type === 'application/pdf';
    }),
});

export type MaintenanceFormValues = {
  returnDate: string;
  returnNf: string;
  pdfFile: File | null;
};
