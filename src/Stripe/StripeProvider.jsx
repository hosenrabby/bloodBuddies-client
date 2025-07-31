// StripeProvider.jsx
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51Rr2eBRhX3mRm0uW3bqSpX0pLaJ0jBFOd9x1lFKT6jUPTQQh2oXROf6kqoEz4IExzw9kk4vnmL6WEl2KzhcQX6SB00qHofr1Nm"); // Replace with your public key

const StripeProvider = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeProvider;
