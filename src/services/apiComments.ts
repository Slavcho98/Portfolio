import supabase from "./supabase";

interface CommentProps {
  id?: string;
}

interface CommentProps {
  id?: string;
  content?: string;
  userId?: string;
  created_at?: string;
 
}

export async function createEditComment(newComment: CommentProps, id?: string) {
  let query;

  if (!id) {
    query = supabase.from("comments").insert([newComment]).select().single();
  } else {
    query = supabase
      .from("comments")
      .update(newComment)
      .eq("id", id)
      .select()
      .single();
  }

  const { error } = await query;

  if (error) {
    console.error(error);
    throw new Error(
      id ? "Коментарот не може да се промени" : "Настана грешка при креирање на коментарот"
    );
  }
}


export async function deleteComment(id: string | number) {
  const { data, error } = await supabase.from("comments").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Коментарот не може да се избрише");
  }

  return data;
}





