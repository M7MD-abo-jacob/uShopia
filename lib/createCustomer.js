import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function createCustomer() {
  const customer = await stripe.customers.create({
    email: "customer@example.com",
  });
  console.log(customer);
}
