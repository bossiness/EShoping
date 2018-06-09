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

  async findByUserName(username) {
    return this.ctx.model.AdminUser.findOne({username: username})
  }
}

module.exports = AdminUserService;


