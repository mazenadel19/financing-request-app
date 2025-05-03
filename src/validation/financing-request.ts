import { MIN_DAYS_IN_FUTURE, OPEC_COUNTRIES } from '@/constants/financing-request'
import { z } from 'zod'

const today = new Date()
today.setHours(0, 0, 0, 0)
const minDate = new Date(today)
minDate.setDate(today.getDate() + MIN_DAYS_IN_FUTURE)

export const FinancingRequestSchema = z
    .object({
        fullName: z.string().min(1, 'Full name is required.'),
        countryCode: z.string().min(1, 'Country is required.'),
        projectCode: z.string().regex(/^[A-Z]{4}-[1-9]{4}$/, 'Format: 4 capital letters, dash, 4 digits 1-9.'),
        description: z.string().min(1, 'Description is required.').max(150, 'Max 150 characters.'),
        amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, 'Enter a positive number.'),
        currency: z.string().min(1, 'Currency is required.'),
        date: z.string().refine((val) => {
            if (!val) return false
            const selected = new Date(val)
            return selected >= minDate
        }, 'Date must be at least 15 days in the future.'),
        validityPeriod: z.string().refine((val) => ['1', '2', '3'].includes(val), 'Choose 1, 2, or 3 years.'),
    })
    .refine(
        (data) => {
            if (OPEC_COUNTRIES.includes(data.countryCode)) {
                return data.currency === 'USD'
            }
            return true
        },
        {
            message: 'OPEC countries must use USD.',
            path: ['currency'],
        }
    )
