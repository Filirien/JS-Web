const encryption = require('../utilities/encryption')
const services = require('../services')

module.exports = {
  register: (req, res) => {
    let reqUser = req.body
    let jsonUser

    let salt = encryption.generateSalt()
    let hashedPassword = encryption.generateHashedPassword(salt, reqUser.password)

    services.users.register(reqUser, salt, hashedPassword).then(user => {
      jsonUser = user
      req.logIn(user, (err, user) => {
        if (err) {
          return res.json(err)
        }
        res.json(jsonUser)
      })
    }).catch(err => {
      return res.json(err)
    })
  },
  login: (req, res) => {
    let reqUser = req.body
    let jsonUser
    services.users.login(reqUser).then(user => {
      if (!user) {
        return res.json('Invalid username')
      }

      if (!user.authenticate(reqUser.password)) {
        return res.json('Invalid password')
      }
      jsonUser = user
      req.logIn(user, (err, user) => {
        if (err) {
          return res.json(err)
        }
        res.json(jsonUser)
      })
    })
  },
  logout: (req, res) => {
    req.logout()
    res.json()
  },
  allUsers: async (req, res) => {
    res.json(await services.users.allUsers())
  },
  update: async (req, res) => {
    let newUser = req.body
    await services.users.update(newUser._id, newUser)
    res.json({ message: 'User updated!' })
  }
}
