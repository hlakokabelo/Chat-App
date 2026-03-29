import User from "../models/user.model.js";

const searcUsers = async (req, res) => {
  try {
    const { q } = req.query;

    const user = await User.find({
      fullName: new RegExp(q,'i'),
    }).select("-password");

    res.status(200).json( user );
  } catch (error) {
    console.error("Error in searchUsers controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { searcUsers };
