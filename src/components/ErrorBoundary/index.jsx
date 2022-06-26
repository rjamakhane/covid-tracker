import React from 'react';

class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        }
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true
        }
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
    }

    render() {
        const { hasError } = this.state;
        if (hasError) {
            return (
                <div className="errorMessage" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                }}>
                    <h2 data-testid="errorMessage">There is an issue. Please try again after some time!</h2>
                </div>
            )
        } else {
            return this.props.children
        }
    }
}

export default ErrorBoundary;