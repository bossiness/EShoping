'use strict';

const Controller = require('egg').Controller;

const CreateRule = {
  username: {type: 'string', required: true, allowEmpty: false, format: /^[a-zA-Z_.]{6,}$/ },
  password: {type: 'password', required: true, allowEmpty: false, min: 6},
  realName: {type: 'string', required: true, allowEmpty: false, format: /^[\u2E80-\u9FFF]{2,6}$/},
  portrait: {type: 'string', required: false, allowEmpty: false, format: /^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/}
}

const UpdateRule = {
  realName: {type: 'string', required: true, allowEmpty: false, format: /^[\u2E80-\u9FFF]{2,6}$/},
  portrait: {type: 'string', required: false, allowEmpty: false, format: /^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/}
}

class AdminUserController extends Controller {
  async create() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(CreateRule)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.adminUser.create(payload)
    // 设置响应内容和响应状态码
    ctx.helper.CREATED({ctx, res})
  }

  // 删除单个用户
  async destroy() {
    const { ctx, service } = this
    // 校验参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    await service.adminUser.destroy(id)
    // 设置响应内容和响应状态码
    ctx.helper.NOCONTENT({ctx})
  }

  async update() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(UpdateRule)
    // 组装参数
    const { id } = ctx.params
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    await service.adminUser.update(id, payload)
    // 设置响应内容和响应状态码
    ctx.helper.NOCONTENT({ctx})
  }

    // 获取单个用户
    async show() {
      const { ctx, service } = this
      // 组装参数
      const { id } = ctx.params
      // 调用 Service 进行业务处理
      const res = await service.adminUser.show(id)
      // 设置响应内容和响应状态码
      ctx.helper.OK({ctx, res})
    }

  async index() {
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.adminUser.index(payload)
    // 设置响应内容和响应状态码
    ctx.helper.OK({ctx, res})
  }

  // 删除所选用户(条件id[])
  async removes() {
    const { ctx, service } = this
    // 组装参数
    // const payload = ctx.queries.id
    const { id } = ctx.request.body
    const payload = id.split(',') || []
    // 调用 Service 进行业务处理
    const result = await service.adminUser.removes(payload)
    // 设置响应内容和响应状态码
    ctx.helper.NOCONTENT({ctx})
  }

  // 获取用户信息
  async current() {
    const { ctx, service } = this
    const res = await service.adminUser.current()
    // 设置响应内容和响应状态码
    ctx.helper.OK({ctx, res})
  }
}

module.exports = AdminUserController;

