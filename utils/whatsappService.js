const WHATSAPP_API_TOKEN = process.env.WHATSAPP_API_TOKEN;
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

const sendWhatsAppMessage = async (toPhoneNumber, messageBody) => {
    // Basic validation to check if the tokens are configured
    if (!WHATSAPP_API_TOKEN || !WHATSAPP_PHONE_NUMBER_ID || WHATSAPP_API_TOKEN === 'YOUR_WHATSAPP_TOKEN_HERE') {
        console.log('WhatsApp API not configured in .env, skipping message to', toPhoneNumber);
        return;
    }
    
    // Ensure the phone number is just digits with no + or spaces
    const formattedPhone = toPhoneNumber.replace(/[^0-9]/g, '');

    try {
        const response = await fetch(`https://graph.facebook.com/v17.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${WHATSAPP_API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to: formattedPhone,
                type: 'text',
                text: { preview_url: false, body: messageBody }
            })
        });
        
        const data = await response.json();
        if(!response.ok) {
            console.error('WhatsApp API Error:', data);
        } else {
            console.log(`WhatsApp message sent successfully to ${formattedPhone}`);
        }
    } catch (err) {
        console.error('Error sending WhatsApp message:', err);
    }
};

module.exports = { sendWhatsAppMessage };
