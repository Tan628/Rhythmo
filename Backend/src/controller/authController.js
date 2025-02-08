import{ User } from "../Model/userModel.js";

export const authCallback =  async (req, res,next) => {
    try {
      const { id, firstName, lastName, imageUrl } = req.body;
  
      const user = await User.findOne({ clerkid: id });
  
      if (!user) {
        const newUser = await user.create({
          clerkid: id,
          fullName: `${firstName} ${lastName}`,
          imageURI: imageUrl
        });
        res.status(201).json({ newUser });
      } else {
        res.status(200).json({ user });
      }
    } catch (error) {
      console.log("Error", error);
      next(error);
  }
};
// Compare this snippet from Backend/src/controller/songController.js: