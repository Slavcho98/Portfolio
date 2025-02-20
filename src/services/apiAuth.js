import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  console.log("Supabase response:", { data, error });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let updateData = {};
  if (password) updateData.password = password;
  if (fullName) updateData.data = { fullName };

  // ✅ Step 1: Update user information
  const { error: updateError } = await supabase.auth.updateUser(updateData);
  if (updateError) throw new Error(updateError.message);

  if (!avatar) {
    // ✅ Step 2: Fetch the latest user object to return
    const updatedUser = await getCurrentUser();
    return updatedUser;
  }

  // ✅ Step 3: Upload the avatar
  const user = await getCurrentUser(); // Ensure user is fetched after updating
  if (!user) throw new Error("User not found after update");

  const fileName = `avatar-${user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // ✅ Step 4: Update avatar URL in Supabase
  const { error: avatarUpdateError } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (avatarUpdateError) throw new Error(avatarUpdateError.message);

  // ✅ Step 5: Return the final updated user
  return getCurrentUser();
}
