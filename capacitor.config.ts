import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.brasilita.app',
  appName: 'brasilita',
  webDir: '.next',
  server: {
    url: 'https://brasilita.com',
    cleartext: false
  }
};

export default config;
