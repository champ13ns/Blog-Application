import Comment, { comment } from "../model/comment.js"   
export const newComment = async(req,res)=>{
    try{
        const comment =  await new Comment(req.body);
        comment.save();

        res.status(200).json({msg:"Comment saved successfully"})
    } catch(err){
        res.status(500).json({msg:err.message})
    }
}


export const testing = async(req,res) => {
    res.json("hello world")
}


// export const getComment= async (req,res) => {
//     res.json("comment route")
//     console.log(req.params.id)
//     const comments = await Comment.find({postId:req.params.id}, function(err,comment){
//         if(err) {
//             res.status(500).json({err})
//         }
//         res.json("hello")
      
//     })
    
// }

export const getAllComments = async (req, response) => {
        console.log(req.params.id);
        const comments = await Comment.find({ postId: req.params.id });
        console.log(comments);
    
        response.status(200).json(comments);
 
}

export const deleteComment = async(req,res)=>{
    try{
       let comment =  await Comment.findById(req.params.id);
       if(!comment){
            res.status(500).json('Comment not found')
       }
       await comment.delete();
       res.status(200).json('Comment Deleted Successfully')

    } catch(err){
        res.status(500).json(err)
    }
}


export const getComments = async(req,res)=>{
    try{
         const comments =   await Comment.find({postId : req.params.id});
         console.log("comments is ",comments)
         res.status(200).json(comments)
    }catch(err){
        res.status(500).json(err)
    }
}
