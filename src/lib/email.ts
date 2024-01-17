

export async function sendEmail() {
  try {
    const data = await resend.emails.send({
      from: "DigitalHippo <hello@joshtriedcoding.com>",
      to: [user.email],
      subject:
            "Thanks for your order! This is your receipt.",
      html: ReceiptEmailHtml({
        date: new Date(),
        email: user.email,
        orderId: session.metadata.orderId,
        products: order.products as Product[],
      }),
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
}
