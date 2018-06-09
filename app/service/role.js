const Service = require('egg').Service

class RoleService extends Service {
  // create======================================================================================================>
  async create(payload) {
    return this.ctx.model.Role.create(payload) 
  }

  // destroy======================================================================================================>  
  async destroy(_id) {
    const { ctx, service } = this
    const role = await ctx.service.role.find(_id)
    if (!role) {
      ctx.throw(404, 'role not found')
    }
    return ctx.model.Role.findByIdAndRemove(_id)
  }

  // update======================================================================================================>
  async update(_id, payload) {
    const { ctx, service } = this
    const role = await ctx.service.role.find(_id)
    if (!role) {
      ctx.throw(404, 'role not found')
    }
    return ctx.model.Role.findByIdAndUpdate(_id, payload)
  }

  // show======================================================================================================>
  async show(_id) {
    const role = await this.ctx.service.role.find(_id)
    if (!role) {
      this.ctx.throw(404, 'role not found')
    }
    return this.ctx.model.Role.findById(_id)
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
        res = await this.ctx.model.Role.find({name: { $regex: search } }).skip(skip).limit(count).sort({ createdAt: -1 }).exec()
        total = res.length
      } else {
        res = await this.ctx.model.Role.find({}).skip(skip).limit(count).sort({ createdAt: -1 }).exec()
        total = await this.ctx.model.Role.count({}).exec()
      }
    } else {
      if(search) {
        res = await this.ctx.model.Role.find({name: { $regex: search } }).sort({ createdAt: -1 }).exec()
        total = res.length
      } else {
        res = await this.ctx.model.Role.find({}).sort({ createdAt: -1 }).exec()
        total = await this.ctx.model.Role.count({}).exec()
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
    return this.ctx.model.Role.remove({ _id: { $in: values } })
  }

  // Commons======================================================================================================>
  async find(id) {
    return this.ctx.model.Role.findById(id)
  }

}

module.exports = RoleService