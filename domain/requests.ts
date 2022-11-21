export const getAccessToken = async (
    pt: string
): Promise<string | undefined> => {
    // Fixme: sometimes returns a 404 error on /api/link/exchange
    const response = await fetch('/api/link/exchange', {
        method: 'POST',
        body: JSON.stringify({ publicToken: pt }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const data = await response.json()
    return data.data.access_token
}

export const getPatientId = async (
    at: string
): Promise<string | undefined> => {
    const response = await fetch('/api/link/introspect', {
        method: 'POST',
        headers: {
            'Access-Token': at,
            'Content-Type': 'application/json',
        },
    })
    const data = await response.json()
    const regex = new RegExp('([^\/]+$)')
    const patientId = data.data.sub && data.data.sub.match(regex)[0]
    return patientId
}

export const getExplanationOfBenefit = async (
    id: string,
    at: string
): Promise<object | undefined> => {
    const response = await fetch(`/api/fhir/ExplanationOfBenefit?patient=${id}`, {
        method: 'GET',
        headers: {
            'Access-Token': at,
            'Content-Type': 'application/json',
        },
    })
    const data = await response.json()
    return data.data
}