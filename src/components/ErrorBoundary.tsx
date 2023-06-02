/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { Component, ElementType, ReactNode } from "react";

export interface IErrorProps {
  error: Error | undefined;
  onClear: () => void;
}

export type Props = {
  onError: ElementType<IErrorProps>;
  children?: ReactNode; // include children
};

interface IState {
  error: Error | undefined;
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, IState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: undefined,
      hasError: false,
    };
    this.handleClear = this.handleClear.bind(this);
  }

  public componentDidCatch(error: Error) {
    this.setState({
      error,
      hasError: true,
    });
  }

  public render() {
    const ErrorView = this.props.onError;
    if (this.state.hasError) {
      return <ErrorView error={this.state.error} onClear={this.handleClear} />;
    }
    return this.props.children;
  }

  private handleClear() {
    this.setState({
      error: undefined,
      hasError: false,
    });
  }
}
export default ErrorBoundary;
