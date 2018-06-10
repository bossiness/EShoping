module.exports = app => {
  const mongoose = app.mongoose
  const conn = app.mongooseDB.get('desk');


  const FashionSchema = new mongoose.Schema({
    actionName: { type: String, unique: true, required: true },
    actionDesc: { type: String, required: true },
    image: { type: String, required: true, default: 'http://btdxcx.com:3012/image/F2B6DA3A531A7C3E' },
    date:{ type: Date, required: true, default: Date.now },

    actionDetail:[{
      actionDesc: { type: String, required: true },
      image: { type: String, required: true, default: 'http://btdxcx.com:3012/image/F2B6DA3A531A7C3E' },
    }],




    add:{ type: String, required: true, default: '' },
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now }
  })

  return conn.model('Fashion', FashionSchema)
}
