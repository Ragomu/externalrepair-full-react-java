const defaultErrorMessage =
  'Erro inesperado. Verifique sua internet e tente novamente.';

export default class ResponseError {
  message = '';

  code = 0;

  constructor(error: any) {
    if (error?.response) {
      this.message =
        error.response.data?.message ||
        this.getErrorMessageByStatus(error.response.status);
      this.code = error.response.status;
    } else if (error?.request) {
      this.message =
        'Não foi possível conectar ao servidor. Verifique sua conexão.';
      this.code = 0;
    } else {
      this.message = error?.message || defaultErrorMessage;
      this.code = 0;
    }
  }

  private getErrorMessageByStatus(status: number): string {
    switch (status) {
      case 400:
        return 'Requisição inválida. Verifique os dados enviados.';
      case 401:
        return 'E-mail ou senha incorretos!.';
      case 403:
        return 'Acesso negado. Você não tem permissão para acessar este recurso.';
      case 404:
        return 'Recurso não encontrado.';
      case 405:
        return 'Método não permitido.';
      case 500:
        return 'Erro interno do servidor. Tente novamente mais tarde.';
      default:
        return defaultErrorMessage;
    }
  }
}
