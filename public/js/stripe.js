/* eslint-disable */

const stripe = Stripe(
  'pk_test_51RDtLYQB7A5QQs4uaPOIHvr5KENhBad4CjKahoBXrvk45lc124y4eEv7fleJz8ddvBHrqdmg4Kuh5HdKRLaIt5C100vkgv1Z1E'
);

const bookBtn = document.getElementById('book-tour');

async function bookTour(tourId) {
  try {
    // 1. Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`
    );

    console.log({ session });

    // 2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (error) {
    console.log(error);
    showAlert('error', error.response.data.message);
  }
}

if (bookBtn) {
  bookBtn.addEventListener('click', event => {
    const { tourId } = event.target.dataset;

    event.target.textContent = 'Processing...';
    event.target.disabled = true;

    bookTour(tourId);
  });
}
