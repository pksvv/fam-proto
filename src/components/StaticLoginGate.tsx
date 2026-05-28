"use client";

import { FormEvent, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

const DEMO_USERNAME = "fam-copilot";
const DEMO_PASSWORD = "welcome@12345";
const LOGIN_STORAGE_KEY = "audit-management-demo-login";

export function StaticLoginGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setIsAuthenticated(window.localStorage.getItem(LOGIN_STORAGE_KEY) === "true");
    setIsReady(true);
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
      window.localStorage.setItem(LOGIN_STORAGE_KEY, "true");
      setIsAuthenticated(true);
      setError("");
      router.push("/");
      return;
    }

    setError("Incorrect username or password.");
  }

  if (!isReady) {
    return <div className="min-h-screen bg-background" />;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <main className="workbench-canvas flex min-h-screen items-center justify-center px-5 py-10">
      <section className="workbench-panel w-full max-w-[440px] overflow-hidden">
        <div className="workbench-blue-header">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-100">AI.Tax.Copilot</p>
          <h1 className="mt-2 text-2xl font-semibold">Prototype Login</h1>
        </div>
        <form className="space-y-4 p-6" onSubmit={handleSubmit}>
          <p className="rounded border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            Static prototype login for demo purposes only.
          </p>
          <label className="workbench-field">
            <span>Username</span>
            <input
              autoComplete="username"
              onChange={(event) => setUsername(event.target.value)}
              type="text"
              value={username}
            />
          </label>
          <label className="workbench-field">
            <span>Password</span>
            <input
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              value={password}
            />
          </label>
          {error ? <p className="text-sm font-semibold text-red-700">{error}</p> : null}
          <button className="workbench-primary w-full" type="submit">
            Sign in
          </button>
        </form>
      </section>
    </main>
  );
}
