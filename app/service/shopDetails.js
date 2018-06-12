'use strict';

const Service = require('egg').Service;

class ShopDetailsService extends Service {
  async create(payload) {
    return this.ctx.model.ShopDetails.create(payload)
  }

  async destroy(_id) {
    const { ctx, service } = this
    const shop = await ctx.service.shopDetails.find(_id)
    if (!shop) {
      ctx.throw(404, 'shop details not found')
    }
    return ctx.model.ShopDetails.findByIdAndRemove(_id)
  }

  async update(_id, payload) {
    const { ctx, service } = this
    const shop = await ctx.service.shopDetails.find(_id)
    if (!shop) {
      ctx.throw(404, 'shop not found')
    }
    return ctx.model.ShopDetails.findByIdAndUpdate(_id, payload)
  }

  async show(_id) {
    const shop = await this.ctx.service.shopDetails.find(_id)
    if (!shop) {
      this.ctx.throw(404, 'shop not found')
    }
    return this.ctx.model.ShopDetails.findById(_id)
  }

  async index(payload) {
    const { offset, limit, isPaging, search } = payload
    let res = []
    let total = 0
    let skip = Number(offset) || 0
    let count = Number(limit) || 0
    if(isPaging) {
      if(search) {
        res = await this.ctx.model.ShopDetails.find({name: { $regex: search } }).skip(skip).limit(count).sort({ createdAt: -1 }).exec()
        total = res.length
      } else {
        res = await this.ctx.model.ShopDetails.find({}).skip(skip).limit(count).sort({ createdAt: -1 }).exec()
        total = await this.ctx.model.ShopDetails.count({}).exec()
      }
    } else {
      if(search) {
        res = await this.ctx.model.ShopDetails.find({name: { $regex: search } }).sort({ createdAt: -1 }).exec()
        total = res.length
      } else {
        res = await this.ctx.model.ShopDetails.find({}).sort({ createdAt: -1 }).exec()
        total = await this.ctx.model.ShopDetails.count({}).exec()
      }
    }

    let data = res.map((e,i) => {
      const jsonObject = Object.assign({}, e._doc)
      jsonObject.key = i
      jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt)
      return jsonObject
    })

    return { total: total, items: data, limit: count, offset: skip }
  }

  async removes(values) {
    return this.ctx.model.ShopDetails.remove({ _id: { $in: values } })
  }

  async find(id) {
    return this.ctx.model.ShopDetails.findById(id)
  }
}

module.exports = ShopDetailsService;

