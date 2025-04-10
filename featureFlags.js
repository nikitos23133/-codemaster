// featureFlags.js
import Unleash from 'unleash-client';

const unleash = new Unleash({
  appName: 'codemaster',
  url: 'https://unleash.example.com/api',
  instanceId: 'your-instance-id'
});

export const isFeatureEnabled = (feature) => 
  unleash.isEnabled(feature, { userId: currentUser.id });
