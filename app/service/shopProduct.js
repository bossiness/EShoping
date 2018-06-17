'use strict'

const Service = require('egg').Service
const _ = require('lodash')

class ShopProductService extends Service {
  async create(payload) {
    const { ctx, service } = this
    const role = await service.product.show(payload.product)
    if (!role) {
      ctx.throw(404, 'product is not found')
    }
    return ctx.model.ShopProduct.create(payload)
  }

  async destroy(_id) {
    const { ctx, service } = this
    const shop = await ctx.service.shopProduct.find(_id)
    if (!shop) {
      ctx.throw(404, 'ShopProduct not found')
    }
    return ctx.model.ShopProduct.findByIdAndRemove(_id)
  }

  async update(_id, payload) {
    const { ctx, service } = this
    const shop = await ctx.service.shopProduct.find(_id)
    if (!shop) {
      ctx.throw(404, 'ShopProduct not found')
    }
    return ctx.model.ShopProduct.findByIdAndUpdate(_id, payload)
  }

  async show(_id) {
    const shop = await this.ctx.service.shopProduct.find(_id)
    if (!shop) {
      this.ctx.throw(404, 'ShopProduct not found')
    }
    return this.ctx.model.ShopProduct.findById(_id)
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
        res = await this.ctx.model.ShopProduct.find({name: { $regex: search } }).populate('product')
          .skip(skip).limit(count).sort({ createdAt: -1 }).exec()
        total = res.length
      } else if (require) {
        res = await this.ctx.model.ShopProduct.find(require).populate('product')
          .skip(skip).limit(count).sort({ createdAt: -1 }).exec()
        total = await this.ctx.model.ShopProduct.count({}).exec()
      } else {
        res = await this.ctx.model.ShopProduct.find({}).populate('product')
          .skip(skip).limit(count).sort({ createdAt: -1 }).exec()
        total = await this.ctx.model.ShopProduct.count({}).exec()
      }
    } else {
      if(search) {
        res = await this.ctx.model.ShopProduct.find({})
          .populate({
            path: 'product',
            match: { name: { $regex: search }}
          })
          .sort({ createdAt: -1 }).exec()
        total = res.length
      } else if (require) {
        res = await this.ctx.model.ShopProduct.find(require)
          .populate('product')
          .sort({ createdAt: -1 }).exec()
        total = await this.ctx.model.ShopProduct.count({}).exec()
      } else {
        res = await this.ctx.model.ShopProduct.find({}).populate('product')
          .sort({ createdAt: -1 }).exec()
        total = await this.ctx.model.ShopProduct.count({}).exec()
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
    return this.ctx.model.ShopProduct.remove({ _id: { $in: values } })
  }

  async find(id) {
    return this.ctx.model.ShopProduct.findById(id)
  }
}

module.exports = ShopProductService
