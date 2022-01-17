const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.APPLICATION_SECRET);
        const user = await User.findOne({ _id: decoded.id, email: decoded.email });
        if (!user) throw new Error();
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: "Please Authenticate First" });
    }
};
