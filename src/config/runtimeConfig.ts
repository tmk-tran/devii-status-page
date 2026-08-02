const apiBaseUrl = window.RUNTIME_CONFIG?.API_BASE_URL; // Read startup-generated config
const apiTenantID = window.RUNTIME_CONFIG?.API_TENANTID;

if (!apiBaseUrl) {
  throw new Error("API_BASE_URL is missing from runtime configuration"); // Fail clearly
}

if (!apiTenantID) {
  throw new Error("API_TENANTID is missing from runtime configuration");
}

export const runtimeConfig = {
  apiBaseUrl, // Expose validated configuration
  apiTenantID,
};
