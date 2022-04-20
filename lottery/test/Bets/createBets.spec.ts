import Game from '../../app/Models/Game'
import test from 'japa'
import supertest from 'supertest'
const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`
const request = supertest(BASE_URL)

test.group('Bets test', () => {
  test('should be able create a new bet', async (assert) => {
    const adminCredentials = {
      email: 'admin@adonisjs.com',
      password: 'admin',
    }
    const response = await request.post('/login').send(adminCredentials).expect(200)
    const authToken = response.body.token

    const getGames = await Game.all()

    const newBet = {
      user_id: response.body.user.id,
      min_cart_value: 30,
      user_bets: [
        {
          game_id: getGames[0].id,
          bet_numbers: '10,12,13,9,0',
        },
        {
          game_id: getGames[0].id,
          bet_numbers: '10,12,13,9,0',
        },
        {
          game_id: getGames[1].id,
          bet_numbers: '10,12,13,9,0',
        },
        {
          game_id: getGames[1].id,
          bet_numbers: '10,12,13,9,0',
        },
        {
          game_id: getGames[1].id,
          bet_numbers: '10,12,13,9,0',
        },
        {
          game_id: getGames[1].id,
          bet_numbers: '10,12,13,9,0',
        },
        {
          game_id: getGames[1].id,
          bet_numbers: '10,12,13,9,0',
        },
        {
          game_id: getGames[1].id,
          bet_numbers: '10,12,13,9,0',
        },
        {
          game_id: getGames[1].id,
          bet_numbers: '10,12,13,9,0',
        },
        {
          game_id: getGames[0].id,
          bet_numbers: '10,12,13,9,0',
        },
        {
          game_id: getGames[0].id,
          bet_numbers: '10,12,13,9,0',
        },
        {
          game_id: getGames[0].id,
          bet_numbers: '10,12,13,9,0',
        },
        {
          game_id: getGames[0].id,
          bet_numbers: '10,12,13,9,0',
        },
      ],
    }

    const newBetRequest = await request
      .post('/bets')
      .set('Authorization', 'bearer ' + authToken)
      .send(newBet)
      .expect(201)

    assert.isAbove(newBetRequest.body.total_price, 30)
    assert.exists(newBetRequest.body.user)
    assert.deepEqual(newBetRequest.body.user.id, newBet.user_id)
  })
})
