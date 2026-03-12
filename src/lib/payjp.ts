import Payjp from 'payjp';

if (!process.env.PAYJP_SECRET_KEY) {
  console.warn('PAYJP_SECRET_KEY is not set. Payment functions will not work.');
}

const payjp = Payjp(process.env.PAYJP_SECRET_KEY || 'sk_test_dummy');

export default payjp;
