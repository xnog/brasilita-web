import { Column, Img, Link, Row, Section, Text } from '@react-email/components';

export interface PropertyData {
  id: string;
  title: string;
  price: number;
  location: string;
  area?: number;
  rooms?: number;
  bedrooms?: number;
  bathrooms?: number;
  images?: string[];
}

interface PropertyCardProps {
  property: PropertyData;
  baseUrl?: string;
}

export function PropertyCard({ property, baseUrl = 'https://brasilita.com' }: PropertyCardProps) {
  const propertyUrl = `${baseUrl}/properties/${property.id}?utm_source=email&utm_medium=weekly&utm_campaign=suggestions`;
  const imageUrl = property.images?.[0] || 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&h=600&fit=crop';

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <Link href={propertyUrl} style={cardLink}>
      <Section style={cardContainer}>
        <Img
          src={imageUrl}
          alt={property.title}
          style={image}
        />

        <Section style={cardContent}>
          <Text style={price}>{formattedPrice}</Text>

          <Text style={title}>{property.title}</Text>

          <Text style={location}>{property.location}</Text>

          {(property.area || property.rooms || property.bedrooms || property.bathrooms) && (
            <Row style={features}>
              {property.rooms && (
                <Column style={feature}>
                  <Text style={featureText}>
                    {property.rooms} {property.rooms === 1 ? 'cômodo' : 'cômodos'}
                  </Text>
                </Column>
              )}
              {property.bedrooms && (
                <Column style={feature}>
                  <Text style={featureText}>
                    {property.bedrooms} {property.bedrooms === 1 ? 'quarto' : 'quartos'}
                  </Text>
                </Column>
              )}
              {property.bathrooms && (
                <Column style={feature}>
                  <Text style={featureText}>
                    {property.bathrooms} {property.bathrooms === 1 ? 'banheiro' : 'banheiros'}
                  </Text>
                </Column>
              )}
              {property.area && (
                <Column style={feature}>
                  <Text style={featureText}>{property.area}m²</Text>
                </Column>
              )}
            </Row>
          )}
        </Section>
      </Section>
    </Link>
  );
}

const cardLink = {
  textDecoration: 'none',
  display: 'block',
};

const cardContainer = {
  backgroundColor: '#ffffff',
  border: '1px solid #e5e5e5',
  borderRadius: '16px',
  overflow: 'hidden',
  marginBottom: '24px',
  transition: 'box-shadow 0.3s ease',
  maxWidth: '100%',
  boxSizing: 'border-box' as const,
};

const image = {
  width: '100%',
  height: 'auto',
  display: 'block',
  maxWidth: '100%',
};

const cardContent = {
  padding: '16px',
  boxSizing: 'border-box' as const,
};

const price = {
  fontSize: '24px',
  fontWeight: '700',
  color: '#059669', // emerald-600
  margin: '0 0 12px 0',
};

const title = {
  fontSize: '18px',
  fontWeight: '700',
  lineHeight: '24px',
  color: '#1a1917',
  margin: '0 0 8px 0',
};

const location = {
  fontSize: '14px',
  lineHeight: '20px',
  color: '#64748b', // slate-500
  margin: '0 0 16px 0',
  fontWeight: '500',
};

const features = {
  marginTop: '8px',
  width: '100%',
};

const feature = {
  paddingRight: '16px',
  paddingBottom: '8px',
};

const featureText = {
  fontSize: '14px',
  lineHeight: '20px',
  color: '#475569', // slate-600
  margin: '0',
  fontWeight: '500',
};
