'use strict';

const Service = require('egg').Service;

class AuthService extends Service {
  async token(payload) {
    const { ctx, service } = this
    const user = await service.adminUser.findByUserName(payload.username)
    if(!user){
      ctx.throw(404, 'user not found')
    }
    let verifyPsw = (payload.password === user.password) || await ctx.compare(payload.password, user.password)
    if(!verifyPsw) {
      ctx.throw(404, 'user password is error')
    }
    // 生成Token令牌
    return { token: await service.actionToken.apply(user._id) }
  }
}

module.exports = AuthService;

