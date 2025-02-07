const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

class Mail {
    constructor() {
        this.mailOptions = {
            from: {
                name: 'Sender Name',
                address: process.env.EMAIL
            },
            to: '',
            subject: '',
            text: '',
            html: ''
        };
    }

    /**
     * Set the name of the company that is sending the email.
     * @param {string} name - Name of the company
     */
    setCompanyName(name) {
        this.mailOptions.from.name = name;
    }

    /**
     * Set the email of the sender.
     * @param {string} email - Email of the sender
     */
    setSenderEmail(email) {
        this.mailOptions.from.address = email;
    }

    /**
     * Set the receiver's email.
     * @param {string} receiver - Email of the receiver
     */
    setTo(receiver) {
        this.mailOptions.to = receiver;
    }

    /**
     * Set the subject of the email.
     * @param {string} subject - Subject of the email
     */
    setSubject(subject) {
        this.mailOptions.subject = subject;
    }

    /**
     * Set the text content of the email.
     * @param {string} text - Text content of the email
     */
    setTextContent(text) {
        this.mailOptions.text = text;
    }

    /**
     * Set the HTML content of the email.
     * @param {string} html - HTML content of the email
     */
    setHtmlContent(html) {
        this.mailOptions.html = html;
    }

    /**
     * Send the email using the configured options.
     * @returns {Promise<string>} - Resolves with success or error message.
     */
    async send() {
        try {
            const info = await transporter.sendMail(this.mailOptions);
            console.log('Email sent: ' + info.response);
            return 'Email sent successfully';
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Error sending email');
        }
    }
}

module.exports = Mail;
