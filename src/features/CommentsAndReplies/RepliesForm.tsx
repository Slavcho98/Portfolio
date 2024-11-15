import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createEditReply } from "../../services/apiReplies";
import Textarea from "@mui/joy/Textarea";
import { Box, IconButton, Typography } from "@mui/material";
import { RiAttachment2 } from "react-icons/ri";
import CustomButton from "../../ui/CustomButton";
import { useUser } from "../../authentication/useUser";

type Reply = {
  id?: number;
  description: string;
  userName: string;
  userLastname: string;
  userAvatar: string;
  commentId?: string;
};

type ReplyFormProps = {
  replyToEdit?: Reply;
  commentId: string;
  onSuccess?: () => void;
};

function RepliesForm({ replyToEdit, commentId, onSuccess }: ReplyFormProps) {
  const { id: editId, ...editValues } = replyToEdit || {};
  const isEditSession = Boolean(editId);

  const { user } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Reply>({
    defaultValues: isEditSession ? editValues : {},
  });

  const queryClient = useQueryClient();

  const { mutate: createReply, isPending: isCreating } = useMutation({
    mutationFn: (data: Reply) => createEditReply(data, data.id!),
    onSuccess: () => {
      toast.success("Reply successfully added");
      queryClient.invalidateQueries({ queryKey: ["commentReplies"] });
      reset();
      if (onSuccess) onSuccess();
    },
    onError: (err) => toast.error((err as Error).message),
  });

  const { mutate: editReply, isPending: isEditing } = useMutation({
    mutationFn: (data: Reply) => createEditReply(data, data.id!),
    onSuccess: () => {
      toast.success("Одговорот беше успешно променет");
      queryClient.invalidateQueries({ queryKey: ["commentReplies"] });
      reset();
      if (onSuccess) onSuccess();
    },
    onError: (err) => toast.error((err as Error).message),
  });

  const isWorking = isCreating || isEditing;

  const onSubmit: SubmitHandler<Reply> = (data) => {
    const replyData = {
      ...data,
      userName: user?.user_metadata?.name || "",
      userLastname: user?.user_metadata?.surname || "",
      userAvatar: user?.user_metadata?.avatar || "",
      commentId: commentId,
      ...(isEditSession ? {} : { userId: user?.id }),
    };

    if (isEditSession) {
      editReply({ ...replyData, id: editId });
    } else {
      createReply(replyData);
    }
  };

  return (
    <Box sx={{ position: "relative", width: "100%", mb: 5 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Textarea
          disabled={isWorking}
          minRows={5}
          {...register("description", {
            required: "Please enter a reply",
          })}
          sx={{
            width: 1,
            border: "2px solid #E87B22",
            // boxShadow: "0px 30px 80px 0px #2F415833",
            pb: "5rem",
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
            {isEditSession ? "Измени" : "Одговори"}
          </CustomButton>
        </Box>
      </form>
    </Box>
  );
}

export default RepliesForm;
