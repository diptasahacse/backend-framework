export class Email {
 async send(email: string, message: string) {
    console.log(`Sending email to ${email}: ${message}`);
  }
}
