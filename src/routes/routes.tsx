// react
import { lazy } from 'react'
// router
import type { RouteObject } from 'react-router-dom'
// layout
import AppLayout from '@/layout/app-layout'
// pages
const Error = lazy(() => import('@/pages/error-pages/error'))
const Home = lazy(() => import('@/pages/home'))
const NoMatch = lazy(() => import('@/pages/error-pages/not-match'))
const FinancingRequest = lazy(() => import('@/pages/financing-request'))

export const Routes = [
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Home /> },
            { path: 'financing-request', element: <FinancingRequest /> },
            { path: '*', element: <NoMatch /> },
        ],
    },
] satisfies RouteObject[]
