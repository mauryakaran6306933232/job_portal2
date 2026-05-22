import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// ■ UPDATED: Accept custom subject and body text
export const sendCustomEmail = async (toEmail, subject, bodyText) => {
  try {
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
        <div style="background-color: #6A38C2; padding: 10px; border-radius: 8px 8px 0 0; text-align: center;">
          <h2 style="color: white; margin: 0;">JobPortal</h2>
        </div>
        <div style="padding: 20px;">
          ${bodyText.split('\n').map(paragraph => `<p style="color: #333; line-height: 1.6;">${paragraph}</p>`).join('')}
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #888;">This email was sent via JobPortal ATS.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"JobPortal" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: subject,
      html: htmlContent
    });

    console.log(`■ Custom email sent to ${toEmail}`);
  } catch (error) {
    console.error("■ Email send failed:", error.message);
  }
};