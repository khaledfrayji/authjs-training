// app/dashboard/profile-form.tsx
"use client";

import { useState, type FormEvent } from "react";
import { profileSchema } from "@/lib/validation";
import { previewName } from "./actions";

export default function ProfileForm() {
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = { name: new FormData(event.currentTarget).get("name") };
    const result = profileSchema.safeParse(input);

    if (!result.success) {
      setMessage(result.error.issues[0].message);
      return;
    }

    setMessage(await previewName(result.data));
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-3">
      <label className="block text-sm font-medium">
        Display name
        <input name="name"
          className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" />
      </label>
      <button className="w-full rounded-xl bg-violet-700 px-4 py-2 font-semibold text-white sm:w-auto">
        Preview name
      </button>
      <p role="status" className="text-sm text-slate-700">{message}</p>
    </form>
  );
}