import test from 'japa'
import User from 'App/Models/User'
import supertest from 'supertest'
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
const request = supertest(BASE_URL)

test.group('Auth test', () => {
  test('should be able to login and get a JWT token', async (assert) => {
    interface loginDTO {
      token: string,
      user: {
        id: string,
        name: string,
        email: string
      }
    }

    const credentials = {
      email: 'testing@adonisjs.com', password: '123456'
    }

    await User.create({ name: 'Testing', ...credentials })

    const response = await request.post('/login').send(credentials)
    const body: loginDTO = response.body
    const status = response.status

    assert.equal(status, 200)
    assert.exists(body.user.id)
    assert.deepEqual(body.user.email, credentials.email)
    assert.exists(body.token)

  })
})

