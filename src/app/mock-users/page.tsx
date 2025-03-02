type MockUser = {
  id: string;
  name: string;
};

export default async function MockUsers() {
  const res = await fetch("https://67c41b22c4649b9551b2a824.mockapi.io/users");
  const users = await res.json();

  return (
    <div>
      <h1>Users</h1>
      <ul className="space-y-4 p-4">
        {users.map((user: MockUser) => (
          <li
            key={user.id}
            className="p-4 bg-white shadow-md rounded-md text-gray-700"
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
