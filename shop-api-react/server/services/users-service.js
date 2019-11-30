const User = require('mongoose').model('User')

async function allUsers () {
  let users = await User.find({})
  return users
}

function login (user) {
  return User.findOne({ username: user.username })
}

function register (user, salt, hashedPass) {
  return User.create({
    username: user.username,
    name: user.name,
    email: user.email,
    salt: salt,
    hashedPass: hashedPass
  })
}

async function update (userId, newUser) {
  await User.findById(userId, (err, user) => {
    if (err) {
      console.log(err)
    }
    user.name = newUser.name
    user.email = newUser.email
    user.imgUrl = newUser.imgUrl
    user.favorites = newUser.favorites

    user.save((err) => {
      if (err) {
        console.log(err)
      }
    })
  })
}

module.exports = {
  allUsers,
  login,
  register,
  update
}
