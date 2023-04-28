const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { products } = req.body;
    try {
      const line_items = products.value.map((product) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.title,
              images: [product.image],
            },
            unit_amount: product.price * 100,
          },
          quantity: product.count,
        };
      });
      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });
      res.json({ stripeSession: session });
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
