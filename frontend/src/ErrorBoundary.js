// src/ErrorBoundary.js
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <div className="p-4 text-red-500">Something went wrong!</div>;
    return this.props.children;
  }
}