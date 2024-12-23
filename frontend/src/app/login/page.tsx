import { Suspense } from "react";
import { AuthSidePanel } from "@/components/auth/auth-side-panel";
import LoginForm from "./login-form";

export default function SignInPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <AuthSidePanel />
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}