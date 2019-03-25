import mailGun from "mailgun-js";

const mailGunClient = new mailGun({
    apiKey: process.env.MAILGUN_API_KEY || "",
    domain: "sandbox92eed45063044d69aaf0a3250883abaf.mailgun.org"
});

const sendEmail = (subject: string, html: string) => mailGunClient.messages().send({
    to: "rhkdgns9489@gmail.com",
    from: "rhkdgns9489@gmail.com",
    subject,
    html
});

export const sendVerificationEmail = (fullName: string, key: string) => {
    const emailSubject = `Hello! ${fullName}, please Verification your email`;
    const emailHtml = `Your Email Verify bying clicking <a href="https://nuber/verification/${key}">here</a>`;
    return sendEmail(emailSubject, emailHtml);
}