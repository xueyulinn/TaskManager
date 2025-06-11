import express from "express";
import { userSignin, userSignup } from "../controllers/authController.js";
import upload from "../middlewares/uploadMiddleWare.js";
const router = express.Router();

router.post("/signup", userSignup);
router.post("/signin", userSignin);

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ imageUrl });
});
export default router;
