// MUI
import { theme } from '@/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
// components
import ErrorBoundary from '@/pages/error-pages/error-boundary'

interface IAppProvider {
    children: React.ReactNode
}

export const AppProvider = ({ children }: IAppProvider) => (
    <ErrorBoundary>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    </ErrorBoundary>
)
