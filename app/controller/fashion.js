const Controller = require('egg').Controller

class FashionController extends Controller {
  constructor(ctx) {
    super(ctx)

    this.createNews = {
      actionName: { type: 'string', required: true, allowEmpty: false },
      actionDesc: { type: 'string', required: true, allowEmpty: false },
      image: { type: 'string', required: true, allowEmpty: false },
      date: { type: 'date', required: true, allowEmpty: false },
      add: { type: 'string', required: true, allowEmpty: false },
      // actionDetail:[{
      //   actionDesc: { type: 'string', required: true },
      //   image: { type: 'string', required: true, default: 'http://btdxcx.com:3012/image/F2B6DA3A531A7C3E' },
      // }]

      actionDetail: {type: 'array', required: false, allowEmpty: false},


    }

  }

  // 创建Action
  async create() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.createNews)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.fashion.create(payload)
    // 设置响应内容和响应状态码
    ctx.helper.CREATED({ctx, res})
  }

  // 删除单个Action
  async destroy() {
    const { ctx, service } = this
    // 校验参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    await service.fashion.destroy(id)
    // 设置响应内容和响应状态码
    ctx.helper.NOCONTENT({ctx})
  }

  // 修改Action
  async update() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(this.createNews)
    // 组装参数
    const { id } = ctx.params
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    await service.fashion.update(id, payload)
    // 设置响应内容和响应状态码
    ctx.helper.NOCONTENT({ctx})
  }

  // 获取单个Action
  async show() {
    const { ctx, service } = this
    // 组装参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    const res = await service.fashion.show(id)
    // 设置响应内容和响应状态码
    ctx.helper.OK({ctx, res})
  }

  // 获取所有Action(分页/模糊)
  async index() {
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.fashion.index(payload)
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
    const result = await service.fashion.removes(payload)
    // 设置响应内容和响应状态码
    ctx.helper.NOCONTENT({ctx})
  }

}


module.exports = FashionController
