
import React from "react";
import AuthForm from "./Inicio/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <AuthForm></AuthForm>
      </div>
    </main>
  );
}