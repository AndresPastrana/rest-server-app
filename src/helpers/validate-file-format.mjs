import path from 'path'
export const isFormat = (file, allowedExt)=>{
    const {originalname=''} = file;
    const ext = path.extname(originalname)
    return allowedExt.includes(ext);
} 