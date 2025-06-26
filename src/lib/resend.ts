"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export const sendEmail = async (values: SendEmailValues): Promise<void> => {
  await resend.emails.send({
    from: "yasir@aamirpropertydealer.com",
    to: "yasirmoon@gmail.com",
    subject: "New Lead on Aamir Property Dealer!",
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background: #ffffff; padding: 40px 20px; max-width: 600px; margin: 0 auto; border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <!-- Header -->
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #e8ecef;">
          <h1 style="color: #1a3c34; font-size: 28px; margin: 0; font-weight: 700;">Aamir Property Dealer</h1>
          <p style="color: #6c757d; font-size: 16px; margin: 8px 0 0;">New Contact Form Submission</p>
        </div>

        <!-- Content -->
        <div style="padding: 24px 0;">
          <h2 style="color: #1a3c34; font-size: 22px; margin-bottom: 20px; font-weight: 600;">New Lead Details</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 16px;">
            <tr style="background: #f8f9fa; border-radius: 8px;">
              <td style="font-weight: 600; padding: 12px 16px; color: #495057; width: 120px;">Name</td>
              <td style="padding: 12px 16px; color: #212529;">${values.firstName} ${values.lastName}</td>
            </tr>
            <tr>
              <td style="font-weight: 600; padding: 12px 16px; color: #495057;">Email</td>
              <td style="padding: 12px 16px;">
                <a href="mailto:${values.email}" style="color: #007bff; text-decoration: none; transition: color 0.3s ease;">${values.email}</a>
              </td>
            </tr>
            <tr style="background: #f8f9fa; border-radius: 8px;">
              <td style="font-weight: 600; padding: 12px 16px; color: #495057;">Phone</td>
              <td style="padding: 12px 16px;">
                <a href="tel:${values.phone}" style="color: #007bff; text-decoration: none; transition: color 0.3s ease;">${values.phone}</a>
              </td>
            </tr>
          </table>
        </div>

        <!-- Footer -->
        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e8ecef;">
          <p style="color: #6c757d; font-size: 14px; margin: 0;">This message was sent from the <strong>Aamir Property Dealer</strong> website contact form.</p>
          <p style="color: #6c757d; font-size: 14px; margin: 8px 0 0;">
            <a href="https://www.aamirpropertydealer.com" style="color: #007bff; text-decoration: none;">Visit website</a>
          </p>
        </div>
      </div>
    `,
  });
};
