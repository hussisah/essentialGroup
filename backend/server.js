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
    user: 'spinnboy123@gmail.com', // Replace with your Gmail
    pass: 'akyq peip nbso byia'     // Gmail App Password
  }
});

// send Email function (to admin and customer)
function sendEmailNotification(order) {
  const adminMailOptions = {
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

  const customerMailOptions = {
    from: 'spinnboy123@gmail.com',
    to: order.user?.email,
    subject: '✅ Order Received - Essential Group',
    text: `Dear ${order.user?.name},

Your order for ${order.itemName} has been received.

A text will be sent to your email or number shortly.

Thank you for choosing Essential Group!`
  };

  // Send admin email
  transporter.sendMail(adminMailOptions, (error, info) => {
    if (error) {
      console.error('❌ Admin email send error:', error);
    } else {
      console.log('📧 Admin email sent:', info.response);
    }
  });

  // Send customer email
  transporter.sendMail(customerMailOptions, (error, info) => {
    if (error) {
      console.error('❌ Customer email send error:', error);
    } else {
      console.log('📧 Customer email sent:', info.response);
    }
  });
}

// Single /orders endpoint
app.post('/orders', async (req, res) => {
  try {
    console.log('📦 New Order:', req.body);

    const order = new Order(req.body);
    await order.save();

    sendEmailNotification(order); // Send both emails

    res.status(201).json({ message: 'Order saved and emails sent' });
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ message: 'Order failed', error: err });
  }
});

// Get all orders
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving orders', error: err });
  }
});


// Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
