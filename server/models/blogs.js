const mongoose = require('mongoose');

function getCurrentDate() {
    const today = new Date();
  
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const year = today.getFullYear();
  
    return `${month}/${day}/${year}`;
  }

  const blogScheme = new mongoose.Schema({
    title: {
      type: String,
      required: [true, 'Must provide a title'],
      trim: true,
      maxLength: [50, "The title can't exceed 50 characters"],
    },
    content: {
      type: String,
      required: [true, 'Must provide content'],
      trim: true,
      maxLength: [120, 'Content must not exceed 120 characters'],
    },
    author: {
      type: String,
      required: [true, 'Must provide an author'],
      trim: true,
    },
    date: {
      type: String,
      required: [true],
      default: getCurrentDate(),
    },
    img: {
      type: String,
      default: '',
    }
  }, { collection: 'Blogs' });

module.exports = mongoose.model('Blogs', blogScheme)