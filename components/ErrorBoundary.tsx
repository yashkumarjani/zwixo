// FILE: components/ErrorBoundary.tsx
"use client";

import React, { Component, ReactNode } from "react";

export interface ErrorBoundaryProps {
  children: ReactNode;
  sectionName?: string;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  public override componentDidCatch() {
    // Under normal circumstances, error reporting would go here.
  }

  public override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="w-full py-16 px-6 text-center bg-gray-light dark:bg-gray-dark/20 rounded-[32px] border border-gray-100 dark:border-gray-800/80 my-4 max-w-5xl mx-auto">
          <h3 className="text-clamp-xl font-black text-ink dark:text-white mb-2">Something went wrong</h3>
          <p className="text-clamp-sm font-semibold text-gray-500 dark:text-gray-400">
            We encountered an error loading the {this.props.sectionName || "section"}. Please try refreshing the page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
