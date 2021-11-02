import express from "express"
import q2m from "query-to-mongo"
import AuthorModel from "./schema.js"
import { basicAuthMiddleware } from "../../auth/basic.js"
import BlogModel from "../blogPosts/schema.js";

const AuthorsRouter = express.Router()

AuthorsRouter.post("/", async (req, res, next)=>{
    try {
        const newAuthor = new AuthorModel(req.body)
        const { _id } =await newAuthor.save()
        res.status(201).send({_id})
        
    } catch (error) {
        next(error)
    }
})

// AuthorsRouter.get("/", async (req, res, next) => {
//   try {
//     const query = q2m(req.query)

//     const total = await AuthorModel.countDocuments(query.criteria)
//     const authors = await AuthorModel.find(query.criteria, query.options.fields)
//       .limit(query.options.limit)
//       .skip(query.options.skip)
//       .sort(query.options.sort)

//     res.send({ links: query.links("/authors", total), total, authors, pageTotal: Math.ceil(total / query.options.limit) })
//   } catch (error) {
//     next(error)
//   }
// })

AuthorsRouter.get("/", async (req, res, next) => {
  try {
    const authors = await AuthorModel.find()
    res.send(authors)
  } catch (error) {
    next(error)
  }
})

AuthorsRouter.get("/:authorId", basicAuthMiddleware, async (req, res, next) => {
  try {
    const author = await AuthorModel.findById(req.params.authorId)
    res.send(author)
  } catch (error) {
    next(error)
  }
})

// AuthorsRouter.get("/me/stories", basicAuthMiddleware, async (req, res, next) => {
//   try {
    
//     const posts = await BlogModel.find({ authors: req.author._id })
//     console.log("ID ->", req.author._id)
//     res.status(200).send(posts)

//   } catch (error) {
//     next(error)
//   }
// })

export default AuthorsRouter