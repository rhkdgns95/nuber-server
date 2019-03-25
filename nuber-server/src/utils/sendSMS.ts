import Twilio from "twilio";
const twilioClient = Twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const sendSMS = (to: string, body: string) => twilioClient.messages.create({
    to,
    body,
    from: process.env.TWILIO_PHONE
});

export const sendVerificationSMS = (to: string, key: string) => sendSMS(to, `Verification key is: ${key}`);

