import Razorpay from 'npm:razorpay@2.9.2';
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const razorpay = new Razorpay({
    key_id: Deno.env.get('RAZORPAY_KEY_ID') ?? '',
    key_secret: Deno.env.get('RAZORPAY_KEY_SECRET') ?? '',
});

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { courseId, amount } = await req.json();

        console.log(`Creating order for Course: ${courseId}, Amount: ${amount}`);

        const options = {
            amount: amount * 100, // Razorpay expects amount in paise
            currency: 'INR',
            receipt: `receipt_${courseId}_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        console.log('Order created:', order);

        return new Response(
            JSON.stringify({
                order_id: order.id,
                amount: order.amount,
                currency: order.currency,
                key_id: Deno.env.get('RAZORPAY_KEY_ID'), // Send public key to client
            }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            },
        );
    } catch (error) {
        console.error('Error creating order:', error);
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            },
        );
    }
});
