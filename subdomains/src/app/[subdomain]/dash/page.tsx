export default function Dash() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="flex flex-col gap-4">
        <p className="text-lg">Welcome to your simple dashboard</p>
        <p className="text-lg">Your tenant is: {""}</p>
      </div>
    </main>
  );
}
