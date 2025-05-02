// MUI
import { Box, Toolbar } from '@mui/material'
// React-Router
import { Outlet } from 'react-router-dom'
// Components
import { Header } from '@/components'
// Error Boundary
import ErrorBoundary from '@/pages/error-pages/error-boundary'

const AppLayout = () => (
    <Box sx={{ display: 'flex', height: '100vh' }}>
        <Header />
        <Box component="main" sx={{ p: 3, display: 'flex', flexDirection: 'column', flex: 1 }}>
            <Toolbar />
            <ErrorBoundary>
                <Outlet />
            </ErrorBoundary>
        </Box>
    </Box>
)

export default AppLayout
