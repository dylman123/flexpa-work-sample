import mockEOB from './mock-eob.json'

export const getAccessToken = jest.fn((pt: string) => {
    // console.log("Mocking API data...")
    return Promise.resolve(
        'eyJhbGciOiJFUzI1NiJ9.eyJqdGkiOiJhM2Q3Y2I1ZC05YWFmL…Q8MLmv0teFChz3pauubiNQaO0ngsy84-u_ADk_LTmiPrw5zVg'
    )
})

export const getPatientId = jest.fn((at: string) => {
    // console.log("Mocking API data...")
    return Promise.resolve(
        '3310a69275f767b7166408023c2382827169478681c78a617511451e8bd1520f'
    )
})

export const getExplanationOfBenefit = jest.fn((id: string, at: string) => {
    // console.log("Mocking API data...")
    return Promise.resolve(mockEOB)
})