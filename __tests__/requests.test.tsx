import { getAccessToken, getPatientId, getExplanationOfBenefit } from '../domain/requests'
const request = require('supertest')
const api = require('../pages/api/link/exchange')

describe('get access token from Flexpa Link', () => {
    it('should return a token of type string', async () => {
        return await getAccessToken('my-public-token')
        .then(data => {
            expect(data).toBeDefined()
            expect(data).toBeInstanceOf(String)
        })
    })
})