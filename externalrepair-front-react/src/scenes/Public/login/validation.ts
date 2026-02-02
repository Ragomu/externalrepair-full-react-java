import * as FormValidator from 'yup';

export default FormValidator.object().shape({
  email: FormValidator.string()
    .required('E-mail obrigatório')
    .email('Ops, esse e-mail parece estar errado!'),
  password: FormValidator.string().required('Por favor, insira uma senha'),
});
