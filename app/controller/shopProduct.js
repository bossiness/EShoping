'use strict';

const Controller = require('egg').Controller

const CreateRule = {
  product: { type: 'string', required: true },
}

const UpdateRule = {
  taxons: {
    type: 'array',
    itemType: 'string',
    required: false
  },
}


class ShopProductController extends Controller {

  async create() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(CreateRule)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.shopProduct.create(payload)
    // 设置响应内容和响应状态码
    ctx.helper.CREATED({ctx, res})
  }

  async update() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(UpdateRule)
    // 组装参数
    const { id } = ctx.params
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    await service.shopProduct.update(id, payload)
    // 设置响应内容和响应状态码
    ctx.helper.NOCONTENT({ctx})
  }

  async index() {
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.shopProduct.index(payload)
    // 设置响应内容和响应状态码
    ctx.helper.OK({ctx, res})
  }

  async show() {
    const { ctx, service } = this
    // 组装参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    const res = await service.shopProduct.show(id)
    // 设置响应内容和响应状态码
    ctx.helper.OK({ctx, res})
  }

  async destroy() {
    const { ctx, service } = this
    // 校验参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    await service.shopProduct.destroy(id)
    // 设置响应内容和响应状态码
    ctx.helper.NOCONTENT({ctx})
  }

  async removes() {
    const { ctx, service } = this
    // 组装参数
    // const payload = ctx.queries.id
    const { id } = ctx.request.body // {id: "5a452a44ab122b16a0231b42,5a452a3bab122b16a0231b41"}
    const payload = id.split(',') || []
    // 调用 Service 进行业务处理
    const result = await service.shopProduct.removes(payload)
    // 设置响应内容和响应状态码
    ctx.helper.NOCONTENT({ctx})
  }

}

module.exports = ShopProductController
