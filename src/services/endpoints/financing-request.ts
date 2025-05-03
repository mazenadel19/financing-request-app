import API from '@/services/API'
import { FinancingRequestSchema } from '@/validation/financing-request'
import { z } from 'zod'

export const FINANCING_REQUEST_API = 'http://test-noema-api.azurewebsites.net/api/requests'

export type FinancingRequestPayload = z.infer<typeof FinancingRequestSchema>

export interface FinancingRequestResponse {
    message: string
}

export async function submitFinancingRequest(data: FinancingRequestPayload) {
    const { fullName, countryCode, projectCode, description, amount, currency, date, validityPeriod } = data
    return API.post<FinancingRequestResponse>(FINANCING_REQUEST_API, {
        fullName,
        countryCode,
        projectCode,
        description,
        amount: Number(amount),
        currency,
        date,
        validityPeriod: Number(validityPeriod),
    })
}
