const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bucket = require("../config/firebase-config");


//create a file
exports.createFile = async (req, res) => {
  const { fileName, content } = req.body;
  const userId = req.userId;

  if(!fileName){
    return res.status(400).json({error: "File name is required."})
  }

  try {
    const file = bucket.file(fileName);
    await file.save(content, {contentType: 'text/plain'});

    const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media`;

    const fileRecord = await prisma.file.create({
      data: {
        fileName,
        filePath: fileUrl,
        ownerId: userId,
      },
    });
    res.status(201).json(fileRecord);
  } catch (error) {
    console.error("Error creating file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//retrieve a file by id
exports.getFileById = async(req, res) => {
  const id = parseInt(req.params.id, 10);

  if(!id){
    return res.status(400).json({error: "File id required"})
  }

  try{
    const exists = await prisma.file.findUnique({
      where: {id: id}
    })

    if(!exists){
      return res.status(404).json({error: "File not found"})
    }

    return res.status(200).json(exists)
  } catch(err){
    return res.status(500).json({error : "Internal Server Error"})
  }
}


//retrieve all files
exports.getAllFiles = async(req, res) => {
  try{
    const all = await prisma.file.findMany();
    return res.status(200).json({"Files":all})
  } catch(err){
    return res.status(500).json({error: "Internal Server Error"})
  }
  
}


//delete file by id
exports.deleteFileById = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (!id) {
    return res.status(400).json({ error: "File id is required" });
  }

  try {
    const exists = await prisma.file.findUnique({
      where: { id: id },
    });

    if (!exists) {
      return res.status(404).json({ error: "File not found in database" });
    }

    const file = bucket.file(exists.fileName);

    try {
      await file.delete();
    } catch (storageError) {
      if (storageError.code === 404) {
        return res.status(404).json({ error: "File not found in cloud storage" });
      } else {
        console.error(storageError);
        return res.status(500).json({ error: "Error deleting file from cloud storage" });
      }
    }

    const deleted = await prisma.file.delete({
      where: { id: id },
    });
    return res.status(200).json({ message: `File with id ${id} deleted successfully` });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};



