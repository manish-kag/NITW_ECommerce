import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

const subscribers = []; // In-memory; use DB for production

// Configure nodemailer (use your Gmail and an App Password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mkag5157@gmail.com', // <-- your Gmail here
    pass: 'cjos rgqo ghjn poob'    // <-- your Gmail App Password here
  }
});

router.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.json({ success: false, message: 'Invalid email address.' });
  }
  if (subscribers.includes(email)) {
    return res.json({ success: false, message: 'You are already subscribed.' });
  }
  subscribers.push(email);

  // Send notification to your Gmail
  try {
    await transporter.sendMail({
      from: '"CampusShop Newsletter" <mkag5157@gmail.com>', // The sender (your Gmail, with a display name)
      to: 'mkag5157@gmail.com', // The recipient (your Gmail)
      subject: 'New Newsletter Subscription', // Email subject
      text: `New subscriber: ${email}` // Email body (shows the subscriber's email)
    });
  } catch (err) {
    return res.json({ success: false, message: 'Could not send email notification.' });
  }

  res.json({ success: true });
});

export default router;
