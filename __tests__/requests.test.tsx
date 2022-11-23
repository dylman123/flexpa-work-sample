import {
    getAccessToken,
    getPatientId,
    getExplanationOfBenefit
} from '../__mocks__/requests'
import mockEOB from '../__mocks__/mock-eob.json'

describe('get access token from Flexpa /exchange endpoint', () => {
    it('should return a token of type string', async () => {
        return await getAccessToken('public_token_fbc2db94-c528-41e6-9d9e-0519c80a7a34')
        .then(data => {
            expect(data).toEqual(expect.any(String))
        })
    })
    it('should return mock access token', async () => {
        return await getAccessToken('public_token_fbc2db94-c528-41e6-9d9e-0519c80a7a34')
        .then(data => {
            expect(data).toEqual('eyJhbGciOiJFUzI1NiJ9.eyJqdGkiOiJhM2Q3Y2I1ZC05YWFmL…Q8MLmv0teFChz3pauubiNQaO0ngsy84-u_ADk_LTmiPrw5zVg')
        })
    })
})

describe('get patient id from Flexpa /introspect endpoint', () => {
    it('should return an id of type string', async () => {
        return await getPatientId('eyJhbGciOiJFUzI1NiJ9.eyJqdGkiOiJhM2Q3Y2I1ZC05YWFmL…Q8MLmv0teFChz3pauubiNQaO0ngsy84-u_ADk_LTmiPrw5zVg')
        .then(data => {
            expect(data).toEqual(expect.any(String))
        })
    })
    it('should return mock patient id', async () => {
        return await getPatientId('eyJhbGciOiJFUzI1NiJ9.eyJqdGkiOiJhM2Q3Y2I1ZC05YWFmL…Q8MLmv0teFChz3pauubiNQaO0ngsy84-u_ADk_LTmiPrw5zVg')
        .then(data => {
            expect(data).toEqual('3310a69275f767b7166408023c2382827169478681c78a617511451e8bd1520f')
        })
    })
})

describe('get patient data from Flexpa /ExplanationOfBenefit endpoint', () => {
    it('should return data of type object', async () => {
        return await getExplanationOfBenefit(
            '3310a69275f767b7166408023c2382827169478681c78a617511451e8bd1520f',
            'eyJhbGciOiJFUzI1NiJ9.eyJqdGkiOiJhM2Q3Y2I1ZC05YWFmL…Q8MLmv0teFChz3pauubiNQaO0ngsy84-u_ADk_LTmiPrw5zVg'
        )
        .then(data => {
            expect(data).toEqual(expect.any(Object))
        })
    })
    it('should return mock patient data', async () => {
        return await getExplanationOfBenefit(
            '3310a69275f767b7166408023c2382827169478681c78a617511451e8bd1520f',
            'eyJhbGciOiJFUzI1NiJ9.eyJqdGkiOiJhM2Q3Y2I1ZC05YWFmL…Q8MLmv0teFChz3pauubiNQaO0ngsy84-u_ADk_LTmiPrw5zVg'
        )
        .then(data => {
            expect(data).toEqual(mockEOB)
        })
    })
})