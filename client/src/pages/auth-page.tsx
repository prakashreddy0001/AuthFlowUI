import { useState } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  registerSchema,
  type LoginInput,
  type RegisterInput,
} from "@shared/schema";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Shield, Mail, User, Lock, Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  const [, setLocation] = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const form = useForm<LoginInput | RegisterInput>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
    defaultValues: isLogin
      ? {
          username: "",
          password: "",
        }
      : {
          email: "",
          username: "",
          password: "",
        },
  });

  const onSubmit = async (data: LoginInput | RegisterInput) => {
    setIsLoading(true);
    try {
      const baseUrl =
        "https://4a8d32ff-a76e-410f-b581-d97f4f3e0313-00-2rv2ceqd1ssmk.spock.replit.dev";

      if (isLogin) {
        const formData = new URLSearchParams();
        formData.append("username", data.username);
        formData.append("password", data.password);

        const loginResponse = await fetch(`${baseUrl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        });

        if (!loginResponse.ok) {
          const error = await loginResponse
            .json()
            .catch(() => ({ detail: "Login failed" }));
          throw new Error(error.detail || error.message || "Login failed");
        }

        const loginResult = await loginResponse.json();
        const accessToken = loginResult.access_token;

        const meResponse = await fetch(`${baseUrl}/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!meResponse.ok) {
          throw new Error("Failed to fetch user information");
        }

        const userInfo = await meResponse.json();

        login(accessToken, userInfo);

        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
      } else {
        const registerResponse = await fetch(`${baseUrl}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!registerResponse.ok) {
          const error = await registerResponse
            .json()
            .catch(() => ({ message: "Registration failed" }));
          throw new Error(
            error.message || error.detail || "Registration failed",
          );
        }

        const registerResult = await registerResponse.json();

        if (registerResult.access_token) {
          const meResponse = await fetch(`${baseUrl}/auth/me`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${registerResult.access_token}`,
            },
          });

          if (meResponse.ok) {
            const userInfo = await meResponse.json();
            login(registerResult.access_token, userInfo);
          }
        }

        toast({
          title: "Account created!",
          description: "Your account has been created successfully.",
        });
      }

      setLocation("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-primary/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.05),transparent_50%)]" />

        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 text-primary-foreground">
          <div className="max-w-md space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-lg bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center">
                <Shield className="w-7 h-7" />
              </div>
              <h1 className="text-4xl font-semibold tracking-tight">
                AuthTest
              </h1>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-semibold leading-tight">
                Secure access to your digital world
              </h2>
              <p className="text-lg text-primary-foreground/80">
                Enterprise-grade authentication with seamless user experience.
                Protect your data while maintaining effortless access.
              </p>
            </div>

            <div className="space-y-4 pt-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    Bank-level Security
                  </h3>
                  <p className="text-primary-foreground/70 text-sm">
                    Your credentials are encrypted end-to-end with
                    industry-standard protocols
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Instant Access</h3>
                  <p className="text-primary-foreground/70 text-sm">
                    Get up and running in seconds with our streamlined
                    authentication flow
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex items-center gap-3 justify-center">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-semibold">SecureAuth</h1>
          </div>

          <Card className="border-card-border">
            <CardHeader className="space-y-2 pb-6">
              <CardTitle className="text-3xl font-semibold">
                {isLogin ? "Welcome back" : "Create account"}
              </CardTitle>
              <CardDescription className="text-base">
                {isLogin
                  ? "Enter your credentials to access your account"
                  : "Sign up to get started with SecureAuth"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          className="pl-10 h-11"
                          data-testid="input-email"
                          {...form.register("email")}
                        />
                      </div>
                      {form.formState.errors.email && (
                        <p
                          className="text-sm text-destructive"
                          data-testid="error-email"
                        >
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-sm font-medium">
                      Username
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="username"
                        type="text"
                        placeholder="johndoe"
                        className="pl-10 h-11"
                        data-testid="input-username"
                        {...form.register("username")}
                      />
                    </div>
                    {form.formState.errors.username && (
                      <p
                        className="text-sm text-destructive"
                        data-testid="error-username"
                      >
                        {form.formState.errors.username.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 h-11"
                        data-testid="input-password"
                        {...form.register("password")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover-elevate active-elevate-2 rounded p-1"
                        data-testid="button-toggle-password"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    {form.formState.errors.password && (
                      <p
                        className="text-sm text-destructive"
                        data-testid="error-password"
                      >
                        {form.formState.errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 font-semibold"
                  disabled={isLoading}
                  data-testid="button-submit"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      {isLogin ? "Signing in..." : "Creating account..."}
                    </span>
                  ) : (
                    <span>{isLogin ? "Sign in" : "Create account"}</span>
                  )}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      const newIsLogin = !isLogin;
                      setIsLogin(newIsLogin);
                      form.reset(
                        newIsLogin
                          ? {
                              username: "",
                              password: "",
                            }
                          : {
                              email: "",
                              username: "",
                              password: "",
                            },
                      );
                    }}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="button-toggle-mode"
                  >
                    {isLogin ? (
                      <>
                        Don't have an account?{" "}
                        <span className="text-primary font-medium">
                          Sign up
                        </span>
                      </>
                    ) : (
                      <>
                        Already have an account?{" "}
                        <span className="text-primary font-medium">
                          Sign in
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground mt-6">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
