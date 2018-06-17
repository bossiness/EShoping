
module.exports = app => {
  const mongoose = app.mongoose
  const conn = app.mongooseDB.get('desk')

  const ShopDetailsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    logo: { type: String, default: 'https://s.gravatar.com/avatar/fd9e718afb3867cdd6afd990bb059af8?s=80'},
    state: { type: String, enum: ['untreated','reviewing','completed'], default: 'untreated' },
    introduce: { type: String },
    applyAt: { type: Date },
    periodAt: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    owner: {
      username: String,
      nickname: String,
      phone: String,
      email: String
    },
    weixin: {
      wechatID: String,
      appID: String,
      appSecret: String,
      partnerID: String,
      partnerKey: String,
      appQRCode: String
    },
    physicals: [{
      name: String,
      location: {
        latitude: Number,
        longitude: Number
      },
      number: String,
      contactName: String,
      contactPhone: String,
      address: String,
      zipCode: String
    }]
  })

  return conn.model('ShopDetails', ShopDetailsSchema)
}
