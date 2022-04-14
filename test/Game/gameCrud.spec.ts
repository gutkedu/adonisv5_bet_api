import Game from 'App/Models/Game'
import test from 'japa'
import supertest from 'supertest'
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
const request = supertest(BASE_URL)

test.group('Games crud test group', () => {
  test('it should require authentication', async (assert) => {
    request.get('/games').expect(401, assert)
  })

  test('it should respond with games json array', async (assert) => {
    const adminCredentials = {
      email: 'admin@adonisjs.com',
      password: 'admin',
    }
    const response = await request.post('/login').send(adminCredentials).expect(200)
    const authToken = response.body.token
    const gamesRequest = await request
      .get('/games')
      .set('Authorization', 'bearer ' + authToken)
      .expect(200)
    assert.isArray(gamesRequest.body.games)
  })

  test('it should create a new game', async (assert) => {
    const adminCredentials = {
      email: 'admin@adonisjs.com',
      password: 'admin',
    }
    const newGame = {
      type: 'Jogo-Teste',
      description: 'Descricao Teste request',
      range: 100,
      price: 5,
      max_number: 10,
      color: '#FFFF',
    }
    const response = await request.post('/login').send(adminCredentials).expect(200)
    const authToken = response.body.token
    const gamesRequest = await request
      .post('/games')
      .set('Authorization', 'bearer ' + authToken)
      .send(newGame)
      .expect(201)
    const createdGame = await Game.findOrFail(gamesRequest.body.id)
    assert.exists(createdGame)
  })

  test('it should update a game', async (assert) => {
    const adminCredentials = {
      email: 'admin@adonisjs.com',
      password: 'admin',
    }
    const updatedMegaSena = {
      type: 'Mega-Sena-Updated',
      description: 'Descricao Teste request',
      range: 100,
      price: 5,
      max_number: 10,
      color: '#FFFF',
    }
    const response = await request.post('/login').send(adminCredentials).expect(200)
    const authToken = response.body.token
    const megaSenaGame = await Game.findByOrFail('type', 'Mega-Sena')

    const gamesRequest = await request
      .put(`/games/${megaSenaGame.id}`)
      .set('Authorization', 'bearer ' + authToken)
      .send(updatedMegaSena)
      .expect(200)

    assert.deepEqual(updatedMegaSena.type, gamesRequest.body.type)
    assert.deepEqual(updatedMegaSena.description, gamesRequest.body.description)
  })

  test('it should delete a existing game', async (assert) => {
    const adminCredentials = {
      email: 'admin@adonisjs.com',
      password: 'admin',
    }
    const lotofacilGame = await Game.findByOrFail('type', 'Lotofácil')
    const response = await request.post('/login').send(adminCredentials).expect(200)
    const authToken = response.body.token
    const gamesRequest = await request
      .delete(`/games/${lotofacilGame.id}`)
      .set('Authorization', 'bearer ' + authToken)
      .expect(200)

    assert.exists(gamesRequest.body.deleted_game)
    assert.deepEqual(gamesRequest.body.deleted_game.id, lotofacilGame.id)
  })

  test('it should show a game by id', async (assert) => {
    const adminCredentials = {
      email: 'admin@adonisjs.com',
      password: 'admin',
    }
    const quinaGame = await Game.findByOrFail('type', 'Quina')
    const response = await request.post('/login').send(adminCredentials).expect(200)
    const authToken = response.body.token
    const gamesRequest = await request
      .get(`/games/${quinaGame.id}`)
      .set('Authorization', 'bearer ' + authToken)
      .expect(200)
    assert.exists(gamesRequest.body)
    assert.deepEqual(gamesRequest.body.id, quinaGame.id)
  })
})
