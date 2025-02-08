// export {router} from "express";
// import {createSong} from "../controller/adminController.js";
// import {protectRoute, requireAdmin} from "../middleware/authMiddleware.js";

// const router = Router();
// router.get("/", protectRoute,requireAdmin,createSong);
// export default router;
import {Song} from "../Model/songModel.js";
import {Album} from "../Model/albumModel.js";
import cloudinary from "../lib/cloudinary.js"

const uploadToCloudinary = async (file) => {
    try{
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto",
        }
        );return result.secure_url;
    }catch(error){
        console.log("Error", error);
        throw new Error("Error Uploading file to cloudinary");
    }
};

export const createSong = async (req, res,next) => {
    try {
        if (!req.files ||!req.files.song || !req.files.imageFile) {
            return res.status(400).send("please upload all file");
        }
        const { title, artist, albumId, duration } = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);

        const song = new song({
            title,
            artist,
            audioUrl,
            albumId : albumId || null,
            duration,
            imageUrl,
            });
        await song.save();
        
        if(albumId){
            await Album.findByIdAndUpdate(albumId, {$push: {songs: song._id}});

        }
        res.status(201).json({ song });
    } catch (error) { 
        console.log("Error", error);
       next(error);
    }

};  

export const deleteSong = async (req, res,next) => {
    try {
        const { id } = req.params;

        const song = await Song.findById(id);
        
        //if song belong to an album, update it from the album
        if (song.albumId) {
            await Album.findByIdAndUpdate(song.albumId, {
                 $pull: { songs: song._id },
                 } )
        }     

        await song.findByIdAndDelete(id)

        res.status(200).json({ message : "Song deleted successfully" });
        
    } catch (error) {
        console.log("Error in deletingSong", error);
        next(error);
    }
};


export const createAlbum = async (req, res,next) => {
    try {
        const { title, artist,releaseYear } = req.body;
        const imageFile = req.files.imageFile;

        const imageUrl = await uploadToCloudinary(imageFile);

        const album = new Album({
            title,
            artist,
            imageUrl,
            releaseYear
            });


        await album.save();
        
        res.status(201).json({ album });
    } catch (error) { 
        console.log("Error", error);
       next(error);
    }
};

export const deleteAlbum = async (req, res,next) => {
    try {
        const { id } = req.params;

        await Song.deleteMany({ albumId: id });
        await Album.findByIdAndDelete(id)

        res.status(200).json({ message : "Album deleted successfully" });
        
    } catch (error) {
        console.log("Error in deletingAlbum", error);
        next(error);
    }
};

export const checkAdmin = async (req, res) => {
    res.status(200).json({ admin: true });
};