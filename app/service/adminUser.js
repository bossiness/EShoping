'use strict';

const Service = require('egg').Service;

class AdminUserService extends Service {
  async create(payload) {
    const { ctx, service } = this
    const role = await service.role.show(payload.role)
    if (!role) {
      ctx.throw(404, 'role is not found')
    }
    payload.password = await this.ctx.genHash(payload.password)
    return ctx.model.AdminUser.create(payload)
  }

  async destroy(_id) {
    const { ctx, service } = this
    const user = await ctx.service.adminUser.find(_id)
    if (!user) {
      ctx.throw(404, 'user not found')
    }
    return ctx.model.AdminUser.findByIdAndRemove(_id)
  }

  async show(_id) {
    const user = await this.ctx.model.AdminUser.findById(_id)
    if (!user) {
      this.ctx.throw(404, 'user not found')
    }
    return this.ctx.model.AdminUser.findById(_id).populate('role')
  }

  async update(_id, payload) {
    const { ctx, service } = this
    const user = await ctx.service.adminUser.find(_id)
    if (!user) {
      ctx.throw(404, 'user not found')
    }
    return ctx.model.AdminUser.findByIdAndUpdate(_id, payload)
  }

  async index(payload) {
    const { offset, limit, isPaging, search } = payload
    let res = []
    let total = 0
    let skip = Number(offset) || 0
    let count = Number(limit) || 20

    if(isPaging) {
      if(search) {
        res = await this.ctx.model.AdminUser.find({username: { $regex: search } }).populate('role').skip(skip).limit(count).sort({ createdAt: -1 }).exec()
        total = res.length
      } else {
        res = await this.ctx.model.AdminUser.find({}).populate('role').skip(skip).limit(count).sort({ createdAt: -1 }).exec()
        total = await this.ctx.model.AdminUser.count({}).exec()
      }
    } else {
      if(search) {
        res = await this.ctx.model.AdminUser.find({username: { $regex: search } }).populate('role').sort({ createdAt: -1 }).exec()
        total = res.length
      } else {
        res = await this.ctx.model.AdminUser.find({}).populate('role').sort({ createdAt: -1 }).exec()
        total = await this.ctx.model.AdminUser.count({}).exec()
      }
    }

    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.password = 'Are you ok?'
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })

    return { total: total, items: data, limit: count, skip: skip }
  }

  async removes(payload) {
    return this.ctx.model.AdminUser.remove({ _id: { $in: payload } })
  }

  async find(id) {
    return this.ctx.model.AdminUser.findById(id)
  }

  async findByUserName(username) {
    return this.ctx.model.AdminUser.findOne({username: username})
  }

  async current() {
    const { ctx, service } = this
    // ctx.state.user 可以提取到JWT编码的data
    const _id = ctx.state.user.data._id
    const user = await service.adminUser.find(_id)
    if (!user) {
      ctx.throw(404, 'user is not found')
    }
    user.password = 'How old are you?'
    return user
  }
}

module.exports = AdminUserService;


