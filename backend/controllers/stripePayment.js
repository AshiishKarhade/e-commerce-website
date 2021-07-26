const stripe = require("stripe")(
  "sk_test_51IrFvZSIDFpbdB2SBQ9MiGca8gBWjhm9TyF6ICZ1GoYrCFlmuZlgJ0xddffOO52CSiS6kASFTTTP7KlBAnvspviw00pZkL8XIA"
);
const { v4: uuidv4 } = require("uuid");

exports.stripePayment = (req, res) => {
  const { products, token } = req.body;
  console.log("PRODUCTS", products);
  console.log("PRODUCTS_PRICE", prooduct.price);

  const amount = 0;
  products.map((p) => {
    amount += p.price;
  });
  const idempotencyKey = uuid();

  return stripe.customers // create a customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        // charge a customers
        {
          amount: amount * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchase of ${products.name}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
              line1: toke.card.address_line1,
              line2: toke.card.address_line2,
              city: toke.card.address_city,
            },
          },
        },
        { idempotencyKey }
      );
    })
    .then((result) => res.status(200).json(result)) // return a customers
    .catch((err) => console.log(err));
};
