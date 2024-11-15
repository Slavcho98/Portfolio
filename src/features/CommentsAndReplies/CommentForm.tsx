import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createEditComment } from "../../services/apiComments";
import Textarea from "@mui/joy/Textarea";
import { Box, IconButton, Typography } from "@mui/material";
import { RiAttachment2 } from "react-icons/ri";
import CustomButton from "../../ui/CustomButton";
import { useUser } from "../../authentication/useUser";

type Comment = {
  id?: string;
  description: string;
  userName: string;
  userLastname: string;
  userAvatar: string;
};

type CommentFormProps = {
  commentToEdit?: Comment;
  onSuccess?: () => void;
};

function CommentForm({ commentToEdit, onSuccess }: CommentFormProps) {
  const { id: editId, ...editValues } = commentToEdit || {};
  const isEditSession = Boolean(editId);

  const { user } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Comment>({
    defaultValues: isEditSession ? editValues : {},
  });

  const queryClient = useQueryClient();

  const { mutate: createComment, isPending: isCreating } = useMutation({
    mutationFn: (data: Comment) => createEditComment(data, data.id!),
    onSuccess: () => {
      toast.success("Коментарот е успешно додаден");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      reset();
    },
    onError: (err) => toast.error((err as Error).message),
  });

  const { mutate: editComment, isPending: isEditing } = useMutation({
    mutationFn: (data: Comment) => createEditComment(data, data.id!),
    onSuccess: () => {
      toast.success("Успешна промена");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      reset();
      if (onSuccess) onSuccess();
    },
    onError: (err) => toast.error((err as Error).message),
  });

  const isWorking = isCreating || isEditing;

  const onSubmit: SubmitHandler<Comment> = (data) => {
    const commentData = {
      ...data,
      userName: user?.user_metadata?.name || "",
      userLastname: user?.user_metadata?.surname || "",
      userAvatar: user?.user_metadata?.avatar || "",
      ...(isEditSession ? {} : { userId: user?.id }),
    };

    if (isEditSession) {
      editComment({ ...commentData, id: editId });
    } else {
      createComment(commentData);
    }
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          disabled={isWorking}
          minRows={10}
          {...register("description", {
            required: "Ве молиме внесете коментар",
          })}
          sx={{
            width: 1,
            border: "2px solid #E87B22",
            boxShadow: "0px 30px 80px 0px #2F415833",
            pb: "2rem",
            backgroundImage: "url('./public/img/bg_comments.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom right",
            backgroundSize: "contain",
          }}
        />

        {errors.description && (
          <Typography variant="body1" style={{ color: "red" }}>
            {errors.description.message}
          </Typography>
        )}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pr: 11,
            pl: 1,
            pb: 2,
          }}
        >
          <IconButton>
            <RiAttachment2 />
          </IconButton>

          <CustomButton
            disabled={isWorking}
            type="submit"
            style={{ transform: "translate(50%)" }}
          >
            {isEditSession ? "Промени" : " Коментирај"}
          </CustomButton>
        </Box>
      </form>
    </Box>
  );
}

export default CommentForm;
