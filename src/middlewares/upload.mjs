export const allowFormats = (formats=['.jpg' ,'.mp4'])=>{
  return (req,resp,next)=>{
       req.allowedFormats = formats;
       return next();
}
}


