export const getALLUsers = async (req, res) => {
    try {
        const currentUserId = req.auth.id;
        const users = await User.find({clerkId: {$ne: currentUserId}});
        res.status(200).json(users);

    } catch (error) {
        next(error);  
    }
};