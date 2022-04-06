import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/login', 'AuthController.login')
  Route.post('/forgot', 'ForgotPasswordController.store')
  Route.post('/reset/:token', 'ResetPasswordController.store')
})
