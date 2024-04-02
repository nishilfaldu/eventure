

export function generateEmail(guestName: string, eventName: string,
  eventDate: string, eventLocation: string,
  contactEmail: string, contactPhone: string, registerHref: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? "";

  const formattedEmail = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">

  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
  </head>
  <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Yelp recent login</div>

  <body style="background-color:#fff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:37.5em">
      <tbody>
        <tr style="width:100%">
          <td>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:30px 20px">
              <tbody>
                <tr>
                  <td><img src="${baseUrl}/images/eventure-logo.png" style="display:block;outline:none;border:none;text-decoration:none" /></td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="border:1px solid rgb(0,0,0, 0.1);border-radius:3px;overflow:hidden">
              <tbody>
                <tr>
                  <td>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
                      <tbody style="width:100%">
                        <tr style="width:100%"><img src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/yelp-header.png" style="display:block;outline:none;border:none;text-decoration:none;max-width:100%" width="620" /></tr>
                      </tbody>
                    </table>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:20px;padding-bottom:0">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td data-id="__react-email-column">
                            <h1 style="font-size:32px;font-weight:bold;text-align:center">Dear ${guestName},</h1>
                            <h2 style="font-size:26px;font-weight:bold;text-align:center">We are excited to invite you to ${eventName}!</h2>
                            <p style="font-size:16px;line-height:24px;margin:16px 0"><b>Time: </b>${eventDate}</p>
                            <p style="font-size:16px;line-height:24px;margin:16px 0;margin-top:-5px"><b>Location: </b>${eventLocation}</p>
                            <p style="font-size:16px;line-height:24px;margin:16px 0">We believe that your presence will add immense value to our event, and we would be
                            honored to have you join us. To ensure we have everything prepared for your comfort,
                            we kindly request you to register for the event.</p>
                            <p style="font-size:16px;line-height:24px;margin:16px 0;margin-top:-5px">
                            If you have any questions or require further information, please feel free to reach
                            out to us at ${contactEmail} or ${contactPhone}.
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:20px;padding-top:0">
                      <tbody style="width:100%">
                        <tr style="width:100%">
                          <td colSpan="2" data-id="__react-email-column" style="display:flex;justify-content:center;width:100%"><a style="background-color:#e00707;border-radius:3px;color:#FFF;font-weight:bold;border:1px solid rgb(0,0,0, 0.1);cursor:pointer;padding:12px 30px 12px 30px;line-height:100%;text-decoration:none;display:inline-block;max-width:100%" target="_blank" href=${registerHref}><span><!--[if mso]><i style="letter-spacing: 30px;mso-font-width:-100%;mso-text-raise:18" hidden>&nbsp;</i><![endif]--></span><span style="max-width:100%;display:inline-block;line-height:120%;mso-padding-alt:0px;mso-text-raise:9px">Register</span><span><!--[if mso]><i style="letter-spacing: 30px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:45px 0 0 0">
              <tbody>
                <tr>
                  <td><img src="https://react-email-demo-jsqyb0z9w-resend.vercel.app/static/yelp-footer.png" style="display:block;outline:none;border:none;text-decoration:none;max-width:100%" width="620" /></td>
                </tr>
              </tbody>
            </table>
            <p style="font-size:12px;line-height:24px;margin:16px 0;text-align:center;color:rgb(0,0,0, 0.7)">© 2024 | Eventure Inc., 2545 Dennis Street, Cincinnati, OH 45219, U.S.A. | www.eventure.network</p>
          </td>
        </tr>
      </tbody>
    </table>
  </body>

</html>
    `;

  return formattedEmail;
}
