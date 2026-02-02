import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorContainer, ErrorMessage } from './styles';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
  }

  public render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <ErrorContainer>
          <ErrorMessage>
            Oops! Algo deu errado. Por favor, recarregue a página ou tente
            novamente mais tarde.
          </ErrorMessage>
        </ErrorContainer>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
