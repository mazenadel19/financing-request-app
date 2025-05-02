import { Suspense } from 'react'
// MUI
import { Stack } from '@mui/material'
// Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// Routes
import { Routes } from './routes'

export const AppRoutes = () => {
    const router = createBrowserRouter([...Routes])
    return (
        <Suspense
            fallback={
                <Stack alignItems={'center'} justifyContent={'center'} minHeight={100} minWidth={100}>
                    loading...
                </Stack>
            }
        >
            <RouterProvider router={router} />
        </Suspense>
    )
}
