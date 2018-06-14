module.exports = app => {
  const mongoose = app.mongoose
  const conn = app.mongooseDB.get('desk');

  const TaxonsSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    shopId: { type: String, required: true },
    description: { type: String, default: "" },
    parentId:  {type:mongoose.Schema.Types.ObjectId, ref:"Taxons",required: false},
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
    position:{type:Number,required:true,default: 0},
    children:[]
  })

  return conn.model('Taxons', TaxonsSchema)
}
