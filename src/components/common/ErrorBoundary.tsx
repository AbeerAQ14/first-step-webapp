'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';


interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      // Render fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-secondary-light">
          <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-tajawal font-bold text-accent-primary mb-2">
              عذراً، حدث خطأ غير متوقع
            </h2>
            <p className="text-gray-600 mb-6">
              نعتذر عن الإزعاج. يبدو أن هناك مشكلة في تحميل هذه الصفحة.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-right text-sm text-gray-500">
                <summary className="cursor-pointer mb-2">تفاصيل الخطأ</summary>
                <pre className="bg-gray-100 p-3 rounded text-right overflow-auto">
                  {this.state.error.toString()}
                  <br />
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={this.handleReset}
                className="px-6 py-2 bg-primary-light text-white rounded-lg font-tajawal font-medium hover:bg-primary-dark transition-colors"
              >
                إعادة المحاولة
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-tajawal font-medium hover:bg-gray-50 transition-colors"
              >
                العودة للصفحة الرئيسية
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
