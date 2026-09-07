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

    const logoTopPath = path.join(
      process.cwd(),
      "public",
      "logo_horizontal_dark.png"
    );
    const logoBottomPath = path.join(process.cwd(), "public", "logo_dark.png");
    const logoTopCid = "eagletrt-logo-top@shop";
    const logoBottomCid = "eagletrt-logo-bottom@shop";

    const mailOptions = {
      from: process.env.SMTP_FROM || '"Shop Anniversary" <noreply@eagletrt.it>',
      to: data.customerEmail,
      subject: "Conferma Pre-ordine - Shop Anniversary",
      html: `
        <!DOCTYPE html>
        <html lang="it">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="color-scheme" content="dark only">
          <meta name="supported-color-schemes" content="dark only">
          <title>Conferma Ordine</title>
          <style>
            :root {
              color-scheme: dark only;
            }
            body {
              margin: 0; padding: 0; background-color: #171717 !important; color: #fafafa !important; font-family: sans-serif; line-height: 1.6;
              -webkit-font-smoothing: antialiased;
            }
            a { color: #fafafa; text-decoration: none; }
            a:hover { color: #f3ff14; }

            /* Mobile Responsive Classes */
            @media only screen and (max-width: 600px) {
              .footer-col {
                display: block !important;
                width: 100% !important;
                text-align: center !important;
                padding: 15px 0 !important;
              }
              .footer-logo {
                margin: 15px auto !important;
              }
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; background-color: #171717; color: #fafafa; font-family: sans-serif; line-height: 1.6;">
          <div style="background-color: #171717; width: 100%; min-height: 100vh; padding-top: 40px; padding-bottom: 40px;">
            
            <!-- Main Card -->
            <div style="max-width: 600px; margin: 0 auto; background-color: #292929; border-radius: 26px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
              
              <!-- Header -->
              <div style="text-align: center; padding: 40px 20px; background-color: #171717; border-bottom: 1px solid rgba(255,255,255,0.14);">
                <img src="cid:${logoTopCid}" alt="EagleTRT Logo" style="width: 250px; height: auto; display: inline-block; border: none; outline: none; background: transparent;" />
                <h1 style="color: #f3ff14; margin: 25px 0 0 0; font-size: 24px;">Grazie per il tuo pre-ordine, ${data.customerName}!</h1>
              </div>

              <!-- Body -->
              <div style="padding: 40px 30px;">
                <p style="margin-top: 0;">Questa è una conferma del tuo pre-ordine. Ti ricordiamo che è un pre-ordine per una raccolta fondi. Il pagamento NON avviene online. Ti contatteremo per organizzare il pagamento (Contanti, PayPal, o Bonifico) e la consegna.</p>
                ${shippingInfo}

                <h2 style="color: #f3ff14; font-size: 18px; margin-top: 30px; border-bottom: 1px solid rgba(255,255,255,0.14); padding-bottom: 10px;">Riepilogo Ordine</h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                  <thead>
                    <tr>
                      <th style="text-align: left; padding: 12px; border-bottom: 2px solid #f3ff14; color: #a3a3a3; font-weight: normal;">Prodotto</th>
                      <th style="text-align: center; padding: 12px; border-bottom: 2px solid #f3ff14; color: #a3a3a3; font-weight: normal;">Q.tà</th>
                      <th style="text-align: right; padding: 12px; border-bottom: 2px solid #f3ff14; color: #a3a3a3; font-weight: normal;">Prezzo</th>
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
              
              <!-- Footer resembling the website footer -->
              <div style="background-color: #292929; border-top: 1px solid rgba(255,255,255,0.14); border-radius: 26px 26px 0 0; margin-top: 20px; padding: 30px 20px; font-size: 14px; color: #a3a3a3;">
                
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
                  <tr>
                    <td class="footer-col" valign="top" width="33%" style="padding-right: 10px; text-align: left;">
                      <p style="color: #fafafa; font-weight: bold; margin: 0 0 5px 0;">Sede operativa</p>
                      <p style="margin: 0;"><a href="https://goo.gl/maps/ZwzsZx3RUqU9Xk5A7" style="color: #a3a3a3; text-decoration: none;">Via Sommarive n. 9<br>38123 Povo (TN) - Italy</a></p>
                    </td>
                    <td class="footer-col" valign="top" width="33%" style="padding: 0 10px; text-align: center;">
                      <p style="color: #fafafa; font-weight: bold; margin: 0 0 5px 0;">Sede legale</p>
                      <p style="margin: 0;"><a href="https://goo.gl/maps/ogMA9oWj6gYVjdmLA" style="color: #a3a3a3; text-decoration: none;">Via Fortunato Zeni n. 8<br>38068 Rovereto (TN) - Italy</a></p>
                    </td>
                    <td class="footer-col" valign="top" width="33%" style="padding-left: 10px; text-align: right;">
                      <p style="color: #fafafa; font-weight: bold; margin: 0 0 5px 0;">Contatti</p>
                      <p style="margin: 0;"><a href="mailto:fsae@eagletrt.it" style="color: #a3a3a3; text-decoration: none;">fsae@eagletrt.it</a><br><a href="tel:+390461285271" style="color: #a3a3a3; text-decoration: none;">+39 0461 285271</a></p>
                    </td>
                  </tr>
                </table>
                
                <div style="border-top: 1px solid rgba(255,255,255,0.14); margin: 20px 0;"></div>
                
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size: 12px;">
                  <tr>
                    <td class="footer-col" valign="middle" width="33%" align="left">
                      © ${new Date().getFullYear()} E-Agle TRT ASD.<br>All rights reserved.
                    </td>
                    <td class="footer-col" valign="middle" width="33%" align="center">
                      <div class="footer-logo">
                        <a href="https://www.eagletrt.it"><img src="cid:${logoBottomCid}" alt="E-Agle TRT Logo" style="width: 40px; height: auto; border: none; outline: none; background: transparent;" /></a>
                      </div>
                    </td>
                    <td class="footer-col" valign="middle" width="33%" align="right">
                      P.IVA: 02446060226
                    </td>
                  </tr>
                </table>

                <!-- Order ID for debugging -->
                <div style="text-align: center; margin-top: 30px;">
                  <p style="font-size: 11px; color: #525252; margin: 0;">ID Ordine: ${data.orderId}</p>
                </div>

              </div>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: "logo_horizontal_dark.png",
          path: logoTopPath,
          cid: logoTopCid,
          contentType: "image/png",
        },
        {
          filename: "logo_dark.png",
          path: logoBottomPath,
          cid: logoBottomCid,
          contentType: "image/png",
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(
      "Email sent to %s (messageId: %s)",
      data.customerEmail,
      info.messageId
    );
  } catch (error) {
    console.error("Error sending order confirmation email:", error);
  }
}
