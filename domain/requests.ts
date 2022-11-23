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
    // console.log({ at: data.data.access_token })
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
    // console.log({ patientId })
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
    // console.log({ data })
    // download(JSON.stringify(data), 'mock-eob.json', 'application/json');
    return data.data
}

// function download(content: any, fileName: string, contentType: any) {
//     var a = document.createElement("a");
//     var file = new Blob([content], {type: contentType});
//     a.href = URL.createObjectURL(file);
//     a.download = fileName;
//     a.click();
// }