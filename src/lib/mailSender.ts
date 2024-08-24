import SparkPost = require('sparkpost');
  
const client = new SparkPost(Bun.env.SP_API_KEY);

export const sendMail = async (email: string, otp: string) => {
client.transmissions.send({
    options: {
      sandbox: false,
    },
    content: {
      from: 'bikestore@mail.jkweb.in',
      subject: 'Hello, Bike Lover!',
      html:`<html><body><p>Your OTP for login is ${otp}</p></body></html>`
    },
    recipients: [
      {address: email}
    ]
  })
  .then(data => {
    console.log('Woohoo! You just sent your first mailing!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });
}
