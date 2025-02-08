import { User } from "../Model/userModel.js";
import { Song } from "../Model/songModel.js";
import { Album } from "../Model/albumModel.js";

export const getStats = async(req,res)=>{
    try {
      const [totalSongs, totalUsers, totalAlbums] = await Promise.all(
        [Song.countDocuments(),
         User.countDocuments(), 
         Album.countDocuments(),

         Song.aggregate([
          {$unionWith:{coll:"albums",pipeline:[]}},
          {$count:"count"},
          {$group:{_id:"$artist"}}
         ])
        ]);
        res.status(200).json({totalSongs, totalUsers, totalAlbums,totalArtists:totalArtists[0]?.count || 0})

    } catch (error) {
      next(error);
    }
};