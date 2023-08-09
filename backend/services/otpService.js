const crypto = require('crypto');
const { hashOtp } = require('./hashService');

const smsId = process.env.SMS_ID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const twilio = require('twilio')(smsId, smsAuthToken, {
    lazyLoading: true
});

const generateOtp = async() => {
    const otp = crypto.randomInt(1000, 9999);
    return otp;
}


const sendBySms = async(phone, otp) => {
    return await twilio.messages.create({
        to: phone,
        from: process.env.SMS_FROM_NUMBER,
        body: `Your Codershouse OTP is ${otp}`,
    });
}



const verifyOtpService = async(hashedOtp, data) => {
    let computedHash = hashOtp(data);
    return computedHash === hashedOtp;
}


module.exports = { generateOtp, sendBySms, verifyOtpService };