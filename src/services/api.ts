// =============================================================================
// API Service - Backend Communication
// =============================================================================

import { 
  ChatApiResponse, 
  UserStats, 
  UsageStats, 
  HealthCheck 
} from '@/types';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

class ApiService {
  private baseUrl: string;
  private apiKey: string | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Set API key for authenticated requests
   */
  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Clear API key
   */
  clearApiKey() {
    this.apiKey = null;
  }

  /**
   * Make HTTP request with proper headers
   */
  private async makeRequest<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}/api${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    // Add Authorization header if API key is set
    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * Health check endpoint
   */
  async checkHealth(): Promise<HealthCheck> {
    return this.makeRequest<HealthCheck>('/health');
  }

  /**
   * Send chat message to AI
   */
  async sendMessage(message: string): Promise<ChatApiResponse> {
    if (!this.apiKey) {
      throw new Error('API key required for chat requests');
    }

    return this.makeRequest<ChatApiResponse>('/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  /**
   * Get user statistics
   */
  async getUserStats(): Promise<UserStats> {
    if (!this.apiKey) {
      throw new Error('API key required for user stats');
    }

    return this.makeRequest<UserStats>('/stats');
  }

  /**
   * Get detailed usage statistics
   */
  async getUsageStats(limit: number = 10): Promise<UsageStats> {
    if (!this.apiKey) {
      throw new Error('API key required for usage stats');
    }

    return this.makeRequest<UsageStats>(`/stats/usage?limit=${limit}`);
  }

  /**
   * Get user summary (lightweight stats)
   */
  async getUserSummary() {
    if (!this.apiKey) {
      throw new Error('API key required for user summary');
    }

    return this.makeRequest('/stats/summary');
  }

  /**
   * Test API connection
   */
  async testConnection(): Promise<boolean> {
    try {
      const health = await this.checkHealth();
      return health.success && health.status === 'healthy';
    } catch (error) {
      console.error('API connection test failed:', error);
      return false;
    }
  }
}

// Create singleton instance
export const apiService = new ApiService();

// Export individual functions for easier use
export const api = {
  setApiKey: (apiKey: string) => apiService.setApiKey(apiKey),
  clearApiKey: () => apiService.clearApiKey(),
  checkHealth: () => apiService.checkHealth(),
  sendMessage: (message: string) => apiService.sendMessage(message),
  getUserStats: () => apiService.getUserStats(),
  getUsageStats: (limit?: number) => apiService.getUsageStats(limit),
  getUserSummary: () => apiService.getUserSummary(),
  testConnection: () => apiService.testConnection(),
};

export default apiService;
