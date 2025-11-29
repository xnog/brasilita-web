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

interface WeeklySuggestionsEmailProps {
  userName?: string;
  properties?: PropertyData[];
  baseUrl?: string;
}

// Dados de exemplo para preview
const EXAMPLE_PROPERTIES: PropertyData[] = [
  {
    id: '1',
    title: 'Apartamento Moderno em Milão',
    price: 280000,
    location: 'Milão, Lombardia',
    area: 85,
    rooms: 3,
    bedrooms: 2,
    bathrooms: 1,
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'],
  },
  {
    id: '2',
    title: 'Casa de Campo na Toscana',
    price: 450000,
    location: 'Florença, Toscana',
    area: 180,
    rooms: 6,
    bedrooms: 4,
    bathrooms: 3,
    images: ['https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&h=600&fit=crop'],
  },
  {
    id: '3',
    title: 'Cobertura com Vista para o Mar',
    price: 620000,
    location: 'Costa Amalfitana, Campânia',
    area: 120,
    rooms: 4,
    bedrooms: 3,
    bathrooms: 2,
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'],
  },
];

export default function WeeklySuggestionsEmail({
  userName = 'Maria Silva',
  properties = EXAMPLE_PROPERTIES,
  baseUrl = 'https://brasilita.com',
}: WeeklySuggestionsEmailProps) {
  const previewText = `${userName}, confira ${properties.length} novos imóveis selecionados para você`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <EmailHeader baseUrl={baseUrl} />

          <Section style={content}>
            <Heading style={h1}>{userName ? `Olá, ${userName}` : 'Olá'}</Heading>

            <Text style={text}>
              Identificamos <strong>{properties.length} {properties.length === 1 ? 'novo imóvel' : 'novos imóveis'}</strong> que
              {properties.length === 1 ? ' corresponde' : ' correspondem'} ao seu perfil de busca:
            </Text>

            {properties.length === 0 ? (
              <Section style={emptyState}>
                <Text style={emptyText}>
                  Não identificamos novos imóveis esta semana que correspondem ao seu perfil.
                  Continuaremos monitorando o mercado por você.
                </Text>
              </Section>
            ) : (
              <>
                {properties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    baseUrl={baseUrl}
                  />
                ))}

                <Section style={ctaSection}>
                  <a href={`${baseUrl}/properties`} style={ctaButton}>
                    Ver mais imóveis
                  </a>
                </Section>
              </>
            )}

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

        <EmailFooter
          baseUrl={baseUrl}
          manageLink={{
            href: `${baseUrl}/settings`,
            text: 'Preferências de Email'
          }}
        />
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

const emptyState = {
  backgroundColor: '#f9f9f9',
  border: '1px solid #e5e5e5',
  borderRadius: '8px',
  padding: '32px 24px',
  textAlign: 'center' as const,
  marginBottom: '24px',
};

const emptyText = {
  color: '#666666',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
};

const ctaSection = {
  textAlign: 'center' as const,
  marginTop: '32px',
  marginBottom: '24px',
};

const ctaButton = {
  backgroundColor: '#1a1917',
  borderRadius: '6px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: '600',
  padding: '14px 32px',
  textDecoration: 'none',
  textAlign: 'center' as const,
};
