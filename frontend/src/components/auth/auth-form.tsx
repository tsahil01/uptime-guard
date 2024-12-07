"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { backendUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "signin" | "signup";
}

async function signup({ email, password }: { email: string; password: string }) {
  try {
    const response = await axios.post(`${backendUrl}/api/auth/signup`, { email, password });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error);
    alert("Error during signup. Please try again.");
  }
}

async function signin({ email, password }: { email: string; password: string }) {
  try {
    const response = await axios.post(`${backendUrl}/api/auth/signin`, { email, password });
    console.log(response.data);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      // Redirect to dashboard
      window.location.href = "/dashboard";
    }
    return response.data;
  } catch (error) {
    console.error("Error during signin:", error);
    alert("Error during signin. Please try again.");
  }
}

export function AuthForm({ type, className, ...props }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    if (type === "signup") {
      console.log("signup");
      const response = await signup({ email, password });
      // @ts-ignore
      alert(response.msg);
      setIsLoading(false);
    }

    if (type === "signin") {
      console.log("signin");
      const response = await signin({ email, password });
      // @ts-ignore
      alert(response.msg);
      setIsLoading(false);
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              disabled={isLoading}
              onChange={
                (event) => setEmail(event.target.value)
              }
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              disabled={isLoading}
              onChange={
                (event) => setPassword(event.target.value)
              }
            />
          </div>
          <Button className="mt-2" disabled={isLoading}>
            {isLoading && (
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background" />
            )}
            {type === "signin" ? "Sign In" : "Create Account"}
          </Button>
        </div>
      </form>
    </div>
  );
}