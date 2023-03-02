import express from "express";
import { loginUser, SignUpUser } from "../controller/userController.js";
import { createPost , getAllPosts , getPost , updatePost , deletePost  } from '../controller/post-controller.js';
import { uploadImage, getImage } from "../controller/imageController.js";
import { authenticateToken } from "../controller/jwt-controller.js";
import upload from "../utils/upload.js";
import { newComment  , deleteComment, getComments} from "../controller/commentController.js";
// import { multer } from 'multer'

const router = express.Router();    

router.post("/signup", SignUpUser);
router.post("/login", loginUser);
router.post("/file/upload", upload.single("file"), uploadImage);
router.get("/file/:filename", getImage);
router.post('/createPost', authenticateToken, createPost);
router.get('/posts' , authenticateToken , getAllPosts);
router.get('/post/:id' , authenticateToken, getPost);
router.put('/update/:id' , authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken , deletePost);
router.post('/comment/new' , authenticateToken , newComment);
router.get("/comments/:id" , getComments);


// router.get('/comment/:id'  ,getComments);
router.delete('/comment/delete/:id' , authenticateToken , deleteComment)

export default router;
