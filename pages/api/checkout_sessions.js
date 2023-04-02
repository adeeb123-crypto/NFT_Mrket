const stripe = require('stripe')('sk_test_51MsNwiGSLhdIpRGtdRog7YDTyQV2TNqyllA1ilDcp5jOLRnPtqkFwbkatVK5XRjDejz3fYqTpn1mGfdsAyhdQA1d002svvG3UY');


export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {

      const customer = await stripe.customers.create({
        email: req.body.email, // Retrieve the email address from the request body
      });

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        customer: customer.id,
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: 'price_1MsOOiGSLhdIpRGt5kCUCE4B',
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
      });

      const invoice = await stripe.invoices.create({
        customer: customer.id,
        collection_method: 'send_invoice',
        days_until_due: 30,
        description: 'Invoice for purchase on My Store',
        payment_settings: {
          payment_method_types: ['card'],
        },
      });
      await stripe.invoices.sendInvoice(invoice.id);


      res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

