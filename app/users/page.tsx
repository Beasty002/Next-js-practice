import Link from "next/link";

export default async function UsersPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  return (
    <div>
      <h1>User list</h1>
      <ul>
        {users.map((user: { id: number; name: string }) => (
          <li key={user.id}>
            <h3 className="hover:text-blue-400">
              <Link href={`/users/${user.id}`}>{user.name}</Link>
            </h3>
          </li>
        ))}
      </ul>
    </div>
  );
}
