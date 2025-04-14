"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <section className="contianer mx-auto px-4 py-20">
      <h2>Something went wrong.</h2>
      <p>{error.message}</p>
    </section>
  );
}
