import API from '@/services/API'

export const COUNTRY_API = 'https://restcountries.com/v3.1/all?fields=cca2,name,currencies'

export interface Country {
    code: string
    name: string
    currencies: string[]
}

export interface NativeName {
    official: string
    common: string
}
export interface Currency {
    name: string
    symbol: string
}

interface RestCountry {
    cca2: string
    name: { common: string; official: string; nativeName: Record<string, NativeName> }
    currencies: Record<string, Currency>
}

export async function fetchCountriesAndCurrencies(): Promise<{ countries: Country[]; currencies: string[] }> {
    const { data: countryData } = await API.get<RestCountry[]>(COUNTRY_API)
    if (!Array.isArray(countryData)) throw new Error('Invalid country data')
    const currencySet = new Set<string>()
    const countryList: Country[] = []
    for (const c of countryData) {
        if (c.cca2 && c.name?.common) {
            const currencies = c.currencies ? Object.keys(c.currencies) : []
            countryList.push({
                code: c.cca2,
                name: c.name.common,
                currencies,
            })
            currencies.forEach((cur) => currencySet.add(cur))
        }
    }
    countryList.sort((a, b) => a.name.localeCompare(b.name))
    const currencies = Array.from(currencySet).sort()
    return { countries: countryList, currencies }
}
