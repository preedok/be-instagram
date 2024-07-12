const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const TO_DEFAULT_PHONE_NUMBER = process.env.TO_DEFAULT_PHONE_NUMBER;
const FROM_DEFAULT_PHONE_NUMBER = process.env.FROM_DEFAULT_PHONE_NUMBER;

app.post('/send-sms', async (req, res) => {
    const { message } = req.body;

    try {
        await client.messages.create({
            body: message,
            to: TO_DEFAULT_PHONE_NUMBER,
            from: FROM_DEFAULT_PHONE_NUMBER
        });

        res.status(200).send('SMS berhasil dikirim');
    } catch (error) {
        console.error('Error sending SMS:', error);
        res.status(500).send('Terjadi kesalahan saat mengirim SMS');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
