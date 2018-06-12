

module.exports = app => {
    const mongoose = app.mongoose
    const conn = app.mongooseDB.get('desk');
    
    const AdminUserSchema = new mongoose.Schema({
      username: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      realName: { type: String, required: true },
      phone: { type: String },
      email: { type: String },
      role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
      portrait: { type: String, default: 'https://s.gravatar.com/avatar/fd9e718afb3867cdd6afd990bb059af8?s=80'},
      createdAt: { type: Date, default: Date.now }
    })
  
    return conn.model('AdminUser', AdminUserSchema)
}