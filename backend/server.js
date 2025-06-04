const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/essentialOrders', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mongoose Schema
const orderSchema = new mongoose.Schema({
  category: String,
  itemName: String,
  details: Object,
  price: String,
  user: {
    name: String,
    email: String,
    nationalId: String,
    phoneNumber: String
  },
  date: { type: Date, default: Date.now },
});


const Order = mongoose.model('Order', orderSchema);

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'spinnboy123@gmail.com',        // 👈 replace with your actual Gmail
    pass: 'akyq peip nbso byia'      // 👈 use Gmail App Password, not regular password
  }
});

// send Email function
function sendEmailNotification(order) {
  const mailOptions = {
    from: 'spinnboy123@gmail.com',
    to: 'spinnboy123@gmail.com',
    subject: '📥 New Order Received',
    text: `
New Order Details:
------------------------
Item: ${order.itemName}
Category: ${order.category}
Price: ${order.price}
Date: ${order.date}

Customer Information:
------------------------
Name: ${order.user?.name}
Email: ${order.user?.email}
National ID: ${order.user?.nationalId}
Phone: ${order.user?.phoneNumber}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ Email send error:', error);
    } else {
      console.log('📧 Email sent:', info.response);
    }
  });
}


// Single /orders endpoint
app.post('/orders', async (req, res) => {
  try {
    console.log('📦 New Order:', req.body);

    const order = new Order(req.body);
    await order.save();

    await sendEmailNotification(order); // send mail

    res.status(201).json({ message: 'Order saved and email sent' });
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ message: 'Order failed', error: err });
  }
});

// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
