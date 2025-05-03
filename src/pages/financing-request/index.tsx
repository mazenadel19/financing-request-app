import { INITIAL_FINANCING_REQUEST_STATE, OPEC_COUNTRIES } from '@/constants/financing-request'
import { Country, fetchCountriesAndCurrencies } from '@/services/endpoints/country'
import { submitFinancingRequest } from '@/services/endpoints/financing-request'
import { FinancingRequestSchema } from '@/validation/financing-request'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button, CircularProgress, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

const today = new Date()
today.setHours(0, 0, 0, 0)
const minDate = new Date(today)
minDate.setDate(today.getDate() + 15)

const FinancingRequest = () => {
    const [apiState, setApiState] = useState({
        loading: false,
        error: null as string | null,
        data: {
            countries: [] as Country[],
            currencies: [] as string[],
        },
    })
    const [submitLoading, setSubmitLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setValue,
        watch,
        reset,
    } = useForm({
        resolver: zodResolver(FinancingRequestSchema),
        mode: 'onChange',
        defaultValues: INITIAL_FINANCING_REQUEST_STATE,
    })

    const watchedCountry = watch('countryCode')
    const isOpec = OPEC_COUNTRIES.includes(watchedCountry)

    const onSubmit = async (formData: z.infer<typeof FinancingRequestSchema>) => {
        setSubmitLoading(true)
        try {
            const response = await submitFinancingRequest(formData)
            if (response?.data?.message === 'success') {
                toast.success('Request submitted successfully!')
                reset(INITIAL_FINANCING_REQUEST_STATE)
            } else {
                toast.error('Unexpected response from server.')
            }
        } catch {
            toast.error('Failed to submit request. Please try again.')
        } finally {
            setSubmitLoading(false)
        }
    }

    useEffect(() => {
        if (isOpec) {
            setValue('currency', 'USD')
        }
    }, [isOpec, setValue])

    useEffect(() => {
        const fetchData = async () => {
            setApiState({
                loading: true,
                error: null,
                data: {
                    countries: [],
                    currencies: [],
                },
            })
            try {
                const { countries, currencies } = await fetchCountriesAndCurrencies()
                setApiState({ loading: false, error: null, data: { countries, currencies } })
            } catch {
                setApiState({
                    loading: false,
                    error: 'Failed to load country/currency data',
                    data: { countries: [], currencies: [] },
                })
            } finally {
                setApiState((prev) => ({ ...prev, loading: false }))
            }
        }
        void fetchData()
    }, [])

    useEffect(() => {
        if (apiState.error) {
            toast.error(apiState.error)
        }
    }, [apiState.error])

    if (apiState.loading) {
        return (
            <Box maxWidth={500} mx="auto" mt={4} textAlign="center">
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Box maxWidth={500} mx="auto" mt={4}>
            <Typography variant="h4" mb={2}>
                Financing Request
            </Typography>
            <Stack
                spacing={2}
                component="form"
                autoComplete="off"
                onSubmit={(e) => {
                    void handleSubmit(onSubmit)(e)
                }}
            >
                <TextField
                    label="Full Name"
                    {...register('fullName')}
                    fullWidth
                    required
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
                />
                <TextField
                    select
                    label="Country"
                    {...register('countryCode')}
                    value={watch('countryCode') || ''}
                    fullWidth
                    required
                    error={!!errors.countryCode}
                    helperText={errors.countryCode?.message}
                >
                    {apiState.data.countries.map((c) => (
                        <MenuItem key={c.code} value={c.code}>
                            {c.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Project Code"
                    {...register('projectCode')}
                    fullWidth
                    required
                    placeholder="XXXX-YYYY"
                    error={!!errors.projectCode}
                    helperText={errors.projectCode?.message}
                />
                <TextField
                    label="Description"
                    {...register('description')}
                    fullWidth
                    required
                    multiline
                    rows={2}
                    slotProps={{ htmlInput: { maxLength: 150 } }}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                        label="Amount"
                        {...register('amount')}
                        fullWidth
                        required
                        type="number"
                        slotProps={{ htmlInput: { min: 0, step: 'any' } }}
                        error={!!errors.amount}
                        helperText={errors.amount?.message}
                    />
                    <TextField
                        select
                        label="Currency"
                        {...register('currency')}
                        value={watch('currency') || ''}
                        fullWidth
                        required
                        error={!!errors.currency}
                        helperText={errors.currency?.message}
                        disabled={isOpec}
                    >
                        {apiState.data.currencies.map((c) => (
                            <MenuItem key={c} value={c}>
                                {c}
                            </MenuItem>
                        ))}
                    </TextField>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                        label="Start Date"
                        {...register('date')}
                        fullWidth
                        required
                        type="date"
                        slotProps={{
                            inputLabel: { shrink: true },
                            htmlInput: { min: minDate.toISOString().split('T')[0] },
                        }}
                        error={!!errors.date}
                        helperText={errors.date?.message}
                    />
                    <TextField
                        select
                        label="Validity Period (years)"
                        {...register('validityPeriod')}
                        value={watch('validityPeriod') || ''}
                        fullWidth
                        required
                        error={!!errors.validityPeriod}
                        helperText={errors.validityPeriod?.message}
                    >
                        {[1, 2, 3].map((y) => (
                            <MenuItem key={y} value={y.toString()}>
                                {y}
                            </MenuItem>
                        ))}
                    </TextField>
                </Stack>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    disabled={!isValid || submitLoading}
                    startIcon={submitLoading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                    {submitLoading ? 'Submitting...' : 'Submit'}
                </Button>
            </Stack>
        </Box>
    )
}

export default FinancingRequest
