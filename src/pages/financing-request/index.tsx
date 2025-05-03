import { INITIAL_FINANCING_REQUEST_STATE } from '@/constants/financing-request'
import { Country, fetchCountriesAndCurrencies } from '@/services/endpoints/country'
import { Alert, Box, Button, CircularProgress, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

const FinancingRequest = () => {
    const [form, setForm] = useState(INITIAL_FINANCING_REQUEST_STATE)
    const [countries, setCountries] = useState<Country[]>([])
    const [currencies, setCurrencies] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setApiError(null)
            try {
                const { countries, currencies } = await fetchCountriesAndCurrencies()
                setCountries(countries)
                setCurrencies(currencies)
            } catch {
                setApiError('Failed to load country/currency data')
            } finally {
                setLoading(false)
            }
        }
        void fetchData()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    if (loading) {
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
            {apiError && <Alert severity="error">{apiError}</Alert>}
            <Stack spacing={2} component="form" autoComplete="off">
                <TextField
                    label="Full Name"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    select
                    label="Country"
                    name="countryCode"
                    value={form.countryCode}
                    onChange={handleChange}
                    fullWidth
                    required
                >
                    {countries.map((c) => (
                        <MenuItem key={c.code} value={c.code}>
                            {c.name}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Project Code"
                    name="projectCode"
                    value={form.projectCode}
                    onChange={handleChange}
                    fullWidth
                    required
                    placeholder="XXXX-YYYY"
                />
                <TextField
                    label="Description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    fullWidth
                    required
                    multiline
                    rows={2}
                    slotProps={{ htmlInput: { maxLength: 150 } }}
                />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                        label="Amount"
                        name="amount"
                        value={form.amount}
                        onChange={handleChange}
                        fullWidth
                        required
                        type="number"
                        slotProps={{ htmlInput: { min: 0, step: 'any' } }}
                    />
                    <TextField
                        select
                        label="Currency"
                        name="currency"
                        value={form.currency}
                        onChange={handleChange}
                        fullWidth
                        required
                    >
                        {currencies.map((c) => (
                            <MenuItem key={c} value={c}>
                                {c}
                            </MenuItem>
                        ))}
                    </TextField>
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                        label="Start Date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        fullWidth
                        required
                        type="date"
                        slotProps={{ inputLabel: { shrink: true } }}
                    />
                    <TextField
                        select
                        label="Validity Period (years)"
                        name="validityPeriod"
                        value={form.validityPeriod}
                        onChange={handleChange}
                        fullWidth
                        required
                    >
                        {[1, 2, 3].map((y) => (
                            <MenuItem key={y} value={y}>
                                {y}
                            </MenuItem>
                        ))}
                    </TextField>
                </Stack>
                <Button variant="contained" color="primary" fullWidth disabled>
                    Submit
                </Button>
            </Stack>
        </Box>
    )
}

export default FinancingRequest
