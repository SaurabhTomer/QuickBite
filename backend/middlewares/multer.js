import multer from 'multer'

//multer is a middleware
const storage = multer.diskStorage({
    //destination tkaes three params req,file,callback i.e; req,file which we give and callback which perform next task
    destination: (req,file,cb) => {
        cb(null , '/public' )
    },
    //filename tkaes three params req,file,callback i.e; req,file which we give and callback takes original name of file
    filename: (req,file,cb) => {
        cb(null , file.originalname)
    },
})

export  const upload = multer({storage});