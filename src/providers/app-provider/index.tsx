// MUI
import { theme } from '@/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
// components
import ErrorBoundary from '@/pages/error-pages/error-boundary'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
interface IAppProvider {
    children: React.ReactNode
}

export const AppProvider = ({ children }: IAppProvider) => (
    <ErrorBoundary>
        <ToastContainer position="top-center" autoClose={4000} />
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    </ErrorBoundary>
)
