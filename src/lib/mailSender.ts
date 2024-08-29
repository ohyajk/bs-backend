

import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";


const mailerSend = new MailerSend({
    apiKey: Bun.env.MAILERSEND_API_KEY || '',
});

export const sendMail = async (email: string, otp: string) => {
  
  
  const sender = new Sender('oa@trial-z86org861814ew13.mlsender.net', 'Oluwaseun Akinola');
  const reciepient = [new Recipient(email, 'Recipient')]
  const emailParams = new EmailParams()
      .setFrom(sender)
      .setTo(reciepient)
      .setSubject("Subject")
      .setHtml(
        `
<!DOCTYPE html>
<html lang="und" dir="auto" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<title></title>
<!--[if !mso]><!-->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!--<![endif]-->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<!--[if mso]>
<noscript>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG />
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
</noscript>
<![endif]-->
<!--[if lte mso 11]>
<style type="text/css">
.mj-outlook-group-fix {
  width: 100% !important;
}
</style>
<![endif]-->
<style type="text/css">
@media only screen and (min-width: 480px) {
.mj-column-per-100 {
width: 100% !important;
max-width: 100%;
}

.mj-column-px-250 {
width: 250px !important;
max-width: 250px;
}
}
</style>

<style type="text/css">
@media only screen and (max-width: 479px) {
table.mj-full-width-mobile {
width: 100% !important;
}

td.mj-full-width-mobile {
width: auto !important;
}
}
</style>

</head>

<body style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; word-spacing: normal; background-color: #fafafa;">
<div style="
display: none;
font-size: 1px;
color: #ffffff;
line-height: 1px;
max-height: 0px;
max-width: 0px;
opacity: 0;
overflow: hidden;
">
OTP for email confirmation
</div>
<div style="background-color: #fafafa" lang="und" dir="auto">
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
<tbody>
  <tr>
    <td style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div style="margin: 0px auto; max-width: 600px">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
          <tbody>
            <tr>
              <td style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; direction: ltr; font-size: 0px; padding: 16px; text-align: center;" align="center">
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" width="600px" ><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:568px;" width="568" bgcolor="#ffffff" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                <div style="
                    background: #ffffff;
                    background-color: #ffffff;
                    margin: 0px auto;
                    border-radius: 8px;
                    max-width: 568px;
                  ">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; background-color: #ffffff; width: 100%; border-radius: 8px;" width="100%" bgcolor="#ffffff">
                    <tbody>
                      <tr>
                        <td style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; direction: ltr; font-size: 0px; padding: 16px; text-align: center;" align="center">
                          <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:536px;" ><![endif]-->
                          <div class="mj-column-per-100 mj-outlook-group-fix" style="
                              font-size: 0px;
                              text-align: left;
                              direction: ltr;
                              display: inline-block;
                              vertical-align: top;
                              width: 100%;
                            ">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tbody>
                                <tr>
                                  <td style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; padding: 32px;" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                      <tbody>
                                        <tr>
                                          <td align="center" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-size: 0px;  word-break: break-word;">
                                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse; border-spacing: 0px;">
                                              <tbody>
                                                <tr>
                                                  <td style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 180px;" width="180">
                                                    <img alt="LogoIpsum" src="https://i.imghippo.com/files/cwKKE1724828854.png" style="line-height: 100%; -ms-interpolation-mode: bicubic; border: 0; display: block; outline: none; text-decoration: none; height: auto; width: 100%; font-size: 13px;" width="180" height="auto">
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="center" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-size: 0px; padding: 0; word-break: break-word;">
                                            <div style="
                                                font-family: Inter,
                                                  Arial;
                                                font-size: 13px;
                                                line-height: 1;
                                                text-align: center;
                                                color: #000000;
                                              ">
                                              <h1 style="margin: 16px 0px">
                                                Please confirm your
                                                email
                                              </h1>
                                              <p style="display: block; font-size: 16px; margin: 0px; margin-bottom: 12px;">
                                                Use this code to confirm
                                                your email and complete
                                                login.
                                              </p>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:250px;" ><![endif]-->
                          <div class="mj-column-px-250 mj-outlook-group-fix" style="
                              font-size: 0px;
                              text-align: left;
                              direction: ltr;
                              display: inline-block;
                              vertical-align: top;
                              width: 100%;
                            ">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tbody>
                                <tr>
                                  <td style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ebe3ff; border-radius: 8px; vertical-align: top; padding: 16px;" bgcolor="#ebe3ff" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                      <tbody>
                                        <tr>
                                          <td align="center" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-size: 0px; padding: 0; word-break: break-word;">
                                            <div style="
                                                font-family: Inter,
                                                  Arial;
                                                font-size: 32px;
                                                font-weight: 700;
                                                letter-spacing: 16px;
                                                line-height: 32px;
                                                text-align: center;
                                                color: #000000;
                                              ">
                                              <p style="display: block; margin-bottom: 12px; font-size: 32px; margin: 0px; margin-right: -16px; padding: 0px;">
                                                ${otp}
                                              </p>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:536px;" ><![endif]-->
                          <div class="mj-column-per-100 mj-outlook-group-fix" style="
                              font-size: 0px;
                              text-align: left;
                              direction: ltr;
                              display: inline-block;
                              vertical-align: top;
                              width: 100%;
                            ">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tbody>
                                <tr>
                                  <td style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; vertical-align: top; padding-top: 16px;" valign="top">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                      <tbody>
                                        <tr>
                                          <td align="center" style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-size: 0px; padding: 10px 25px; word-break: break-word;">
                                            <div style="
                                                font-family: Inter,
                                                  Arial;
                                                font-size: 13px;
                                                line-height: 1;
                                                text-align: center;
                                                color: #555555;
                                              ">
                                              <p style="display: block; font-size: 16px; margin: 0px; margin-bottom: 12px;">
                                                This code is valid for
                                                15 minutes.
                                              </p>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <!--[if mso | IE]></td></tr></table><![endif]-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]></td></tr></table></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--[if mso | IE]></td></tr></table><![endif]-->
    </td>
  </tr>
</tbody>
</table>
</div>
</body>
</html>
`
      )
      .setText("Greetings from the team, you got this message through MailerSend.");
      mailerSend.email
      .send(emailParams)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
};



