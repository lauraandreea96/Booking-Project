import express from "express";
import { countUsers, deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

//check authentification
// router.get("/checkauthentification", verifyToken, (req, res, next)=>{
//     res.send("hello user, you are logged in!")
// });

//update
router.put("/:id",verifyUser, updateUser)

//delete
router.delete("/:id", verifyUser, deleteUser)


//get
router.get("/:id", verifyUser, getUser)

//get all
router.get("/",verifyAdmin, getUsers);

router.get("/count/allUsers",verifyAdmin, countUsers);

export default router;