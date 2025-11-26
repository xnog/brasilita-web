import {
  Body,
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
import { PropertyCard, type PropertyData } from './components/property-card';

interface DailyAlertsEmailProps {
  userName?: string;
  alertName?: string;
  properties?: PropertyData[];
  baseUrl?: string;
}

// Dados de exemplo para preview
const EXAMPLE_PROPERTIES: PropertyData[] = [
  {
    id: '1',
    title: 'Apartamento com Terraço em Roma',
    price: 320000,
    location: 'Centro Histórico, Roma',
    area: 95,
    rooms: 4,
    bedrooms: 2,
    bathrooms: 2,
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'],
  },
  {
    id: '2',
    title: 'Villa com Piscina em Como',
    price: 890000,
    location: 'Lago di Como, Lombardia',
    area: 250,
    rooms: 8,
    bedrooms: 5,
    bathrooms: 4,
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'],
  },
];

export default function DailyAlertsEmail({
  userName = 'João Santos',
  alertName = 'Imóveis até €500k em Lombardia',
  properties = EXAMPLE_PROPERTIES,
  baseUrl = 'https://brasilita.com',
}: DailyAlertsEmailProps) {
  const previewText = `${properties.length} novos imóveis encontrados para seu alerta "${alertName}"`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <EmailHeader baseUrl={baseUrl} />

          <Section style={content}>
            <Section style={alertBadge}>
              <Text style={alertBadgeText}>Alerta de Imóveis</Text>
            </Section>

            <Heading style={h1}>{userName ? `Olá, ${userName}` : 'Olá'}</Heading>

            <Text style={text}>
              Encontramos <strong>{properties.length} {properties.length === 1 ? 'novo imóvel' : 'novos imóveis'}</strong> que
              atendem aos critérios do seu alerta:
            </Text>

            <Section style={alertNameContainer}>
              <Text style={alertNameText}>{alertName}</Text>
            </Section>

            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                baseUrl={baseUrl}
              />
            ))}

            <Text style={text}>
              <a href={`${baseUrl}/dashboard/alerts`} style={link}>
                Gerencie seus alertas
              </a>{' '}
              no painel de controle.
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

        <EmailFooter baseUrl={baseUrl} />
      </Body>
    </Html>
  );
}

// Estilos
const main = {
  backgroundColor: '#f6f6f6',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
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

const alertBadge = {
  backgroundColor: '#f1f5f9', // slate-100
  borderRadius: '6px',
  padding: '8px 16px',
  textAlign: 'center' as const,
  marginBottom: '24px',
  display: 'inline-block',
};

const alertBadgeText = {
  color: '#475569', // slate-600
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
};

const h1 = {
  color: '#1a1917',
  fontSize: '28px',
  fontWeight: '700',
  lineHeight: '36px',
  margin: '0 0 24px 0',
};

const text = {
  color: '#333333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0 0 20px 0',
};

const alertNameContainer = {
  backgroundColor: '#f1f5f9', // slate-100
  border: '1px solid #e2e8f0', // slate-200
  borderRadius: '8px',
  padding: '16px 20px',
  marginBottom: '24px',
};

const alertNameText = {
  color: '#1e293b', // slate-800
  fontSize: '18px',
  fontWeight: '600',
  margin: '0',
};

const link = {
  color: '#1a1917',
  textDecoration: 'underline',
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
