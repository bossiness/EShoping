const moment = require('moment')

// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD hh:mm:ss')

// 处理成功响应
exports.success = ({ ctx, res = null, msg = 'OK' })=> {
  ctx.body = {
    code: 0,
    data: res,
    msg
  }
  ctx.status = 200
}

exports.OK = ({ctx, res = null}) => {
  ctx.body = res;
  ctx.status = 200;
}

exports.CREATED = ({ctx, res = null}) => {
  ctx.body = res;
  ctx.status = 201;
}

exports.NOCONTENT = ({ctx}) => {
  ctx.status = 204;
}

exports.notExtended = ({ctx}) => {
  ctx.status = 510;
}