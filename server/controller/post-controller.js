import Post from "./../model/post.js"
export const createPost = async(req,res) => {
    try{
        const post = await new Post(req.body);
        post.save();
        return res.status(200).json({
            msg:"post saved successfully"
        })
    }
     catch(err){
        return res.status(500).json({
            err:err
        })
     }
}

export const getAllPosts = async(req,res) => {
    let category = req.query.category;
    let posts;
    try{
        if(category){
            posts = await Post.find({categories: category})
        } else{
         posts =  await Post.find({});
        }
        // console.log("all posts from db are ",posts);
        return res.status(200).json(posts);
    } catch(err){
        return res.json({err})
    }
}

export const getPost = async(req,res)=>{
    try{
        console.log("id is ", req.params.id);
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    } catch(err){
        return res.status(500).json(err)
    }
}

export const updatePost = async(req,res)=>{
    try{
        console.log(req.params.id);
        const post = await Post.findById(req.params.id);
        console.log("post is ",post);
        if(!post){
            return res.status(404).json({msg:'post not found'})
        }
        await Post.findByIdAndUpdate(req.params.id , {$set : req.body}) 
        return res.status(200).json({msg:'post updated successfully'})   
    } catch(err){
        return res.status(500).json({err : err.message})
    }
}

export const deletePost = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg:'post not found'})
        }
        await post.delete();
        return res.status(200).json({msg : 'Post deleted successfully'})
    } catch(err){
        return res.status(500).json({err:err.message})
    }
}
