// =============================================================================
// TypeScript Type Definitions
// =============================================================================

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  apiKey?: string;
  credits: number;
  totalRequests: number;
  createdAt: string;
  lastUsed?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  model?: string;
  responseTime?: number;
}

export interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}

export interface ChatApiResponse {
  success: boolean;
  response: string;
  credits_remaining: number;
  request_id: string;
  model: string;
  response_time_ms: number;
  timestamp: string;
}

export interface UserStats {
  success: boolean;
  credits_remaining: number;
  total_requests: number;
  email: string;
  api_key: string;
  created_at: string;
  last_used?: string;
  account_status: string;
}

export interface UsageStats {
  success: boolean;
  account: {
    credits_remaining: number;
    total_requests: number;
    email: string;
    created_at: string;
    last_used?: string;
    status: string;
  };
  usage: {
    recent_requests: number;
    avg_response_time_ms: number;
    request_history: RequestHistory[];
  };
  limits: {
    max_message_length: number;
    max_requests_per_hour: number;
    cost_per_request: number;
  };
}

export interface RequestHistory {
  request_id: string;
  timestamp: string;
  message_preview: string;
  response_length: number;
  response_time_ms: number;
  credits_used: number;
  model: string;
}

export interface HealthCheck {
  success: boolean;
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  version: string;
  uptime_seconds?: number;
  uptime_readable?: string;
  memory?: {
    used: number;
    total: number;
    external: number;
  };
  node_version?: string;
  environment?: string;
}
