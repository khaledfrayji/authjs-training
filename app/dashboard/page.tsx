// app/dashboard/page.tsx
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import ProfileForm from "./profile-form";

export default async function Dashboard() {
  const session = await auth();
  if (!session?.user) redirect("/sign-in");

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-4 py-10">
      <section className="w-full max-w-xl rounded-3xl bg-white p-6 text-slate-950 shadow-xl sm:p-8">
      <h1 className="break-words text-2xl font-bold sm:text-3xl">Welcome, {session.user.name ?? "developer"}</h1>
      <ProfileForm />
      <form className="mt-6 border-t border-slate-200 pt-4" action={async () => {
        "use server";
        await signOut({ redirectTo: "/sign-in" });
      }}>
        <button className="font-semibold text-violet-700 underline">Sign out</button>
      </form>
      </section>
    </main>
  );
}