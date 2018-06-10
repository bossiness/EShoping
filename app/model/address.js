module.exports = app => {
  const mongoose = app.mongoose
  const conn = app.mongooseDB.get('desk');


  const AddressSchema = new mongoose.Schema({
    name: { type: String,  required: true },
    phone: { type: String, required: true },
    isDefault: { type: Boolean, required: true, default: false },






    address:{ type: String, required: true, default: '' },
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now }
  })

  return conn.model('Address', AddressSchema)
}
