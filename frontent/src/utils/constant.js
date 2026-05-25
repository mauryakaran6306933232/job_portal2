// ✅ Centralized API & Socket URLs
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const USER_API_END_POINT = `${BASE_URL}/user`;
export const JOB_API_END_POINT = `${BASE_URL}/job`;
export const COMPANY_API_END_POINT = `${BASE_URL}/company`;
export const APPLICATION_API_END_POINT = `${BASE_URL}/application`;
export const API_V1 = `${BASE_URL}/api/v1`;
export const SOCKET_URL = BASE_URL;