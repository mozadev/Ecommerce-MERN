const { User } = require("../models/user");
const { auth, isUser, isAdmin } = require("../middleware/auth");
const moment = require("moment");

const router = require("express").Router();
const bcrypt = require("bcrypt");
// GET ALL USERS

router.get("/", isAdmin, async (req, res) => {
  try {
    const users = await User.find().sort({ _id: -1 });
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

//DELETE

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    res.status(200).send(deletedUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET USER
router.get("/find/:id", isUser, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// UPDATE USER

router.put("/:id", isUser, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    console.log("USER=>", user);

    console.log("BODYPASSWORD=>", req.body.password);
    console.log("EMAIL=>", req.body.email);
    console.log("ISADMIN=>", req.body.isAdmin);
    console.log("USERPASSWORD=>", user.password);

    if (!(user.email === req.body.email)) {
      const emailInUse = await User.findOne({ email: req.body.email });
      console.log("email=>", emailInUse);
      if (emailInUse)
        return res.status(400).send("That email is already taken....");
      console.log("emailFALLANDO=>");
    }

    if (req.body.password && user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      console.log("hashedPassword=>", hashedPassword);
      user.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
        password: user.password,
      },
      {
        new: true,
      }
    );

    res.status(200).send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// GET USER STATS

router.get("/stats", isAdmin, async (req, res) => {
  const previousMonth = moment()
    .month(moment().month() - 1)
    .set("date", 1)
    .format("YYYY-MM-DD HH:mm:ss");

  try {
    const users = await User.aggregate([
      {
        $match: { createdAt: { $gte: new Date(previousMonth) } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).send(users);
  } catch (err) {
    console.log(err);

    res.status(500).send(err);
  }
});

module.exports = router;
