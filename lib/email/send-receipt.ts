import { Resend } from "resend";

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is missing.");
  }

  return new Resend(process.env.RESEND_API_KEY);
}

type ReceiptEmail = {
  to: string;
  studentName: string;
  receiptNumber: string;
  amount: number;
  course: string;
  receiptUrl: string;
};

export async function sendReceiptEmail({
  to,
  studentName,
  receiptNumber,
  amount,
  course,
  receiptUrl,
}: ReceiptEmail) {

  const resend = getResend();

  const from =
    process.env.RESEND_FROM ??
    "Fermata Music Academy <onboarding@resend.dev>";

  return resend.emails.send({
    from,
    to,
    subject: `Payment Receipt ${receiptNumber}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px">
        <h2 style="color:#0f766e">Fermata Music Academy</h2>

        <p>Dear ${studentName},</p>

        <p>Thank you for your payment.</p>

        <table style="border-collapse:collapse;width:100%">
          <tr>
            <td><strong>Receipt No.</strong></td>
            <td>${receiptNumber}</td>
          </tr>

          <tr>
            <td><strong>Course</strong></td>
            <td>${course}</td>
          </tr>

          <tr>
            <td><strong>Amount</strong></td>
            <td>KES ${amount.toLocaleString()}</td>
          </tr>
        </table>

        <p style="margin-top:24px">
          <a
            href="${receiptUrl}"
            style="background:#0f766e;color:#fff;padding:12px 20px;text-decoration:none;border-radius:6px"
          >
            View Receipt
          </a>
        </p>

        <p>
          Thank you for choosing
          <strong>Fermata Music Academy</strong>.
        </p>
      </div>
    `,
  });
}
