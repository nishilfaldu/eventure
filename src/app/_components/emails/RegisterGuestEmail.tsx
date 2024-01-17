import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
  Link,
  render,
} from "@react-email/components";
import dayjs from "dayjs";
import * as React from "react";



interface RegisterGuestEmailProps {
  guestFirstName?: string;
  eventDate?: Date;
  eventLocation?: string;
  eventName?: string;
  contactEmail?: string;
  contactPhone?: string;
  registerHref: string;
}

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL
  ? `https://${process.env.NEXT_PUBLIC_SERVER_URL}`
  : "";

export const RegisterGuestEmail = ({
  guestFirstName = "Zeno",
  eventDate = new Date("September 7, 2022, 10:58 am"),
  eventLocation = "Upland, California, United States",
  eventName = "[Event Name]",
  contactEmail = "sample@gmail.com",
  contactPhone = "+15130987654",
  registerHref = "www.google.com",
}: RegisterGuestEmailProps) => {
  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(eventDate);

  return (
    <Html>
      <Head />
      <Preview>Register Guest Email</Preview>
      <Body style={main}>
        <Container>
          <Section style={logo}>
            <Img src={`${baseUrl}/assets/eventure-banner.png`} />
          </Section>

          <Section style={content}>
            <Img width={620} src={baseUrl ? `${baseUrl}/assets/eventure-header.png` : "https://react-email-demo-ijnnx5hul-resend.vercel.app/static/yelp-header.png"} />

            <Row style={{ ...boxInfos, paddingBottom: "0" }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                    Dear {guestFirstName},
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                    We are excited to invite you to {eventName}!
                </Heading>

                <Text style={paragraph}>
                  <b>Date and Time: </b>
                  {formattedDate}
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  <b>Location: </b>
                  {eventLocation}
                </Text>
                <Text style={paragraph}>
                    We believe that your presence will add immense value to our event, and we would be
                    honored to have you join us. To ensure we have everything prepared for your comfort,
                    we kindly request you to register for the event.
                </Text>
                <Text style={{ ...paragraph, marginTop: -5 }}>
                  If you have any questions or require further information, please feel free to reach
                  out to us at {contactEmail} or {contactPhone}.
                </Text>
              </Column>
            </Row>
            <Row style={{ ...boxInfos, paddingTop: "0" }}>
              <Column style={containerButton} colSpan={2}>
                <Link href={registerHref}>
                  <Button style={button}>Register</Button>
                </Link>
              </Column>
            </Row>
          </Section>

          <Section style={containerImageFooter}>
            <Img width={620} src={baseUrl ? `${baseUrl}/assets/yelp-footer.png` : "https://react-email-demo-ijnnx5hul-resend.vercel.app/static/yelp-footer.png"} />
          </Section>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}
          >
              © {dayjs().year()} | Eventure Inc., 2545 Dennis Street, Cincinnati, OH 45219,
              U.S.A. | www.eventure.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
};


export const RegisterGuestEmailHtml = (
  props: RegisterGuestEmailProps
) =>
  render(<RegisterGuestEmail {...props} />, {
    pretty: true,
  });


const main = {
  backgroundColor: "#fff",
  fontFamily:
      "-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif",
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: "30px 20px",
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#e00707",
  padding: "12px 30px",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const boxInfos = {
  padding: "20px 40px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};
