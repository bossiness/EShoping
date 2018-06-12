'use strict';

const Controller = require('egg').Controller;

const SignupRule = {
    username: {type: 'string', required: true, allowEmpty: false, format: /^[a-zA-Z_.]{6,}$/ },
    password: {type: 'password', required: true, allowEmpty: false, min: 6},
    realName: {type: 'string', required: true, allowEmpty: false, format: /^[\u2E80-\u9FFF]{2,6}$/}
}

const LoginRule = {
    username: {type: 'string', required: true, allowEmpty: false, format: /^[a-zA-Z_.]{6,}$/ },
    password: {type: 'password', required: true, allowEmpty: false, min: 6},
}

class AuthController extends Controller {
  async signin() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(LoginRule)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.auth.token(payload)
    // 设置响应内容和响应状态码
    ctx.helper.CREATED({ctx, res})
  }

  async signup () {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(SignupRule)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    let res = await service.adminUser.create(payload)
    res = await service.auth.token({username: res.username, password: res.password})
    // 设置响应内容和响应状态码
    ctx.helper.CREATED({ctx, res})
  }

  async signout () {
    const { ctx, service } = this
    ctx.helper.NOCONTENT({ctx})
  }

  async resetPsw () {
    const { ctx, service } = this
    ctx.helper.notExtended({ctx})
  }

}

module.exports = AuthController;

