import { initializeDemoSession, isDemoToken, shouldUseMockFallback } from "./mockBackend";

export const demoLoginOnFailure = (error, overrides = {}) => {
  if (!shouldUseMockFallback(error)) {
    return null;
  }

  return initializeDemoSession(overrides);
};

export const canRefreshDemoToken = () => {
  if (typeof window === "undefined") return false;
  return isDemoToken(localStorage.getItem("refresh_token"));
};

export const refreshDemoAccessToken = () => {
  if (typeof window === "undefined") return null;

  const userId = localStorage.getItem("user_id") || "demo-user-1";
  const access = `demo-access-${userId}`;
  localStorage.setItem("access_token", access);
  return access;
};
