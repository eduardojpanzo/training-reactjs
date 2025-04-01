"use client";
import { useState, FormEvent } from "react";

export default function Home() {
  const [subdomain, setSubdomain] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch("/api/add-subdomain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subdomain }),
    });

    if (response.ok) {
      alert("Subdomain added successfully!");
    } else {
      alert("Failed to add subdomain");
    }

    setSubdomain("");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Add Subdomain</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="subdomain">Subdomain:</label>
        <input
          type="text"
          id="subdomain"
          className="text-black p-1 mx-5"
          value={subdomain}
          onChange={(event) => setSubdomain(event.target.value)}
        />
        <button type="submit" className="text-black bg-white p-1">
          Add Subdomain
        </button>
      </form>
    </main>
  );
}
