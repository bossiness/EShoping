'use strict'

const Service = require('egg').Service
const _ = require('lodash')

class ProductService extends Service {
  async create(payload) {
    return this.ctx.model.Product.create(payload)
  }

  async destroy(_id) {
    const { ctx, service } = this
    const shop = await ctx.service.product.find(_id)
    if (!shop) {
      ctx.throw(404, 'product not found')
    }
    return ctx.model.Product.findByIdAndRemove(_id)
  }

  async update(_id, payload) {
    const { ctx, service } = this
    const shop = await ctx.service.product.find(_id)
    if (!shop) {
      ctx.throw(404, 'product not found')
    }
    return ctx.model.Product.findByIdAndUpdate(_id, payload)
  }

  async show(_id) {
    const shop = await this.ctx.service.product.find(_id)
    if (!shop) {
      this.ctx.throw(404, 'product not found')
    }
    return this.ctx.model.Product.findById(_id)
  }

  async index(payload) {
    const { offset, limit, isPaging, search } = payload
    let res = []
    let total = 0
    let skip = Number(offset) || 0
    let count = Number(limit) || 20

    let require = payload
    _.unset(require, 'offset')
    _.unset(require, 'limit')
    _.unset(require, 'isPaging')
    _.unset(require, 'search')

    if(isPaging) {
      if(search) {
        res = await this.ctx.model.Product.find({name: { $regex: search } }).skip(skip).limit(count).sort({ createdAt: -1 }).exec()
        total = res.length
      } else if (require) {
        res = await this.ctx.model.Product.find(require).skip(skip).limit(count).sort({ createdAt: -1 }).exec()
        total = await this.ctx.model.Product.count({}).exec()
      } else {
        res = await this.ctx.model.Product.find({}).skip(skip).limit(count).sort({ createdAt: -1 }).exec()
        total = await this.ctx.model.Product.count({}).exec()
      }
    } else {
      if(search) {
        res = await this.ctx.model.Product.find({name: { $regex: search } }).sort({ createdAt: -1 }).exec()
        total = res.length
      } else if (require) {
        res = await this.ctx.model.Product.find(require).sort({ createdAt: -1 }).exec()
        total = await this.ctx.model.Product.count({}).exec()
      } else {
        res = await this.ctx.model.Product.find({}).sort({ createdAt: -1 }).exec()
        total = await this.ctx.model.Product.count({}).exec()
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
    return this.ctx.model.Product.remove({ _id: { $in: values } })
  }

  async find(id) {
    return this.ctx.model.Product.findById(id)
  }
}

module.exports = ProductService
