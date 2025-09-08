# Mobile Build Setup - GitHub Actions

## 🚀 Configuração Otimizada

**Apps só fazem build quando necessário** - não a cada atualização do site!

**🎯 Os apps apontam para https://brasilita.com** - atualizações são instantâneas!

## 📱 Quando o Build é Executado

### Automático:
- ✅ **Tags v\***: `git tag v1.0.0 && git push --tags` (releases)
- ✅ **Mudanças em arquivos mobile**: `capacitor.config.ts`, `android/`, `ios/`

### Manual:
- ✅ **Actions tab**: Botão "Run workflow"

### ❌ NÃO executa:
- Mudanças no código Next.js
- Push normal para master
- Updates do site

## 🔐 Secrets para Publicação nas Stores

Vá em **Settings > Secrets and variables > Actions**:

### Android (Google Play):
```bash
# 1. Gerar keystore
keytool -genkey -v -keystore brasilita.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias brasilita

# 2. Converter para base64
base64 brasilita.keystore | tr -d '\n'
```

**Secrets:**
```
ANDROID_KEYSTORE_BASE64=<output_do_base64>
ANDROID_KEYSTORE_PASSWORD=sua_senha
ANDROID_KEY_PASSWORD=sua_senha_da_chave
ANDROID_KEY_ALIAS=brasilita
```

### iOS (App Store):
```bash
# 1. Exportar certificado .p12 do Keychain
# 2. Baixar provisioning profile do Apple Developer

# 3. Converter para base64
base64 certificate.p12 | tr -d '\n'
base64 profile.mobileprovision | tr -d '\n'
```

**Secrets:**
```
IOS_CERTIFICATE_BASE64=<certificado_p12_em_base64>
IOS_CERTIFICATE_PASSWORD=senha_do_certificado
IOS_PROVISIONING_PROFILE_BASE64=<profile_em_base64>
```

## 🏪 Fluxo de Publicação

### 1. Desenvolvimento:
```bash
# Build manual para testar
gh workflow run build-mobile.yml
```

### 2. Release:
```bash
# Cria tag e publica automaticamente
git tag v1.0.0
git push --tags
# → Gera APK/IPA assinados
# → Cria GitHub Release
```

### 3. Deploy nas Stores:
- **Google Play**: Upload manual do APK ou via Google Play Console API
- **App Store**: Upload via Xcode ou Transporter

## ✅ Vantagens desta Configuração:

- 📱 **Apps sempre atualizados**: Mudanças no site aparecem instantaneamente
- ⚡ **Builds rápidos**: Só quando necessário
- 🔄 **Zero manutenção**: Atualizações automáticas do site
- 📦 **Menor tamanho**: Apps são containers leves
- 🚀 **Deploy independente**: Site e apps desacoplados