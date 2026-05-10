const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const Gmail = {
  async sendLeadNotification(name, role, telegramId) {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'hinnavarublue@gmail.com',
      subject: `🚨 New Guardian Lead: ${name}`,
      text: `A new registration has been received via Telegram.\n\nName: ${name}\nRole: ${role}\nTelegram ID: ${telegramId}\n\nPlease review and approve in the Bot Admin Dashboard.`
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`✅ Lead email sent for ${name}`);
    } catch (err) {
      console.error('❌ Gmail Notification Error:', err.message);
    }
  },

  async sendStatsBackup(statsType, details) {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'hinnavarublue@gmail.com',
      subject: `📊 Stats Backup: ${statsType}`,
      text: `Redundant statistics backup received.\n\nType: ${statsType}\nDetails: ${JSON.stringify(details, null, 2)}\n\nTimestamp: ${new Date().toISOString()}`
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log(`✅ Stats backup sent for ${statsType}`);
    } catch (err) {
      console.error('❌ Gmail Backup Error:', err.message);
    }
  }
};

module.exports = Gmail;
