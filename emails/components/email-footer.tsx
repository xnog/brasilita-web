import { Link, Section, Text } from '@react-email/components';

interface EmailFooterProps {
  baseUrl?: string;
}

export function EmailFooter({
  baseUrl = 'https://brasilita.com',
}: EmailFooterProps) {
  return (
    <Section style={footerContainer}>
      <Section style={footer}>
        <Text style={footerText}>
          © {new Date().getFullYear()} Brasilità. Todos os direitos reservados.
        </Text>
        <Text style={footerText}>
          <Link href={`${baseUrl}/privacy-policy`} style={link}>
            Política de Privacidade
          </Link>
        </Text>
        <Text style={footerTextSmall}>
          Esta é uma mensagem automática. Por favor, não responda.
        </Text>
      </Section>
    </Section>
  );
}

const footerContainer = {
  backgroundColor: '#f6f6f6',
  width: '100%',
};

const footer = {
  padding: '20px 16px',
  textAlign: 'center' as const,
  boxSizing: 'border-box' as const,
  maxWidth: '600px',
  margin: '0 auto',
  width: '100%',
};

const footerText = {
  fontSize: '14px',
  lineHeight: '24px',
  color: '#666666',
  margin: '8px 0',
};

const footerTextSmall = {
  fontSize: '12px',
  lineHeight: '20px',
  color: '#999999',
  margin: '8px 0',
};

const link = {
  color: '#1a1917',
  textDecoration: 'underline',
};
