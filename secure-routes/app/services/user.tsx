export type User = {
  name: string;
  email: string;
  password: string;
};

export async function createUser(user: {
  name: string;
  email: string;
  password: string;
}) {
  await Promise.resolve(() => {
    setTimeout(() => {
      console.log(user);
    }, 1000);
  });

  const usersData: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  usersData.push(user);
  localStorage.setItem("users", JSON.stringify(usersData));
}
export async function signIn(email: string, password: string) {
  const user = await getUsers(email);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.password !== password) {
    throw new Error("Invalid credetials");
  }

  return {
    ok: true,
    data: {
      name: user.name,
      email: user.email,
    },
  };
}

export async function getUsers(email: string) {
  await Promise.resolve(() => {
    setTimeout(() => {}, 1000);
  });

  const usersData: User[] = JSON.parse(localStorage.getItem("users") || "[]");
  return usersData.find((user) => user.email === email);
}
