import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-5">
        <p> "Welcome to secsystem"</p>
        <Link href="/login" className="bg-white px-5 py-5 flex justify-center items-center"> click here</Link>
      </div>
    </main>
  );
}
