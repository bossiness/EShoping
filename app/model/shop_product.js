module.exports = app => {
  const mongoose = app.mongoose
  const conn = app.mongooseDB.get('desk')

  const ShopProductSchema = new mongoose.Schema({
    taxons: Array,
    pricesRatio: Number,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
  })

  return conn.model('ShopProduct', ShopProductSchema)
}
