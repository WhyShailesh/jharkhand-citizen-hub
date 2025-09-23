import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Lock, User, Globe, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  
  const { login, isAuthenticated, isLoading } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { toast } = useToast();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !role) {
      setError('Please fill in all required fields');
      return;
    }

    // Simulate MFA step
    if (!otpStep) {
      setOtpStep(true);
      toast({
        title: "OTP Sent",
        description: "Verification code sent to your registered mobile number",
      });
      return;
    }

    if (otp !== '123456') {
      setError('Invalid OTP. Use 123456 for demo');
      return;
    }

    const success = await login(email, password, role);
    if (!success) {
      setError('Authentication failed. Please check your credentials.');
      setOtpStep(false);
      setOtp('');
    }
  };

  const demoCredentials = [
    { email: 'admin@jharkhand.gov.in', role: 'Super Admin', desc: 'Full system access' },
    { email: 'dept.admin@udd.jh.in', role: 'Department Admin', desc: 'Department management' },
    { email: 'field.staff@pwd.jh.in', role: 'Field Staff', desc: 'Issue resolution' },
    { email: 'viewer@jharkhand.gov.in', role: 'Viewer', desc: 'Read-only access' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Government Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full shadow-lg mb-4">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {t('app.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('app.subtitle')}
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">
                {otpStep ? 'Verify OTP' : 'Secure Login'}
              </CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              >
                <Globe className="w-4 h-4 mr-1" />
                {language === 'en' ? 'हिं' : 'EN'}
              </Button>
            </div>
            <CardDescription>
              {otpStep 
                ? 'Enter the 6-digit OTP sent to your registered mobile number'
                : 'Access the Civic Issue Central System'
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              {!otpStep ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="role">Select Role (Demo)</Label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your role" />
                      </SelectTrigger>
                      <SelectContent>
                        {demoCredentials.map((cred) => (
                          <SelectItem key={cred.role} value={cred.role}>
                            <div>
                              <div className="font-medium">{cred.role}</div>
                              <div className="text-xs text-muted-foreground">{cred.desc}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@jharkhand.gov.in"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your secure password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP (use 123456)"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="pl-10 text-center text-lg tracking-widest"
                      maxLength={6}
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Demo OTP: <span className="font-mono font-semibold">123456</span>
                  </p>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? 'Authenticating...' : otpStep ? 'Verify & Login' : 'Continue to OTP'}
              </Button>

              {otpStep && (
                <Button 
                  type="button" 
                  variant="ghost" 
                  className="w-full" 
                  onClick={() => {
                    setOtpStep(false);
                    setOtp('');
                    setError('');
                  }}
                >
                  Back to Login
                </Button>
              )}
            </form>

            {!otpStep && (
              <div className="mt-6 space-y-3">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Demo Credentials</span>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  {demoCredentials.map((cred) => (
                    <Button
                      key={cred.role}
                      variant="outline"
                      size="sm"
                      className="justify-start h-auto p-3"
                      onClick={() => {
                        setEmail(cred.email);
                        setRole(cred.role);
                        setPassword('demo123');
                      }}
                    >
                      <div className="text-left">
                        <div className="font-medium text-sm">{cred.role}</div>
                        <div className="text-xs text-muted-foreground">{cred.email}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>© Government of Jharkhand — Reserved 2025</p>
          <p className="mt-1">Secure Government Portal • SSL Encrypted</p>
        </div>
      </div>
    </div>
  );
};

export default Login;