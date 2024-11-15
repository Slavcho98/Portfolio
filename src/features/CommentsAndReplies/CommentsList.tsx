import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../services/apiComments";
import toast from "react-hot-toast";
import ConfirmationDialog from "../../features/CommentsAndReplies/ConfirmationDialog";
import useCommentsContext from "../../hooks/useCommentsContext";
import CommentMenu from "./CommentMenu";
import { useComments } from "../../hooks/useComments";

export default function CommentsList() {
  const queryClient = useQueryClient();
  const { commentsData } = useComments();
  const { commentToDelete, isCommentModalOpen, dispatch } =
    useCommentsContext();

  const { mutate: commentDelete } = useMutation({
    mutationFn: (id: string) => deleteComment(id),
    onSuccess: () => {
      toast.success("Коментарот беше успешно избришан");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const handleConfirmDelete = () => {
    if (commentToDelete !== null) {
      commentDelete(commentToDelete);
      dispatch({ type: "TOGGLE_COMMENT_MODAL", payload: false });
    }
  };

  return (
    <Box sx={{ my: "5rem", width: "85%", mx: "auto" }}>
      <Typography variant="h4">Коментари</Typography>
      <Grid container spacing={2} sx={{ pt: 5 }}>
        <Grid size={{ xs: 6, md: 8 }} position="relative" sx={{ pr: 2 }}>
          <CommentMenu dynamicData={commentsData || []} />
        </Grid>
      </Grid>
      <ConfirmationDialog
        open={isCommentModalOpen}
        onClose={() =>
          dispatch({ type: "TOGGLE_COMMENT_MODAL", payload: false })
        }
        onConfirm={handleConfirmDelete}
        title="Потврда за бришење коментар"
      >
        <Typography>
          Дали сте сигурни дека сакате да го избришете коментарот?
        </Typography>
      </ConfirmationDialog>
    </Box>
  );
}
