
import { NextRequest, NextResponse } from 'next/server';
import { PiAuth } from '@/backend/utils/piAuth';
import { supabase } from '@/integrations/supabase/client';

const piAuth = new PiAuth(process.env.PI_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { paymentId, signature, paymentData } = await request.json();

    // Verify payment signature
    const isValidSignature = piAuth.verifyPayment(paymentData, signature);
    
    if (!isValidSignature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Update payment status in database
    const { data: payment, error } = await supabase
      .from('payments')
      .update({
        status: 'verified',
        pi_payment_id: paymentId,
        verified_at: new Date().toISOString()
      })
      .eq('id', paymentData.identifier)
      .select()
      .single();

    if (error) {
      console.error('Database update error:', error);
      return NextResponse.json(
        { error: 'Payment verification failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      payment,
      message: 'Payment verified successfully'
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
