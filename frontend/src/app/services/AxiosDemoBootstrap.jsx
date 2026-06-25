"use client";

import { useEffect } from "react";
import axios from "axios";
import { getMockResponse, shouldUseMockFallback } from "./mockBackend";

let isRegistered = false;

export default function AxiosDemoBootstrap() {
  useEffect(() => {
    if (isRegistered) {
      return;
    }

    isRegistered = true;

    axios.interceptors.request.use((config) => {
      if (typeof window !== "undefined" && !config.headers?.Authorization) {
        const token = localStorage.getItem("access_token");
        if (token) {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
      }

      return config;
    });

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (shouldUseMockFallback(error)) {
          const mockResponse = getMockResponse(error.config);
          if (mockResponse) {
            return Promise.resolve(mockResponse);
          }
        }

        return Promise.reject(error);
      }
    );
  }, []);

  return null;
}
