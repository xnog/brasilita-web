import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { EmailFooter } from './components/email-footer';
import { EmailHeader } from './components/email-header';

interface ForgotPasswordEmailProps {
  userEmail?: string;
  resetUrl?: string;
}

export const ForgotPasswordEmail = ({
  userEmail = 'exemplo@email.com',
  resetUrl = 'https://brasilita.com/auth/reset-password?token=example-token',
}: ForgotPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Redefinição de senha - Brasilità</Preview>
      <Body style={main}>
        <Container style={container}>
          <EmailHeader />

          <Section style={content}>
            <Heading style={h1}>Redefinir sua senha</Heading>

            <Text style={text}>
              Olá,
            </Text>

            <Text style={text}>
              Recebemos uma solicitação para redefinir a senha da sua conta ({userEmail}).
            </Text>

            <Text style={text}>
              Clique no botão abaixo para criar uma nova senha. Este link é válido por 1 hora.
            </Text>

            <Section style={buttonContainer}>
              <Button style={button} href={resetUrl}>
                Redefinir Senha
              </Button>
            </Section>

            <Text style={text}>
              Se você não solicitou esta redefinição, pode ignorar este email com segurança.
              Sua senha não será alterada.
            </Text>

            <Text style={smallText}>
              Se o botão não funcionar, copie e cole este link no seu navegador:
              <br />
              {resetUrl}
            </Text>

            <Text style={signature}>
              <span style={signatureBrand}>
                <strong>Brasilità - Seu imóvel na Itália</strong>
              </span>
              <br />
              <br />
              Tubarão, Santa Catarina
            </Text>
          </Section>
        </Container>

        <EmailFooter />
      </Body>
    </Html>
  );
};

export default ForgotPasswordEmail;

// Estilos
const main = {
  backgroundColor: '#f6f6f6',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  margin: '0',
  padding: '0',
  width: '100%',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  marginTop: '20px',
  marginBottom: '20px',
  borderRadius: '8px',
  overflow: 'hidden',
  maxWidth: '600px',
  width: '100%',
  boxSizing: 'border-box' as const,
};

const content = {
  padding: '20px 16px',
};

const h1 = {
  color: '#1a1a1a',
  fontSize: '28px',
  fontWeight: '700',
  lineHeight: '1.3',
  margin: '16px 0',
};

const text = {
  color: '#444',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};

const smallText = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '16px 0',
  wordBreak: 'break-all' as const,
};

const buttonContainer = {
  margin: '32px 0',
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#22c55e',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 32px',
};

const signature = {
  color: '#666666',
  fontSize: '14px',
  lineHeight: '24px',
  marginTop: '64px',
  textAlign: 'center' as const,
};

const signatureBrand = {
  fontSize: '16px',
};
