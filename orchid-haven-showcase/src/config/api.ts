// API Configuration
export const API_BASE_URL = 'https://infra-orchid-full.onrender.com';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  ME: `${API_BASE_URL}/api/auth/me`,
  
  // Properties
  PROPERTIES: `${API_BASE_URL}/api/properties`,
  PROPERTY: (id: number) => `${API_BASE_URL}/api/properties/${id}`,
  
  // Jobs
  JOBS: `${API_BASE_URL}/api/jobs`,
  JOB: (id: number) => `${API_BASE_URL}/api/jobs/${id}`,
  
  // Executive Team
  EXECUTIVE_TEAM: `${API_BASE_URL}/api/executive-team`,
  EXECUTIVE: (id: number) => `${API_BASE_URL}/api/executive-team/${id}`,
  
  // Images
  IMAGES: `${API_BASE_URL}/api/images`,
  IMAGE: (filename: string) => `${API_BASE_URL}/api/images/${filename}`,
  UPLOAD: `${API_BASE_URL}/api/upload`,
  
  // Health
  HEALTH: `${API_BASE_URL}/health`,
  API_DOCS: `${API_BASE_URL}/api`
};
