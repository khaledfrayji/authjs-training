// app/sign-in/page.tsx
import { signIn } from "@/auth";

export default function SignInPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-4 py-10">
      <section className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl sm:p-8">
        <p className="text-sm font-semibold text-violet-700">TECHTALKS</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">Welcome back</h1>
        <p className="mt-2 text-slate-600">Sign in to open your dashboard.</p>
        <form className="mt-6" action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/dashboard" });
        }}>
          <button className="w-full rounded-xl bg-violet-700 px-4 py-3 font-semibold text-white hover:bg-violet-800">
            Continue with GitHub
          </button>
        </form>
      </section>
    </main>
  );
}