'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Mail, Lock, Users, Shield, Zap, Copy, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const { user, loading, signIn, signUp, logout } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessage, setChatMessage] = useState('Hello, how are you?');
  const [chatResponse, setChatResponse] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [apiKeyCopied, setApiKeyCopied] = useState(false);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 5000);
  };

  // Helper to format numbers to 3 decimal places
  const formatCredits = (val: number | undefined | null) => {
    if (val === undefined || val === null || Number.isNaN(val)) return '0.000';
    try {
      return Number(val).toFixed(3);
    } catch {
      return '0.000';
    }
  };

  const testAPI = async () => {
    if (!chatMessage.trim()) {
      showMessage('Please enter a message');
      return;
    }

    setChatLoading(true);
    setChatResponse('');

    try {
      // For demo purposes, just simulate an API response
      await new Promise(resolve => setTimeout(resolve, 1000));
      setChatResponse(`Demo response: You asked "${chatMessage}". Your API is working correctly!`);
      showMessage('API test successful!');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      showMessage(errorMessage);
    } finally {
      setChatLoading(false);
    }
  };

  const copyApiKey = async () => {
    const keyToCopy = user?.apiKey || '';
    try {
      await navigator.clipboard.writeText(keyToCopy);
      setApiKeyCopied(true);
      showMessage('API Key copied to clipboard!');
      setTimeout(() => setApiKeyCopied(false), 2000);
    } catch {
      showMessage('Failed to copy API key');
    }
  };

  const handleAuth = async () => {
    if (!email || !password) {
      showMessage('Please fill in all fields');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      showMessage('Passwords do not match!');
      return;
    }

    if (!isLogin && password.length < 6) {
      showMessage('Password must be at least 6 characters!');
      return;
    }

    setIsLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
        showMessage('Welcome back!');
      } else {
        await signUp(email, password);
        showMessage('Account created successfully!');
      }
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      showMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Show dashboard if user is logged in
  if (user) {
  return (
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bar */}
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <Image src="/logo.png" alt="Apilage AI" width={32} height={32} className="w-8 h-8" />
                <span className="text-xl font-semibold text-gray-900">අපිලගේ AI</span>
              </div>
              
              {/* User Menu */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Hello, {user.email}</span>
                <Button 
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="text-gray-700 border-gray-300"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Dashboard Stats */}
            <div className="lg:col-span-1 space-y-6">
              {/* Welcome Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900">{formatCredits(user.credits)}</div>
                      <div className="text-xs text-gray-600">Credits</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-gray-900">{user.totalRequests}</div>
                      <div className="text-xs text-gray-600">Requests</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* API Key Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">API Key</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-3 rounded border font-mono text-sm break-all">
                    {user.apiKey || 'Loading...'}
                  </div>
                  <Button
                    onClick={copyApiKey}
                    variant="outline"
                    size="sm"
                    className="mt-3 w-full"
                  >
                    {apiKeyCopied ? <CheckCircle className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                    {apiKeyCopied ? 'Copied!' : 'Copy API Key'}
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Test */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Test</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-md resize-none text-sm"
                    rows={3}
                    placeholder="Test your API..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                  />
                  <Button 
                    onClick={testAPI} 
                    disabled={chatLoading}
                    className="w-full bg-red-600 hover:bg-red-700"
                    size="sm"
                  >
                    {chatLoading ? 'Testing...' : 'Test API'}
                  </Button>
                  {chatResponse && (
                    <div className="bg-gray-50 p-3 rounded border text-sm">
                      <div className="font-medium text-gray-900 mb-1">Response:</div>
                      <div className="text-gray-700 whitespace-pre-wrap">{chatResponse}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - API Documentation */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">API Documentation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Base URL */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Base URL</h3>
                    <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                      https://endpoint.apilageai.lk/api/chat
                    </div>
                  </div>

                  {/* Authentication */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Authentication</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Include your API key in the Authorization header:
                    </p>
                    <div className="bg-gray-900 text-white p-3 rounded font-mono text-sm overflow-x-auto">
                      <div className="text-green-400">Authorization: Bearer YOUR_API_KEY</div>
                    </div>
                  </div>

                  {/* JavaScript Example */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">JavaScript Example</h3>
                    <div className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
                      <pre>{`const response = await fetch('https://endpoint.apilageai.lk/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ${user.apiKey}'
  },
  body: JSON.stringify({
    message: 'Hello, how are you?'
  })
});

const result = await response.json();
console.log(result.response);`}</pre>
                    </div>
                  </div>

                  {/* cURL Example */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">cURL Example</h3>
                    <div className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
                      <pre>{`curl -X POST https://endpoint.apilageai.lk/api/chat \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${user.apiKey}" \\
  -d '{"message": "Hello, how are you?"}' `}</pre>
                    </div>
                  </div>

                  {/* Enable Google Search */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Enable Google Search</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      You can enable Google Search for your API call by including the <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-xs">enableGoogleSearch</code> parameter in your request body. When set to <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-xs">true</code>, the AI will use Google Search to enhance its answers with up-to-date information.
                    </p>
                    <div className="mb-3">
                      <div className="font-semibold text-gray-800 mb-1 text-xs">JavaScript Example</div>
                      <div className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
                        <pre>{`const response = await fetch('https://endpoint.apilageai.lk/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ${user.apiKey}'
  },
  body: JSON.stringify({
    message: 'What is the latest news in Sri Lanka?',
    enableGoogleSearch: true
  })
});

const result = await response.json();
console.log(result.response);`}</pre>
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 mb-1 text-xs">cURL Example</div>
                      <div className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
                        <pre>{`curl -X POST https://endpoint.apilageai.lk/api/chat \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${user.apiKey}" \\
  -d '{"message": "What is the latest news in Sri Lanka?", "enableGoogleSearch": true}'`}</pre>
                      </div>
                    </div>
                  </div>

                  {/* Response Format */}
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Response Format</h3>
                    <div className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
                      <pre>{`{
  "success": true,
  "response": "Hello! I'm doing well, thank you for asking.",
  "credits_remaining": 45,
  "timestamp": "2025-09-18T10:30:00Z"
}`}</pre>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="border-t pt-4">
                    <div className="flex flex-wrap gap-4 text-sm">
                      <a href="#" className="text-red-600 hover:text-red-800">Full Documentation</a>
                      <a href="#" className="text-red-600 hover:text-red-800">Code Examples</a>
                      <a href="#" className="text-red-600 hover:text-red-800">Support</a>
                      <a href="mailto:support@apilageai.lk" className="text-red-600 hover:text-red-800">Contact</a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            message.includes('Error') || message.includes('error') 
              ? 'bg-red-100 text-red-800 border border-red-200' 
              : 'bg-green-100 text-green-800 border border-green-200'
          }`}>
            {message}
          </div>
        )}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-5">
        {/* Left Panel - Marketing Content (40%) - Hidden on mobile */}
        <div className="hidden lg:flex lg:col-span-2 bg-gradient-to-br from-slate-800 via-slate-900 to-red-900 p-8 lg:p-12 flex-col justify-center relative overflow-hidden">
          {/* Subtle decorative elements */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/10 rounded-full -translate-y-24 translate-x-24"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
          
          <div className="relative z-10">
            {/* Logo & Brand */}
            <div className="mb-10 flex items-center space-x-3">
              <Image src="/logo.png" alt="Apilage AI" width={48} height={48} className="w-12 h-12" />
              <div>
                <h1 className="text-2xl font-bold text-white">අපිලගේ AI</h1>
                <p className="text-slate-400 text-sm">Sri Lankan AI Platform</p>
              </div>
            </div>

            {/* Main Value Prop */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-3">අධ්‍යාපන AI සහායක</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                සිංහල භාෂාවෙන් AI චැට්බොට් සහ අධ්‍යයන සහාය. ශ්‍රී ලාංකික සිලබස් අනුව විශේෂයෙන් නිර්මාණය කර ඇත.
              </p>
            </div>

            {/* Key Features - Compact */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <Users className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium text-sm">ශ්‍රී ලාංකික සිසුන්</div>
                  <div className="text-slate-400 text-xs">O/L & A/L syllabus support</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Zap className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium text-sm">සිංහල AI Models</div>
                  <div className="text-slate-400 text-xs">Native language processing</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium text-sm">Secure & Reliable</div>
                  <div className="text-slate-400 text-xs">API keys & encryption</div>
                </div>
              </div>
            </div>

            {/* Quick Start - Simplified */}
            <div className="bg-white/5 rounded-lg p-4 mb-6">
              <div className="text-white font-medium text-sm mb-3">🚀 Quick Start</div>
              <div className="space-y-1">
                <div className="text-slate-300 text-xs flex items-center">
                  <span className="w-4 h-4 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center mr-2">1</span>
                  Sign up for free
                </div>
                <div className="text-slate-300 text-xs flex items-center">
                  <span className="w-4 h-4 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center mr-2">2</span>
                  Get API key
                </div>
                <div className="text-slate-300 text-xs flex items-center">
                  <span className="w-4 h-4 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center mr-2">3</span>
                  Start building
                </div>
              </div>
            </div>

            {/* Tags - Minimal */}
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-1 bg-white/10 text-white text-xs rounded-md">Fast Setup</span>
              <span className="px-2 py-1 bg-white/10 text-white text-xs rounded-md">Sinhala</span>
              <span className="px-2 py-1 bg-white/10 text-white text-xs rounded-md">Education</span>
            </div>
          </div>
        </div>

        {/* Right Panel - Form (60%) - Full width on mobile */}
        <div className="col-span-1 lg:col-span-3 flex items-center justify-center p-6 sm:p-8 lg:p-12">
          <div className="w-full max-w-sm space-y-6">
            {/* Mobile Logo - Only shown on mobile */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Image src="/logo.png" alt="Apilage AI" width={40} height={40} className="w-10 h-10" />
                <span className="text-2xl font-bold text-gray-900">අපිලගේ AI</span>
              </div>
              <p className="text-sm text-gray-600">Sri Lankan AI Platform</p>
            </div>
            {/* Form Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-600 text-sm">
                {isLogin 
                  ? 'Access your AI dashboard' 
                  : 'Join the Sri Lankan AI platform'
                }
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="flex bg-gray-50 rounded-lg p-0.5">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  isLogin 
                    ? 'bg-white text-red-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  !isLogin 
                    ? 'bg-white text-red-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Error/Success Message */}
            {message && (
              <div className={`p-4 rounded-lg text-sm font-medium ${
                message.includes('Error') || message.includes('error') 
                  ? 'bg-red-50 text-red-700 border border-red-200' 
                  : 'bg-green-50 text-green-700 border border-green-200'
              }`}>
                {message}
              </div>
            )}

            {/* Form */}
            <form onSubmit={(e) => { e.preventDefault(); handleAuth(); }} className="space-y-4">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-10 border-gray-300 focus:border-red-500 focus:ring-red-500 text-sm"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-10 border-gray-300 focus:border-red-500 focus:ring-red-500 text-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field (Sign Up Only) */}
              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 pr-10 h-10 border-gray-300 focus:border-red-500 focus:ring-red-500 text-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Login Link */}
              {isLogin && (
                <div className="text-right">
                  <a href="#" className="text-xs text-red-600 hover:text-red-800">
                    Forgot your password?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 bg-red-600 hover:bg-red-700 text-white font-medium text-sm transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
                  </div>
                ) : (
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                )}
              </Button>

              {/* Terms (Sign Up Only) */}
              {!isLogin && (
                <p className="text-xs text-gray-500 text-center">
                  By signing up, you agree to our{' '}
                  <a href="#" className="text-red-600 hover:text-red-800">Terms</a>
                  {' '}and{' '}
                  <a href="#" className="text-red-600 hover:text-red-800">Privacy Policy</a>
                </p>
              )}
            </form>

            {/* Bottom Text */}
            <div className="text-center text-sm text-gray-600">
              {isLogin ? "New to Apilage AI?" : "Already have an account?"}{' '}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                {isLogin ? 'Create account' : 'Sign in'}
              </button>
            </div>

            {/* Documentation & Support Links */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-center space-x-4 text-xs text-gray-500">
                <a href="#" className="hover:text-red-600">API Docs</a>
                <a href="#" className="hover:text-red-600">Examples</a>
                <a href="#" className="hover:text-red-600">Support</a>
              </div>
              <div className="text-center text-xs text-gray-400">
                support@apilageai.lk
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}