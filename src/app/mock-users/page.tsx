import { revalidatePath } from "next/cache";

type MockUser = {
  id: string;
  name: string;
};

export default async function MockUsers() {
  const res = await fetch("https://67c41b22c4649b9551b2a824.mockapi.io/users");
  const users = await res.json();

  async function addUser(formData: FormData) {
    "use server";
    const name = formData.get("name");
    const res = await fetch(
      "https://67c41b22c4649b9551b2a824.mockapi.io/users",
      {
        method: "POST",
        body: JSON.stringify({ name }),
        headers: { "Content-Type": "application/json" },
      }
    );

      const newUser = await res.json();
      revalidatePath("/mock-users");
      console.log(newUser);
  }

  return (
    <div>
      <h1>Users</h1>
      <form className="mb-10" action={addUser}>
        <input type="text" name="name" required className="border p-2 mr-2" />
        <button type="submit" className="bg-emerald-800 px-4 py-2 rounded-sm">
          Add User
        </button>
      </form>
      <div className="grid grid-cols-4 gap-4 py-10">
        {users.map((user: MockUser) => (
          <div
            key={user.id}
            className="p-4 bg-white shadow-md rounded-lg text-gray-700"
          >
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
}
