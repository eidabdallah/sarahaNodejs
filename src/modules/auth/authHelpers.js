import { sendEmail } from "../../utils/sendEmail.js";
import jwt from 'jsonwebtoken';


export const sendConfirmEmail = async (email, userName, req) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: 60 * 5 });
  const refreshToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const html = `
     <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: auto; background: linear-gradient(135deg,rgb(57, 58, 59), #6c757d); padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
      <div style="border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 20px;">
        <div style="display: inline-block; border-radius: 50%; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <img src="https://res.cloudinary.com/deylqxzgk/image/upload/v1738301247/84d14245-a8f4-40cc-a858-d5e2bfa5087d_meccgu.png" 
               alt="${process.env.APPNAME} Logo" 
               style="width: 250px; display: block; margin: auto; border-radius: 50%;" />
        </div>
        <h1 style="color: white; font-size: 28px; margin-top: 20px;">Welcome, ${userName}!</h1>
      </div>
      <p style="font-size: 16px; color: #f8f9fa; line-height: 1.5;">
        Thank you for joining <b>${process.env.APPNAME}</b>! We're excited to have you onboard.
      </p>
      <p style="font-size: 16px; color: #f8f9fa; line-height: 1.5;">
        Please confirm your email to activate your account and enjoy our services.
      </p>
      <a href="${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}" 
         style="display: inline-block; margin: 20px 0; padding: 12px 25px; font-size: 16px; color: white; background-color: #ffc107; text-decoration: none; border-radius: 5px;">
         Confirm Email
      </a>
      <p style="font-size: 14px; color: #f8f9fa; margin: 20px 0;">
        Didn’t receive the email? Click the link below to resend it:
      </p>
      <a href="${req.protocol}://${req.headers.host}/auth/confirmEmail/${refreshToken}" 
         style="display: inline-block; padding: 10px 20px; font-size: 14px; color: #ffc107; text-decoration: none; border-radius: 5px; border: 1px solid #ffc107;">
         Resend Confirmation Email
      </a>
      <p style="font-size: 12px; color: #dee2e6; margin-top: 20px; line-height: 1.5;">
        This email confirmation link is valid for 5 minutes. If you did not request this, please ignore this email.
      </p>
      <hr style="border: none; border-top: 1px solid #6c757d; margin: 20px 0;" />
    </div>
  </div>
  `;
  await sendEmail(email, 'Confirm Email', html);
}

export const sendCodeToEmail = async (email, code) => {
  const html = `<div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9;">
    <div style="max-width: 600px; margin: auto; background: linear-gradient(135deg,rgb(57, 58, 59), #6c757d); padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
      <div style="border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 20px;">
        <div style="display: inline-block; border-radius: 50%; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <img src="https://res.cloudinary.com/deylqxzgk/image/upload/v1738301247/84d14245-a8f4-40cc-a858-d5e2bfa5087d_meccgu.png" 
               alt="${process.env.APPNAME} Logo" 
               style="width: 250px; display: block; margin: auto; border-radius: 50%;" />
        </div>
        <h1 style="color: white; font-size: 28px; margin-top: 20px;">Your Verification Code</h1>
      </div>
      <p style="font-size: 16px; color: #f8f9fa; line-height: 1.5; margin: 20px 0;">
        Here is your code to reset your password.
      </p>
      <div style="background-color: #fff; padding: 15px; border-radius: 8px; display: inline-block; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); margin: 20px auto;">
        <p style="font-size: 24px; font-weight: bold; color: #333; margin: 0;">${code}</p>
      </div>
      <p style="font-size: 14px; color: #f8f9fa; margin: 20px 0;">
        Please enter this code in the reset password page to proceed.
      </p>
      <p style="font-size: 12px; color: #dee2e6; margin-top: 20px; line-height: 1.5;">
        If you did not request a password reset, please ignore this email. This code will expire automatically.
      </p>
      <hr style="border: none; border-top: 1px solid #6c757d; margin: 20px 0;" />
    </div>
  </div>`;
  await sendEmail(email, 'Reset Password', html);
}

export const confirmEmailMessage = (name ,res) =>{
  const html = `
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f9f9f9;">
                    <div style="max-width: 600px; margin: auto; background: linear-gradient(135deg, rgb(57, 58, 59), #6c757d); padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
                        <div style="border-bottom: 1px solid #eee; padding-bottom: 15px; margin-bottom: 20px;">
                            <div style="display: inline-block; border-radius: 50%; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                                <img src="https://res.cloudinary.com/deylqxzgk/image/upload/v1738301247/84d14245-a8f4-40cc-a858-d5e2bfa5087d_meccgu.png" 
                                     alt="${process.env.APPNAME} Logo" 
                                     style="width: 250px; display: block; margin: auto; border-radius: 50%;" />
                            </div>
                            <h1 style="color: white; font-size: 28px; margin-top: 20px;">Thank you for confirming your email, ${name}!</h1>
                        </div>
                        <p style="font-size: 16px; color: #f8f9fa; line-height: 1.5;">
                            Your email has been successfully confirmed. You can now access your account and enjoy all the features of <b>${process.env.APPNAME}</b>!
                        </p>
                        <p style="font-size: 16px; color: #f8f9fa; line-height: 1.5;">
                            We’re glad to have you onboard, and we look forward to serving you.
                        </p>
                        <p style="font-size: 14px; color: #f8f9fa; margin: 20px 0;">
                            If you have any questions or need assistance, feel free to contact our support team.
                        </p>
                        <hr style="border: none; border-top: 1px solid #6c757d; margin: 20px 0;" />
                        <footer style="font-size: 12px; color: #dee2e6; text-align: center;">
                            <p>© ${new Date().getFullYear()} ${process.env.APPNAME}. All rights reserved.</p>
                        </footer>
                    </div>
                </div>
            `;
  return res.send(html);
}