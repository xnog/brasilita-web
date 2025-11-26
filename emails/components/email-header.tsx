import { Img, Section } from '@react-email/components';

interface EmailHeaderProps {
  baseUrl?: string;
}

export function EmailHeader({ baseUrl = 'https://brasilita.com' }: EmailHeaderProps) {
  return (
    <Section style={header}>
      <Img
        src={`${baseUrl}/logo-brasilita.png`}
        width="120"
        alt="Brasilità"
        style={logo}
      />
    </Section>
  );
}

const header = {
  backgroundColor: '#ffffff',
  padding: '20px 16px',
  textAlign: 'center' as const,
  boxSizing: 'border-box' as const,
  width: '100%',
};

const logo = {
  margin: '0 auto',
  display: 'block',
  maxWidth: '120px',
  width: '100%',
  height: 'auto',
};
