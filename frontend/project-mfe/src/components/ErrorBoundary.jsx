import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    //runs when the class instance is created

    super(props);
    // because ErrorBoundary extends React.Component , super() calls the parent class React.component constructor this must happen using thius in the constructor

    // this refers to the current instance of ErrorBoundary
    console.log(this.props);
    console.log(this.state);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error caught by ErrorBoundary", error);
    console.log("Error information", errorInfo);
  }
  // This is another Error Boundary lifecycle method.
  // /React calls it after a descendant error has been caught.

  // constructor  is a is a javascript  class method that runs when an object is created

  // props contains value passed from partent
  render() {
    if (this.state.hasError) {
      return <h1>Some thing went wrong in Project MFE.</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
