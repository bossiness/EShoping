'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)

  // role
  // router.post('/api/role', controller.role.create)
  // router.delete('/api/role/:id', controller.role.destroy)
  // router.put('/api/role/:id', controller.role.update)
  // router.get('/api/role/:id', controller.role.show)
  // router.get('/api/role', controller.role.index)
  router.delete('/v1/roles', controller.role.removes)
  router.resources('role', '/v1/roles', controller.role)


  // fashion
  // router.post('/api/role', controller.role.create)
  // router.delete('/api/role/:id', controller.role.destroy)
  // router.put('/api/role/:id', controller.role.update)
  // router.get('/api/role/:id', controller.role.show)
  // router.get('/api/role', controller.role.index)
  router.delete('/v1/fashion', controller.fashion.removes)
  router.resources('fashion', '/v1/fashions', controller.fashion)

  // myAddress
  // router.post('/api/role', controller.role.create)
  // router.delete('/api/role/:id', controller.role.destroy)
  // router.put('/api/role/:id', controller.role.update)
  // router.get('/api/role/:id', controller.role.show)
  // router.get('/api/role', controller.role.index)
  router.delete('/v1/address', controller.address.removes)
  router.resources('address', '/v1/address', controller.address)




  // auth
  router.post('auth', '/v1/auth/signin', controller.auth.signin)
  router.post('auth', '/v1/auth/signup', controller.auth.signup)
  router.delete('auth', '/v1/auth/signout', controller.auth.signout)
  router.put('auth', '/v1/auth/password', controller.auth.resetPsw)


  // userAccess
  router.post('/api/user/access/login', controller.userAccess.login)
  router.get('/api/user/access/current', app.jwt, controller.userAccess.current)
  router.get('/api/user/access/logout', controller.userAccess.logout)
  router.put('/api/user/access/resetPsw', app.jwt, controller.userAccess.resetPsw)

  // user
  router.delete('/v1/users', controller.adminUser.removes)
  router.resources('user', '/v1/users', controller.adminUser)
  router.get('/v1/user/me', app.jwt, controller.adminUser.current)

  //taxons
  router.resources('taxons', '/v1/taxons', controller.taxons)

  // shop
  router.resources('shop', '/v1/shops', controller.shopDetails)
  router.delete('/v1/shops', controller.shopDetails.removes)

  // product
  router.resources('shop', '/v1/products', controller.product)
  router.delete('/v1/products', controller.product.removes)

  // upload
  router.post('/api/upload', controller.upload.create)
  router.post('/api/upload/url', controller.upload.url)
  router.post('/api/uploads', controller.upload.multiple)
  router.delete('/api/upload/:id', controller.upload.destroy)
  // router.put('/api/upload/:id', controller.upload.update)
  router.post('/api/upload/:id', controller.upload.update) // Ant Design Pro
  router.put('/api/upload/:id/extra', controller.upload.extra)
  router.get('/api/upload/:id', controller.upload.show)
  router.get('/api/upload', controller.upload.index)
  router.delete('/api/upload', controller.upload.removes)
  // router.resources('upload', '/api/upload', controller.upload)
}
