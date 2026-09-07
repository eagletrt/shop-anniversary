import nodemailer from "nodemailer";
import path from "path";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "localhost",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export type OrderEmailData = {
  orderId: string;
  customerName: string;
  customerEmail: string;
  shipping: string;
  totalAmount: number;
  items: {
    nome: string;
    taglia?: string | null;
    quantity: number;
    price: number;
  }[];
};

export async function sendOrderConfirmationEmail(data: OrderEmailData) {
  try {
    const isInternal = process.env.INTERNAL === "true";

    let shippingInfo = "";
    if (isInternal) {
      if (data.shipping === "RITIRO_EVENTO") {
        shippingInfo =
          "<p style='color: #a3a3a3; font-size: 14px;'>Hai scelto di ritirare il merchandise all'evento.</p>";
      } else {
        shippingInfo =
          "<p style='color: #a3a3a3; font-size: 14px;'>Hai scelto di ricevere il merchandise post-evento.</p>";
      }
    }

    const itemsHtml = data.items
      .map(
        (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.14);">
          <strong style="color: #f3ff14;">${item.nome}</strong>
          ${item.taglia ? `<br/><span style="color: #a3a3a3; font-size: 14px;">Taglia: ${item.taglia}</span>` : ""}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.14); text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.14); text-align: right;">€${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `
      )
      .join("");

    const logoPath = path.join(
      process.cwd(),
      "public",
      "icons",
      "icon-192.png"
    );
    const logoCid = "eagletrt-logo@shop";

    const mailOptions = {
      from: process.env.SMTP_FROM || '"Shop Anniversary" <noreply@eagletrt.it>',
      to: data.customerEmail,
      subject: "Conferma Pre-ordine - Shop Anniversary",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Conferma Ordine</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #171717; color: #fafafa; font-family: sans-serif; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #292929; border-radius: 10px; overflow: hidden; margin-top: 40px; margin-bottom: 40px;">
            
            <div style="text-align: center; padding: 30px 20px; background-color: #171717; border-bottom: 2px solid #f3ff14;">
              <img src="cid:${logoCid}" alt="Logo" style="width: 80px; height: auto;" />
              <h1 style="color: #f3ff14; margin: 15px 0 0 0; font-size: 24px;">Grazie per il tuo pre-ordine, ${data.customerName}!</h1>
            </div>

            <div style="padding: 30px;">
              <p>Questa è una conferma del tuo pre-ordine. Ti ricordiamo che si tratta di un pre-ordine e riceverai ulteriori aggiornamenti sulla disponibilità dei prodotti.</p>
              ${shippingInfo}

              <h2 style="color: #f3ff14; font-size: 18px; margin-top: 30px; border-bottom: 1px solid rgba(255,255,255,0.14); padding-bottom: 10px;">Riepilogo Ordine</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <thead>
                  <tr>
                    <th style="text-align: left; padding: 12px; border-bottom: 2px solid #f3ff14; color: #a3a3a3;">Prodotto</th>
                    <th style="text-align: center; padding: 12px; border-bottom: 2px solid #f3ff14; color: #a3a3a3;">Q.tà</th>
                    <th style="text-align: right; padding: 12px; border-bottom: 2px solid #f3ff14; color: #a3a3a3;">Prezzo</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="2" style="padding: 15px 12px; text-align: right; font-weight: bold; font-size: 18px;">Totale:</td>
                    <td style="padding: 15px 12px; text-align: right; font-weight: bold; font-size: 18px; color: #f3ff14;">€${data.totalAmount.toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div style="background-color: #171717; padding: 20px; text-align: center; border-top: 1px solid rgba(255,255,255,0.14);">
              <p style="font-size: 12px; color: #737373; margin: 0;">&copy; ${new Date().getFullYear()} EagleTRT. Tutti i diritti riservati.</p>
              <p style="font-size: 11px; color: #525252; margin-top: 10px;">ID Ordine: ${data.orderId}</p>
            </div>

          </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: "logo.png",
          path: logoPath,
          cid: logoCid,
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
  }
}
