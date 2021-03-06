const Controller = require('egg').Controller

class TaxonsController extends Controller {
  constructor(ctx) {
    super(ctx)
    //定义参数有效性规则
    this.createRule = {
      name: { type: 'string', required: true, allowEmpty: false }
    }

  }

  // 创建
  async create() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.createRule)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.taxons.create(payload)
    // 设置响应内容和响应状态码
    ctx.helper.CREATED({ctx, res})
  }

  // 删除单个
  async destroy() {
    const { ctx, service } = this
    // 校验参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    const res = await service.taxons.destroy(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx,res})
  }

  // 修改
  async update() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.createRule)
    // 组装参数
    const { id } = ctx.params
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.taxons.update(id, payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx,res})
  }

  // 获取单个
  async show() {
    const { ctx, service } = this
    // 组装参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    const res = await service.taxons.show(id)
    // 设置响应内容和响应状态码
    ctx.helper.OK({ctx, res})
  }

  // 获取列表
  async index() {
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.taxons.index(payload)
    // 设置响应内容和响应状态码
    ctx.helper.OK({ctx, res})
  }

  // 删除所选ids(条件id[])
  async removes() {
    const { ctx, service } = this
    // 组装参数
    // const payload = ctx.queries.id
    const { id } = ctx.request.body // {id: "5a452a44ab122b16a0231b42,5a452a3bab122b16a0231b41"}
    const payload = id.split(',') || []
    // 调用 Service 进行业务处理
    const result = await service.taxons.removes(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

}


module.exports = TaxonsController
