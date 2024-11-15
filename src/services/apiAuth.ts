import supabase, { supabaseUrl } from "./supabase";

type LoginProps = {
  email: string;
  password: string;
};

type SignupProps = {
  name: string;
  surname: string;
  phone: string;
  email: string;
  password: string;
};




export async function signup({
  name,
  surname,
  phone,
  email,
  password,
}: SignupProps) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        surname,
        phone,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return { data };
}

export async function login({ email, password }: LoginProps) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return { data };
}

export async function getCurrentUser() {
  const { data: session, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) throw new Error(sessionError.message);
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data?.user || null;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({
  password,
  name,
  surname,
  avatar,
}: {
  password?: string;
  name?: string;
  surname?: string;
  avatar?: File;
}) {
  const updateData: {
    password?: string;
    data?: { name?: string; surname?: string; avatar?: string };
  } = {};

  if (password) {
    updateData.password = password;
  }

  if (name || surname) {
    updateData.data = {
      name,
      surname,
    };
  }

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // Upload avatar
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

 

  if (error2) throw new Error(error2.message);

  return updatedUser;
}
