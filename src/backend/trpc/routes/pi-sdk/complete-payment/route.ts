
import { NextRequest, NextResponse } from 'next/server';
import { PiAuth } from '@/backend/utils/piAuth';
import { supabase } from '@/integrations/supabase/client';

const piAuth = new PiAuth(process.env.PI_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { paymentId, transactionId, status } = await request.json();

    let result;
    
    if (status === 'completed') {
      // Complete payment with Pi Network
      result = await piAuth.completePayment(paymentId, transactionId);
      
      // Update payment in database
      const { error } = await supabase
        .from('payments')
        .update({
          status: 'completed',
          transaction_id: transactionId,
          completed_at: new Date().toISOString()
        })
        .eq('pi_payment_id', paymentId);

      if (error) {
        console.error('Database update error:', error);
        throw error;
      }
    } else if (status === 'cancelled') {
      // Cancel payment with Pi Network
      result = await piAuth.cancelPayment(paymentId);
      
      // Update payment in database
      const { error } = await supabase
        .from('payments')
        .update({
          status: 'cancelled',
          cancelled_at: new Date().toISOString()
        })
        .eq('pi_payment_id', paymentId);

      if (error) {
        console.error('Database update error:', error);
        throw error;
      }
    }

    return NextResponse.json({
      success: true,
      result,
      message: `Payment ${status} successfully`
    });

  } catch (error) {
    console.error('Payment completion error:', error);
    return NextResponse.json(
      { error: 'Payment operation failed' },
      { status: 500 }
    );
  }
}
