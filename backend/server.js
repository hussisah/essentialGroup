const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to your MongoDB (make sure MongoDB is running)
mongoose.connect('mongodb://localhost:27017/essentialOrders', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const orderSchema = new mongoose.Schema({
  category: String,
  itemName: String,
  details: Object,
  price: String,
  date: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

// Setup Nodemailer transporter
import nodemailer from 'nodemailer';

app.post('/orders', async (req, res) => {
  const order = req.body;

  // Save to MongoDB (already done)
  await db.collection('orders').insertOne(order);

  // Send email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hussainiisah60@gmail.com',
      pass: '12345'
    }
  });

  const mailOptions = {
    from: 'hussainiisah60@gmail.com',
    to: 'hussainiisah@gmail.com',
    subject: 'New Order Received',
    text: `Order from ${order.itemName}, ${order.category}, Price: ${order.price}`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return res.status(500).send(err.toString());
    res.send({ message: 'Order received and email sent!' });
  });
});

app.post('/orders', async (req, res) => {
  try {
    console.log('📦 New Order Received:', req.body); // 👈 This shows order data in your terminal

    const order = new Order(req.body);
    await order.save();

    sendEmailNotification(order); // 👈 Send email when new order is saved

    res.status(201).json({ message: 'Order saved successfully' });
  } catch (err) {
    console.error('❌ Error saving order:', err); // 👈 Logs errors too
    res.status(500).json({ message: 'Error saving order', error: err });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
