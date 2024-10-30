const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bucket = require("../config/firebase-config")

exports.readAFile = async(req, res) => {
    try{
        const id = parseInt(req.params.id, 10);
        if(!id){
            return res.status(400).json({error: "Provide file id to read file content"})
        }
    
        const fileRecord = await prisma.file.findUnique({
            where: {id: id}
        })
    
        if(!fileRecord){
            return res.status(404).json({error: "File not found"})
        }

        const file = bucket.file(fileRecord.fileName);
        const [fileContent] = await file.download(); 
    
        res.status(200).json({ content: fileContent.toString() })
    } catch(err){
        console.error(err)
        return res.status(500).json({error: "Internal Server Error"})
    }
}

