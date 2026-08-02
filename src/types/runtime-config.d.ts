export {}; // Make this file a module

declare global {
  interface Window {
    RUNTIME_CONFIG?: {
      API_BASE_URL?: string; // Runtime Devii API URL
      API_TENANTID?: string; // Runtime Devii Tenant ID
    };
  }
}
