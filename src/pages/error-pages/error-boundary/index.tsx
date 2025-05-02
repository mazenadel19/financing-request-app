import { Component, ErrorInfo, ReactNode } from 'react'
// constants
import { CONSTANTS } from '@/constants'

interface ErrorBoundaryProps {
    children: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
    error: Error | null
    errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    static getDerivedStateFromError(): Partial<ErrorBoundaryState> {
        return { hasError: true }
    }

    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('Error caught by Error Boundary:', error, errorInfo)
        this.setState({
            error,
            errorInfo,
        })
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Something went wrong, please try again later.</h1>
                    <div
                        style={{
                            color: 'red',
                            backgroundColor: '#ffe3e3',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid red',
                        }}
                    >
                        {!CONSTANTS.isProduction && this.state.error && this.state.errorInfo && (
                            <code
                                dir="ltr"
                                style={{
                                    whiteSpace: 'pre-wrap',
                                    marginInline: '20px',
                                    textAlign: 'left',
                                }}
                            >
                                {this.state.error.toString()}
                                <br />
                                {this.state.errorInfo.componentStack}
                            </code>
                        )}
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
