import { Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'

const initialState = {
    fullName: '',
    countryCode: '',
    projectCode: '',
    description: '',
    amount: '',
    currency: '',
    date: '',
    validityPeriod: '',
}

const FinancingRequest = () => {
    const [form, setForm] = useState(initialState)

    const countries = [
        { code: 'US', name: 'United States' },
        { code: 'SA', name: 'Saudi Arabia' },
    ]
    const currencies = [
        { code: 'USD', name: 'US Dollar' },
        { code: 'EUR', name: 'Euro' },
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <Box maxWidth={500} mx="auto" mt={4}>
            <Typography variant="h4" mb={2}>
                Financing Request
            </Typography>
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
                    slotProps={{
                        htmlInput: { maxLength: 4 },
                    }}
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
                            <MenuItem key={c.code} value={c.code}>
                                {c.name}
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
