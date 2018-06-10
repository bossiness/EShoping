const Controller = require('egg').Controller

class AddressController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.createAdd = {
      name: { type: 'string', required: true, allowEmpty: false },
      phone: { type: 'string', required: true, allowEmpty: false },
      isDefault: { type: 'boolean', required: false, allowEmpty: true },
      address: { type: 'string', required: true, allowEmpty: false },

    }

  }

  // 创建Action
  async create() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.createAdd)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.address.create(payload)
    // 设置响应内容和响应状态码
    ctx.helper.CREATED({ctx, res})
  }

  // 删除单个Action
  async destroy() {
    const { ctx, service } = this
    // 校验参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    await service.address.destroy(id)
    // 设置响应内容和响应状态码
    ctx.helper.NOCONTENT({ctx})
  }

  // 修改Action
  async update() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.createAdd)
    // 组装参数
    const { id } = ctx.params
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    await service.address.update(id, payload)
    // 设置响应内容和响应状态码
    ctx.helper.NOCONTENT({ctx})
  }

  // 获取单个Action
  async show() {
    const { ctx, service } = this
    // 组装参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    const res = await service.address.show(id)
    // 设置响应内容和响应状态码
    ctx.helper.OK({ctx, res})
  }

  // 获取所有Action(分页/模糊)
  async index() {
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.address.index(payload)
    // 设置响应内容和响应状态码
    ctx.helper.OK({ctx, res})
  }

  // 删除所选Action(条件id[])
  async removes() {
    const { ctx, service } = this
    // 组装参数
    // const payload = ctx.queries.id
    const { id } = ctx.request.body // {id: "5a452a44ab122b16a0231b42,5a452a3bab122b16a0231b41"}
    const payload = id.split(',') || []
    // 调用 Service 进行业务处理
    const result = await service.address.removes(payload)
    // 设置响应内容和响应状态码
    ctx.helper.NOCONTENT({ctx})
  }

}


module.exports = AddressController
