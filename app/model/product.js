module.exports = app => {
  const mongoose = app.mongoose
  const conn = app.mongooseDB.get('desk');

  const ProductSchema = new mongoose.Schema({
    spu: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    shopId: { type: String, required: true },
    description: { type: String },
    mainTaxon: { type: String, lowercase: true, trim: true },
    createdAt: { type: Date, default: Date.now },
    updateAt: { type: Date, default: Date.now },
    state: { type: String, enum: ['putaway', 'not'] },
    tags: [String],
    images: [{
      type: String,
      path: String,
    }],
    attributes: [{
      code: String,
      value: String
    }],
    options: [{
      code: String,
      options: [String]
    }],
    variants: [{
      sku: { type: String, required: true },
      name: String,
      pricing: {
        current: Number,
        original: Number
      },
      stock: Number,
      optionValues: [String]
    }]

  })

  return conn.model('Product', ProductSchema)
}
