const Service = require('egg').Service

class TaxonsService extends Service {
  // create======================================================================================================>
  async create(payload) {
    return this.ctx.model.Taxons.create(payload)
  }

  // destroy======================================================================================================>
  async destroy(_id) {
    const { ctx, service } = this
    const index = await ctx.service.taxons.find(_id)
    if (!index) {
      ctx.throw(404, 'index not found')
    }
    return ctx.model.Taxons.findByIdAndRemove(_id)
  }

  // update======================================================================================================>
  async update(_id, payload) {
    const { ctx, service } = this
    const index = await ctx.service.taxons.find(_id)
    if (!index) {
      ctx.throw(404, 'index not found')
    }
    return ctx.model.Taxons.findByIdAndUpdate(_id, payload)
  }

  // show======================================================================================================>
  async show(_id) {
    const index = await this.ctx.service.taxons.find(_id)
    if (!index) {
      this.ctx.throw(404, 'index not found')
    }
    return this.ctx.model.Taxons.findById(_id)
  }

  // index======================================================================================================>
  async index(payload) {
    let _this = this;
    let data =  await this.ctx.model.Taxons.find({parentId:null});//获取一级菜单
    //构造分类菜单数据
    async function initChildren(datas) {
      await Promise.all(datas.map(async function(e,i) {
        let children = await _this.ctx.model.Taxons.find({parentId:e._id});
        datas[i]["children"] =  children;
        if(children.length>0){
          await initChildren(datas[i].children)
        }
      }));
    }
    await initChildren(data)
    return data

  }

  // removes======================================================================================================>
  async removes(values) {
    return this.ctx.model.Taxons.remove({ _id: { $in: values } })
  }

  // Commons======================================================================================================>
  async find(id) {
    return this.ctx.model.Taxons.findById(id)
  }

}

module.exports = TaxonsService
