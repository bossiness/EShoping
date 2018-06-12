'use strict';

const Controller = require('egg').Controller;

const CreateRule = {
  name: { type: 'string', required: true, allowEmpty: false },
  logo: {type: 'string', required: false, allowEmpty: false, format: /^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/},
  state: {values: ['untreated','reviewing','completed'], required: false},
  introduce: { type: 'string', required: false },
  owner: {
    type: 'object',
    required: false,
    rule: {
      username: { type: 'string', required: false, allowEmpty: false },
      nickname: { type: 'string', required: false, allowEmpty: false },
      phone: { type: 'string', required: false, allowEmpty: false },
      email: { type: 'email', required: false, allowEmpty: false }
    }
  },
  weixin: {
    type: 'object',
    required: false,
    rule: {
      wechatID: 'string',
      appID: 'string',
      appSecret: 'string',
      partnerID: 'string',
      partnerKey: 'string',
      appQRCode: 'string'
    }
  },
  physicals: {
    type: 'array',
    itemType: 'object',
    required: false,
    rule: {
      name: 'string',
      location: {
        latitude: 'number',
        longitude: 'number'
      },
      number: 'string',
      contactName: 'string',
      contactPhone: 'string',
      address: 'string',
      zipCode: 'string'
    }
  }
}

const UpdateRule = {
  ...CreateRule,
  name: { type: 'string', required: false, allowEmpty: false }
};



class ShopDetailsController extends Controller {

  async create() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(CreateRule)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.shopDetails.create(payload)
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
    await service.shopDetails.update(id, payload)
    // 设置响应内容和响应状态码
    ctx.helper.NOCONTENT({ctx})
  }

  async index() {
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.shopDetails.index(payload)
    // 设置响应内容和响应状态码
    ctx.helper.OK({ctx, res})
  }

  async show() {
    const { ctx, service } = this
    // 组装参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    const res = await service.shopDetails.show(id)
    // 设置响应内容和响应状态码
    ctx.helper.OK({ctx, res})
  }

  async destroy() {
    const { ctx, service } = this
    // 校验参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    await service.shopDetails.destroy(id)
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
    const result = await service.role.removes(payload)
    // 设置响应内容和响应状态码
    ctx.helper.NOCONTENT({ctx})
  }

}

module.exports = ShopDetailsController;

