type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
};

export default async function UsersServer() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  return (
    <div>
      <h1>Users</h1>
      <ul className="space-y-4 p-4">
        {users.map((user: User) => (
          <li
            key={user.id}
            className="p-4 bg-white shadow-md rounded-md text-gray-700"
          >
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
