const localDashboardUrl = "http://localhost:3001";
const productionDashboardUrl = "https://zerodha-neon-2w2u.vercel.app";

export function absoluteDashboardUrl(value, fallback = productionDashboardUrl) {
  const input = (value || fallback).trim();
  const scheme = /^https?:\/\//i.test(input)
    ? ""
    : /^(localhost|127\.0\.0\.1)(:\d+)?(?:\/|$)/i.test(input)
      ? "http://"
      : "https://";

  return new URL(`${scheme}${input}`).origin;
}

export function getDashboardUrl() {
  const fallback = process.env.NODE_ENV === "production"
    ? productionDashboardUrl
    : localDashboardUrl;

  return absoluteDashboardUrl(process.env.REACT_APP_DASHBOARD_URL, fallback);
}

export function getDashboardRedirectUrl(envValue) {
  return absoluteDashboardUrl(envValue, `${getDashboardUrl()}/`);
}
