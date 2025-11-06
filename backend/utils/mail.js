import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,           // Your Gmail address
    pass: process.env.EMAIL_PASSWORD,  // Your Gmail app password
  },
});

export const sendotpMail = async (to, otp) => {
  try {
    const mailOptions = {
      from: `"QuickBite 🍔" <${process.env.EMAIL}>`,
      to: to,
      subject: "Your QuickBite OTP for Reset Password",
      html: `
      <div style="
        font-family: 'Poppins', Arial, sans-serif;
        max-width: 600px;
        margin: 25px auto;
        background: #fff;
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid #eee;
        box-shadow: 0 5px 20px rgba(0,0,0,0.05);
      ">
        <!-- Header -->
        <div style="
          background: linear-gradient(90deg, #ff4b2b, #ff416c);
          padding: 25px;
          text-align: center;
          color: white;
        ">
          <h1 style="margin: 0; font-size: 28px; letter-spacing: 1px;">QuickBite</h1>
          <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">
            Fast • Fresh • Delivered
          </p>
        </div>

        <!-- Body -->
        <div style="padding: 25px 30px; color: #333;">
          <h2 style="text-align: center; font-size: 22px;">OTP Verification</h2>
          <p style="font-size: 16px; text-align: center; color: #555;">
            Hey Foodie! 🍕 To keep your QuickBite account secure, please verify your email using the OTP below.
          </p>

          <div style="text-align: center; margin: 25px 0;">
            <div style="
              display: inline-block;
              background: #ff4b2b;
              color: #fff;
              font-size: 32px;
              letter-spacing: 6px;
              padding: 14px 30px;
              border-radius: 10px;
              font-weight: bold;
            ">
              ${otp}
            </div>
          </div>

          <p style="font-size: 14px; color: #555; text-align: center;">
            This OTP will expire in <strong>10 minutes</strong>. Do not share it with anyone for your safety.
          </p>
        </div>

        <!-- Footer -->
        <div style="
          background: #f9fafb;
          padding: 15px;
          text-align: center;
          font-size: 13px;
          color: #888;
          border-top: 1px solid #eee;
        ">
          <p style="margin: 0;">© ${new Date().getFullYear()} QuickBite. All rights reserved.</p>
          <p style="margin: 3px 0 0 0;">Delivering happiness, one bite at a time 🍟</p>
        </div>
      </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent successfully to ${to}`);
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);
  }
};
