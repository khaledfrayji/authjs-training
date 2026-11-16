import { redirect } from "next/navigation";

async function checkLogin(data: FormData) {
  "use server";

  const email = data.get("email");
  const password = data.get("password");

  if (typeof email !== "string" || !email.includes("@") ||
      typeof password !== "string" || password.length < 8) {
    redirect("/demo-login?result=invalid");
  }

  // Fake classroom credentials. Never use these in production.
  if (email.trim() !== "demo@example.com" || password !== "demo-pass-123") {
    redirect("/demo-login?result=wrong");
  }

  redirect("/demo-login?result=matched");
}

const messages = {
  invalid: "Enter an email and at least 8 password characters.",
  wrong: "The email or password is incorrect.",
  matched: "Demo credentials matched. No session was created.",
};

export default async function DemoLogin({
  searchParams,
}: {
  searchParams: Promise<{ result?: string | string[] }>;
}) {
  const { result } = await searchParams;
  const message = result === "invalid" || result === "wrong" ||
    result === "matched" ? messages[result] : "";

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-4 py-10">
      <section className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl sm:p-8">
        <p className="text-sm font-semibold text-violet-700">TECHTALKS · DEMO</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">Sign in</h1>
        <form action={checkLogin} className="mt-6 space-y-4 text-slate-900">
          <label className="block text-sm font-medium">
            Email
            <input name="email" type="email" required autoComplete="username"
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" />
          </label>
          <label className="block text-sm font-medium">
            Password
            <input name="password" type="password" required minLength={8}
              autoComplete="current-password"
              className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" />
          </label>
          <button className="w-full rounded-xl bg-violet-700 px-4 py-3 font-semibold text-white hover:bg-violet-800">
            Check login
          </button>
        </form>
        <p role="status" className="mt-4 text-sm text-slate-700">{message}</p>
      </section>
    </main>
  );
}