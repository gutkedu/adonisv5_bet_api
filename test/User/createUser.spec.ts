import test from 'japa'
import User from 'App/Models/User'
import supertest from 'supertest'
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
const request = supertest(BASE_URL)

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
    interface userDTO {
      user: {
        name: string
        email: string
        id: string
      }
    }
    const create_user_body = {
      name: 'Novo usuario',
      email: 'new@adonisjs.com',
      password: '123456',
    }

    const response = await request.post('/users').send(create_user_body)
    const body: userDTO = response.body
    const status = response.status

    assert.equal(status, 201)
    assert.exists(body.user.id)
    assert.deepEqual(body.user.name, create_user_body.name)
    assert.deepEqual(body.user.email, create_user_body.email)
  })
})
