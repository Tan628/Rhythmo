import { Song } from '../Model/songModel.js';

export const getALLSongs = async (req, res) => {
    try {
        //-1 =descending = latest song first
        //1 = ascending = oldest song first
        const songs = await Song.find().sort({createdAt: -1});
        res.json(songs);
    } catch (error) {
        next(error);
    }
};

export const getFeaturedSongs = async (req, res) => {
    try {
        //fetch 6 random songs using mDB aggregate pipeline
        const songs = await Song.aggregate([
            { $sample: { size: 6 } ,
            $project: {
                _id: 1,
                title: 1,
                artist: 1,
                imageUri: 1,
                audioUri: 1, 
            }
        }]);  
        res.json(songs);
    } catch (error) {
        next(error);
    }
}; 

export const getMadeForYouSongs = async (req, res) => {
    try {
        //fetch 6 random songs using mDB aggregate pipeline
        const songs = await Song.aggregate([
            { $sample: { size: 4 } ,
            $project: {
                _id: 1,
                title: 1,
                artist: 1,
                imageUri: 1,
                audioUri: 1, 
            }
        }]);  
        res.json(songs);
    } catch (error) {
        next(error);
    }
};

export const getTrendingSongs = async (req, res) => {
    try {
        //fetch 6 random songs using mDB aggregate pipeline
        const songs = await Song.aggregate([
            { $sample: { size: 6 } ,
            $project: {
                _id: 1,
                title: 1,
                artist: 1,
                imageUri: 1,
                audioUri: 1, 
            }
        }]);  
        res.json(songs);
    } catch (error) {
        next(error);
    }
};

