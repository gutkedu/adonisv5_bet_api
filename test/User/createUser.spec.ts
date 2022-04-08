import test from 'japa'
import User from 'App/Models/User'

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
})
