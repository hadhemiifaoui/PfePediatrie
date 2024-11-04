const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/users/user');
const SECRET = "hadhemiifaouimpis2";

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Authorization token required' });
  }
  const token = authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token not found in authorization header' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    const { _id } = decoded;

    if (!mongoose.isValidObjectId(_id)) {
      return res.status(401).json({ message: 'Invalid token ID' });
    }

    req.user = await User.findOne({ _id }).select('_id');
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }

    next(); 
  } catch (error) {
    console.error('Token verification error:', error); 
    res.status(401).json({ message: 'Request is not authorized' });
  }
};

module.exports = requireAuth;
