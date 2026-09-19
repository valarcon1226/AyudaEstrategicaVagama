import { COMPANY } from "@shared/site-content";
import { LoginForm } from "./login-form";

export default function Page() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm">
        <div className="text-center mb-space-lg">
          <span className="font-headline-lg text-headline-lg text-on-surface font-bold">
            {COMPANY.brandName}
          </span>
          <p className="font-body-sm text-body-sm text-secondary mt-1">Portal privado — solo equipo interno</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
