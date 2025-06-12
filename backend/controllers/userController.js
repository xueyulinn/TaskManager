import Task from "../models/Task.js";
import User from "../models/User.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "member" }).select("-password");
    const enrichedUsers = await Promise.all(
      users.map(async (user) => {
        const pendingTasks = await Task.countDocuments({
          assignedTo: user.id,
          status: "Pending",
        });
        const inProgressTasks = await Task.countDocuments({
          assignedTo: user.id,
          status: "In Progress",
        });
        const completedTasks = await Task.countDocuments({
          assignedTo: user.id,
          status: "Completed",
        });

        return {
          ...user.toObject(),
          pendingTasks,
          inProgressTasks,
          completedTasks,
        };
      })
    );
    res.json(enrichedUsers);
  } catch (error) {
    res.json({ message: error.message });
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.json(user);
    } else return res.status(404).json({ message: "User not found" });
  } catch (error) {
    res.json({ message: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    await User.deleteOne(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export { getAllUsers, getUserById, deleteUser };
