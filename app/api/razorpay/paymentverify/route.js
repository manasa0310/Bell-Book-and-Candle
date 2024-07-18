import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();
    const secret = process.env.RAZORPAY_APT_SECRET; // Ensure this is correctly set in your environment

    if (!secret) {
      console.error('RAZORPAY_APT_SECRET is not set');
      throw new Error('Server configuration error');
    }

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    // Correct way to send JSON response with status code in Next.js API routes
    return new NextResponse(JSON.stringify({ message: 'success' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Verification error:', error.message);
    // Return a 500 Internal Server Error response for unexpected errors
    return new NextResponse(
      JSON.stringify({ message: 'Internal server error' }),
      {
        status: 500,
      }
    );
  }
}
