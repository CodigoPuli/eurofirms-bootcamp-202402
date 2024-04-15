import mongoose from 'mongoose'
import express from 'express'

const { Schema, model } = mongoose

const { Types: { ObjectId } } = Schema

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }
})

const post = new Schema({
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    image: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

const User = model('User', user)
const Post = model('Post', post)

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => {
        console.log('DB connected')

        function registerUser(name, birthdate, email, username, password) {
            // TODO input validation

            return User.findOne({ $or: [{ email }, { username }] })
                .catch(error => { throw new Error })
                .then(user => { throw new Error(error.message) })
                .then(user => {

                    if (user) throw new Error('user already exists')

                    user = { name, birthdate, email, username, password }

                    return User.create(user)
                })

                .then(user => { })
        }

        //try {
        // registerUser('Pepito Grillo', '2000-01-01', 'pepito@grillo.com', 'pepitogrillo', '123123123')
        //          .then(() => console.log('user registered'))
        //          .catch(error => console.error(error))
        //  } catch (error) {
        //         console.error(error)
        // }

        // console.log('continue after registerUser call')

        // function loginUser(username, password, callback) {
        //     // TODO input validation

        //     users.findOne({ username })
        //         .then(user => {
        //             if (!user) {
        //                 callback(new Error('user not found'))

        //                 return
        //             }

        //             if (user.password !== password) {
        //                 callback(new Error('wrong credentials'))

        //                 return
        //             }

        //             callback(null, user._id.toString())
        //         })
        //         .catch(error => callback(error))
        // }

        // loginUser('pepephone', '123qwe123', (error, userId) => {
        //     if (error) {
        //         console.error(error)

        //         return
        //     }

        //     console.log('user logged in', userId)
        // })

        // console.log('continue after loginUser call')

        // function retrieveUser(userId, callback) {
        // TODO input validation

        //users.findOne({ _id: new ObjectId(userId) }, { projection: { _id: 0, birthdate: 0, email: 0, password: 0 } })
        //   .then(user => {
        //       if (!user) {
        //                callback(new Error('user not found'))

        //      return
        //      }
    

            // sanitize (not needed if using projection)
            // delete user._id
            // delete user.email
            // delete user.password

      //      callback(null, user)
      //  })
   // .catch(error => callback(error))
// }

// retrieveUser('6617c3ad89de5e9374288e40', (error, user) => {
//     if (error) {
//         console.error(error)

//         return
//     }

//     console.log('user retrieved', user)
// })

// console.log('continue after retrieveUser call')

// function createPost(userId, image, text, callback) {
//     // TODO input validation

//     users.findOne({ _id: new ObjectId(userId) })
//         .then(user => {
//             if (!user) {
//                 callback(new Error('user not found'))

//                 return
//             }

//             const post = {
//                 author: user._id,
//                 image,
//                 text,
//                 date: new Date
//             }

//             posts.insertOne(post)
//                 .then(() => callback(null))
//                 .catch(error => callback(error))
//         })
//         .catch(error => callback(error))
// }

// createPost('6617c3ad89de5e9374288e3f', 'https://www.boardinfinity.com/blog/content/images/2023/01/Mern.png', 'hello mern', error => {
//     if (error) {
//         console.error(error)

//         return
//     }

//     console.log('post created')
// })

// console.log('continue after createPost call')

// function retrievePosts(userId, callback) {
//     // TODO input validations

//     users.findOne({ _id: new ObjectId(userId) })
//         .then(user => {
//             if (!user) {
//                 callback(new Error('user not found'))

//                 return
//             }

//             let errorHappened = false
//             let postsProcessedCount = 0

//             posts.find({}).toArray()
//                 .then(posts => {
//                     posts.forEach(post => {
//                         users.findOne({ _id: post.author }, { projection: { username: 1 } })
//                             .then(user => {
//                                 if (errorHappened) return

//                                 if (!user) {
//                                     callback(new Error('owner user not found'))

//                                     errorHappened = true

//                                     return
//                                 }

//                                 post.id = post._id.toString()
//                                 delete post._id

//                                 const author = {
//                                     id: post.author.toString(),
//                                     username: user.username
//                                 }

//                                 post.author = author

//                                 postsProcessedCount++

//                                 if (postsProcessedCount === posts.length)
//                                     callback(null, posts)
//                             })
//                             .catch(error => callback(error))
//                     })
//                 })
//                 .catch(error => callback(error))
//         })
//         .catch(error => callback(error))
// }

// retrievePosts('6617c3ad89de5e9374288e40', (error, posts) => {
//     if (error) {
//         console.error(error)

//         return
//     }

//     console.log('retrieved posts', posts)
// })

// console.log('continue after retrievePosts call')

// SERVER

const server = express()

// server.get('/', (req, res) => res.json({ hello: 'client' }))

// server.get('/users/:userId', (req, res) => {
//   const userId = req.params.userId

//   retrieveUser(userId, (error, user) => {
//       if (error) {
//           res.status(404).json({ error: error.constructor.name, message: error.message })

//           return
//       }

//        res.json(user)
//   })
// })

const jsonBodyParser = express.json() // JSON.parse(...)

server.post('/users', jsonBodyParser, (req, res) => {
    const { name, birthdate, email, username, password } = req.body

    try {
        registerUser(name, birthdate, email, username, password)
            .then(() => res.status(201).send())
            .catch(error => res.status(500).json({ error: error.constructor.name, message: error.message }))
    } catch (error) {
        res.status(500).json({ error: error.constructor.name, message: error.message })
    }
})

    

server.listen(8080, () => console.log('API started'))
})

    .catch (error => console.error(error))