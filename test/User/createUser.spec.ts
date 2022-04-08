import test from 'japa'
import User from 'App/Models/User'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

test.group('Create a new user test', () => {
  test('ensure a new user is created', async (assert) => {
    const user = new User()
    user.name = 'Usuario Adonis'
    user.email = 'virk@adonisjs.com'
    user.password = 'secret'
    await user.save()
    const user_created = await User.findByOrFail('email', user.email)
    assert.exists(user_created)
  })

  test('create a new user using http call', async (assert) => {
    const createUser = await supertest(BASE_URL)
      .post('/users')
      .send({
        "name": "User Teste",
        "email": "user@teste.com",
        "password": "secret"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
  })
})

