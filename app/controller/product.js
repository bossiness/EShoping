'use strict';

const Controller = require('egg').Controller;

const CreateRule = {
  spu: { type: 'string', required: true, allowEmpty: false },
  name: { type: 'string', required: true, allowEmpty: false },
  shopId: { type: 'string', required: true, allowEmpty: false },
  description: { type: 'string', required: false, allowEmpty: false },
  mainTaxon: { type: 'string', required: true, allowEmpty: false },
  state: { type: 'enum', required: false, values: ['putaway', 'not'] },
  tags: {
    type: 'array',
    itemType: 'string',
    required: false
  },
  images: {
    type: 'array',
    itemType: 'object',
    required: false,
    rule: {
      type: 'string',
      path: 'string'
    }
  },
  attributes: {
    type: 'array',
    itemType: 'object',
    required: false,
    rule: {
      code: 'string',
      value: 'string'
    }
  },
  options: {
    type: 'array',
    itemType: 'object',
    required: false,
    rule: {
      code: 'string',
      options: { type: 'array', itemType: 'string' },
    }
  },
  variants: {
    type: 'array',
    itemType: 'object',
    required: false,
    rule: {
      sku: 'string',
      name: 'string',
      pricing: {
        type: 'object',
        required: false,
        rule: {
          current: 'int',
          current: 'int',
        }
      },
      stock: 'int',
      optionValues: { type: 'array', itemType: 'string' },
    }
  },
}

const UpdateRule = {
  ...CreateRule,
  spu: { type: 'string', required: false, allowEmpty: false },
  name: { type: 'string', required: false, allowEmpty: false },
  shopId: { type: 'string', required: false, allowEmpty: false },
  mainTaxon: { type: 'string', required: false, allowEmpty: false },
};


class ProductController extends Controller {

  async create() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(CreateRule)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.product.create(payload)
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
    await service.product.update(id, payload)
    // 设置响应内容和响应状态码
    ctx.helper.NOCONTENT({ctx})
  }

  async index() {
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.product.index(payload)
    // 设置响应内容和响应状态码
    ctx.helper.OK({ctx, res})
  }

  async show() {
    const { ctx, service } = this
    // 组装参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    const res = await service.product.show(id)
    // 设置响应内容和响应状态码
    ctx.helper.OK({ctx, res})
  }

  async destroy() {
    const { ctx, service } = this
    // 校验参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    await service.product.destroy(id)
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
    const result = await service.product.removes(payload)
    // 设置响应内容和响应状态码
    ctx.helper.NOCONTENT({ctx})
  }

}

module.exports = ProductController;
