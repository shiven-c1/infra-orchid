import React from "react";

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    // You could log to an external service here
    // console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, fontFamily: 'Inter, system-ui, Arial' }}>
          <h2 style={{ color: '#b91c1c' }}>Something went wrong</h2>
          <pre style={{ whiteSpace: 'pre-wrap', background: '#111827', color: '#e5e7eb', padding: 16, borderRadius: 8 }}>
            {this.state.error?.message}
            {this.state.error && this.state.error.stack ? '\n\n' + this.state.error.stack : ''}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
