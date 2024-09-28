const Review = require('../models/situation_cliniques/review');
const User = require('../models/users/user');
const Notification = require('../models/situation_cliniques/notification');
const Subscription = require('../models/situation_cliniques/subscription');
const webpush = require('web-push');
require('dotenv').config();

webpush.setVapidDetails(
  'mailto:your-email@example.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

/*const addReview = async (req, res) => {
  try {
    const { content, createdBy } = req.body;
    const review = new Review({ content, createdBy });
    await review.save();

    const admins = await User.find({ role: 'Admin' });

    await Promise.all(admins.map(async (admin) => {
      const existingNotification = await Notification.findOne({
        reviewText: content,
        createdBy,
        image,
        sentTo: admin._id,
        read: false
      }).exec();

      if (!existingNotification) {
        await new Notification({
          reviewText: content,
          createdBy,
          sentTo: admin._id,
          read: false
        }).save();
      }
    }));

    const pushNotifications = admins.map(admin => {
      return Subscription.find({ user: admin._id }).then(subscriptions => {
        const payload = JSON.stringify({
          title: 'New Review',
          body: `A new review has been added: ${content}`,
          icon: '/path-to-icon.png', 
          url: '/admin/reviews' 
        });

        return Promise.all(
          subscriptions.map(subscription => 
            webpush.sendNotification(subscription, payload)
          )
        );
      });
    });

    await Promise.all(pushNotifications);

    res.status(201).json({ message: 'Review added, notifications created, and sent!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add review or send notifications!' });
  }
};*/

const addReview = async (req, res) => {
  try {
    const { content, createdBy } = req.body; // Do not include the image in the destructuring

    // Fetch the user to get the image
    const user = await User.findById(createdBy);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const image = user.image; // Get the user's image

    const review = new Review({ content, createdBy, image }); // Save the image in the Review
    await review.save();

    const admins = await User.find({ role: 'Admin' });

    await Promise.all(admins.map(async (admin) => {
      const existingNotification = await Notification.findOne({
        reviewText: content,
        createdBy,
        image, // Ensure the user's image is passed here
        sentTo: admin._id,
        read: false
      }).exec();

      if (!existingNotification) {
        await new Notification({
          reviewText: content,
          createdBy,
          image, // Ensure the user's image is passed here
          sentTo: admin._id,
          read: false
        }).save();
      }
    }));

    const pushNotifications = admins.map(admin => {
      return Subscription.find({ user: admin._id }).then(subscriptions => {
        const payload = JSON.stringify({
          title: 'New Review',
          body: `A new review has been added: ${content}`,
          icon: '/path-to-icon.png', 
          url: '/admin/reviews' 
        });

        return Promise.all(
          subscriptions.map(subscription => 
            webpush.sendNotification(subscription, payload)
          )
        );
      });
    });

    await Promise.all(pushNotifications);

    res.status(201).json({ message: 'Review added, notifications created, and sent!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add review or send notifications!' });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('createdBy');
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve reviews' });
  }
};

const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id).populate('createdBy');
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve review' });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const review = await Review.findByIdAndUpdate(id, updateData, { new: true });
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update review' });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete review' });
  }
};

module.exports = {
  addReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview
};
