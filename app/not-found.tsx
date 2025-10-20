import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 px-4 text-white">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-700">404</h1>
        <p className="mt-4 text-2xl font-semibold">Page Not Found</p>
        <p className="mt-2 text-gray-400">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-block rounded bg-blue-600 px-6 py-3 text-white shadow-lg transition hover:bg-blue-700"
          >
            Go back home
          </Link>
        </div>
      </div>
    </div>
  );
}
