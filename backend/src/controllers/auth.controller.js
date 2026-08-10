const authLogin = (req, res) => {
  try {
    return res.status(200).json({
      message: "Success",
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default authLogin;
