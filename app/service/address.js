const Service = require('egg').Service

class AddressService extends Service {
  // create======================================================================================================>
  async create(payload) {
    return this.ctx.model.Address.create(payload)
  }

  // destroy======================================================================================================>
  async destroy(_id) {
    const { ctx, service } = this
    const fashion = await ctx.service.address.find(_id)
    if (!fashion) {
      ctx.throw(404, 'Action not found')
    }
    return ctx.model.Address.findByIdAndRemove(_id)
  }

  // update======================================================================================================>
  async update(_id, payload) {
    const { ctx, service } = this
    const fashion = await ctx.service.address.find(_id)
    if (!fashion) {
      ctx.throw(404, 'action not found')
    }
    return ctx.model.Address.findByIdAndUpdate(_id, payload)
  }

  // show======================================================================================================>
  async show(_id) {
    const fashion = await this.ctx.service.myaddress.find(_id)
    if (!fashion) {
      this.ctx.throw(404, 'Action not found')
    }
    return this.ctx.model.Address.findById(_id)
  }

  // index======================================================================================================>
  async index(payload) {
    const { offset, limit, isPaging, search } = payload
    let res = []
    let total = 0
    let skip = Number(offset) || 0
    let count = Number(limit) || 0
    if(isPaging) {
      if(search) {
        res = await this.ctx.model.Address.find({name: { $regex: search } }).skip(skip).limit(count).sort({ createdAt: -1 }).exec()
        total = res.length
      } else {
        res = await this.ctx.model.Address.find({}).skip(skip).limit(count).sort({ createdAt: -1 }).exec()
        total = await this.ctx.model.Address.count({}).exec()
      }
    } else {
      if(search) {
        res = await this.ctx.model.Address.find({name: { $regex: search } }).sort({ createdAt: -1 }).exec()
        total = res.length
      } else {
        res = await this.ctx.model.Address.find({}).sort({ createdAt: -1 }).exec()
        total = await this.ctx.model.Address.count({}).exec()
      }
    }
    // 整理数据源 -> Ant Design Pro
    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })

    return { total: total, items: data, limit: count, offset: skip }
  }

  // removes======================================================================================================>
  async removes(values) {
    return this.ctx.model.Address.remove({ _id: { $in: values } })
  }

  // Commons======================================================================================================>
  async find(id) {
    return this.ctx.model.Address.findById(id)
  }

}

module.exports = AddressService

