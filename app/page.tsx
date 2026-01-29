export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold text-white">Welcome Back</h1>
          <p className="text-xl text-slate-300">Your Next.js application is running successfully</p>
        </div>
        <div className="pt-8">
          <p className="text-slate-400">Ready to start building amazing things?</p>
        </div>
      </div>
    </main>
  );
}
