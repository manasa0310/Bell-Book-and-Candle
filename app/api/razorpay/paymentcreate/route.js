import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import shortid from 'shortid';

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

export async function POST(request) {
  // Assuming the request body is JSON
  const body = await request.json(); // Parse the incoming JSON body

  const totalAmount = Number(body.amount) * 100;
  const userId = body.userId;
  const userEmail = body.userEmail;
  const userName = body.userName;
  const plan = body.membership;
  const amount = totalAmount;
  const payment_capture = 1;
  const currency = 'INR';
  const options = {
    amount: amount.toString(),
    currency,
    receipt: shortid.generate(),
    payment_capture,
    notes: {
      paymentFor: 'Membership',
      userId: userId,
      userName: userName,
      userEmail: userEmail,
      productId: plan,
    },
  };

  const order = await instance.orders.create(options);
  return new NextResponse(JSON.stringify({ msg: 'success', order }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
