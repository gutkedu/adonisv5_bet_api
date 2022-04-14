import test from 'japa'
import supertest from 'supertest'
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
const request = supertest(BASE_URL)

test.group('Games crud test group', () => {
  test('it should require authentication', async (assert) => {
    request
      .get('/games')
      .expect(401, assert)
  })

  test('it should respond with games json array', async (assert) => {
    const adminCredentials = {
      email: 'admin@adonisjs.com', password: 'admin'
    }
    const response = await request
      .post('/login')
      .send(adminCredentials)
      .expect(200)
    const authToken = response.body.token
    const gamesRequest = await request
      .get('/games')
      .set('Authorization', 'bearer ' + authToken)
      .expect(200)
    assert.isArray(gamesRequest.body.games)
  })
})

function loginAdmin(auth) {
  const adminCredentials = {
    email: 'admin@adonisjs.com', password: 'admin'
  }
  return function (assert) {
    request
      .post('/login')
      .send(adminCredentials)
      .expect(200)
      .end(onResponse);
    function onResponse(err, res) {
      auth.token = res.body.token;
      return assert();
    }
  }
}
