import supabase from "./supabase";

interface RepliesProps {
  id?: number;
  content?: string;
  userId?: string;
  created_at?: string;
}

export async function createEditReply(newReply: RepliesProps, id?: number) {
  let query;

  if (!id) {
    query = supabase
      .from("commentReplies")
      .insert([newReply])
      .select()
      .single();
  } else {
    query = supabase
      .from("commentReplies")
      .update(newReply)
      .eq("id", id)
      .select()
      .single();
  }

  const { error } = await query;

  if (error) {
    console.error(error);
    throw new Error(
      id ? "Replies could not be updated" : "Replies could not be created"
    );
  }
}

export async function deleteCommentReply(id: string | number) {
  const { data, error } = await supabase
    .from("commentReplies")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Comment reply could not be deleted");
  }

  return data;
}
