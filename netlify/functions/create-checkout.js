const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async function(event) {
  try {
    const { cart } = JSON.parse(event.body);

    const line_items = cart.map(item => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "pix"],
      line_items,
      mode: "payment",
      success_url: "https://diamondsect.com.br/sucesso",
      cancel_url: "https://diamondsect.com.br/cancelado",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
