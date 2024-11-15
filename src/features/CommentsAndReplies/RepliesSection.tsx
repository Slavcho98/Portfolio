import { MouseEvent, useState } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  Collapse,
} from "@mui/material";
import { FaRegComment } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import { useReplies } from "../../hooks/useReplies";
import RepliesForm from "./RepliesForm";
import ConfirmationDialog from "../../features/CommentsAndReplies/ConfirmationDialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCommentReply } from "../../services/apiReplies";
import toast from "react-hot-toast";
import { User } from "../../types/type";
import { BiLike } from "react-icons/bi";

interface RepliesSectionProps {
  commentId: string;
  isAuthenticated: boolean;
  fetchStatus: string;
  user?: User | null;
}

const RepliesSection: React.FC<RepliesSectionProps> = ({
  commentId,
  isAuthenticated,
  fetchStatus,
  user,
}) => {
  const { repliesData } = useReplies();
  const queryClient = useQueryClient();
  const [openReplyId, setOpenReplyId] = useState<string | null>(null);
  const [editingReplyId, setEditingReplyId] = useState<string | null>(null);
  const [replyToDelete, setReplyToDelete] = useState<string | null>(null);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [replyMenuAnchorEl, setReplyMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const [selectedReplyId, setSelectedReplyId] = useState<string | null>(null);

  const { mutate: replyDelete } = useMutation({
    mutationFn: (id: string) => deleteCommentReply(id),
    onSuccess: () => {
      toast.success("Одговорот беше успешно избришан");
      queryClient.invalidateQueries({ queryKey: ["commentReplies"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const handleToggleReplies = () => {
    setOpenReplyId((prevId) => (prevId === commentId ? null : commentId));
  };

  const handleSuccessEdit = () => {
    setEditingReplyId(null);
    handleCloseReplyMenu();
  };

  const handleDeleteReplyClick = (replyId: string) => {
    setReplyToDelete(replyId);
    setIsReplyModalOpen(true);
    handleCloseReplyMenu();
  };

  const handleConfirmReplyDelete = () => {
    if (replyToDelete !== null) {
      replyDelete(replyToDelete);
      setIsReplyModalOpen(false);
    }
  };

  const handleReplyMenuClick = (
    event: MouseEvent<HTMLElement>,
    replyId: string
  ) => {
    setReplyMenuAnchorEl(event.currentTarget);
    setSelectedReplyId(replyId);
  };

  const handleCloseReplyMenu = () => {
    setReplyMenuAnchorEl(null);
    setSelectedReplyId(null);
  };

  return (
    <>
      <Box width={1}>
        <Stack direction="row" spacing={1}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton>
              <BiLike />
            </IconButton>
            <Typography
              variant="button"
              sx={{ color: "#21383E", fontWeight: "400" }}
            >
              335
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={handleToggleReplies}>
              <FaRegComment />
            </IconButton>
            <Typography variant="button">
              {
                repliesData?.filter((reply) => reply.commentId === commentId)
                  .length
              }
            </Typography>
          </Box>
        </Stack>
        <Collapse in={openReplyId === commentId} timeout="auto" unmountOnExit>
          <Box
            sx={{
              mt: 2,
              borderTop: "1px solid #ddd",
              pt: 2,
              px: 5,
              maxHeight: 500,
              overflowY: "auto",
            }}
          >
            {isAuthenticated && fetchStatus && (
              <RepliesForm
                commentId={commentId}
                onSuccess={handleSuccessEdit}
              />
            )}

            {repliesData
              ?.filter((reply) => reply.commentId === commentId)
              .map((reply) => (
                <Box key={reply.id} sx={{ mb: 2 }}>
                  {editingReplyId === reply.id ? (
                    <RepliesForm
                      commentId={commentId}
                      replyToEdit={reply}
                      onSuccess={handleSuccessEdit}
                    />
                  ) : (
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 2,
                        }}
                      >
                        <Box
                          sx={{
                            backgroundImage: `url(${reply.userAvatar})`,
                            backgroundPosition: "center",
                            borderRadius: "0 0 50vw 50vw",
                            backgroundSize: "cover",
                            width: "70px",
                            height: "70px",
                          }}
                        />
                        <Box sx={{ flex: 1 }}>
                          <Stack direction="row" spacing={1}>
                            <Typography variant="body1">
                              {reply.userName}
                            </Typography>
                            <Typography variant="body1">
                              {reply.userLastname}
                            </Typography>
                          </Stack>
                        </Box>
                        {isAuthenticated &&
                          fetchStatus &&
                          reply.userId === user?.id && (
                            <Box>
                              <IconButton
                                onClick={(e) =>
                                  handleReplyMenuClick(e, reply.id)
                                }
                              >
                                <HiDotsVertical />
                              </IconButton>
                              <Menu
                                anchorEl={replyMenuAnchorEl}
                                open={
                                  Boolean(replyMenuAnchorEl) &&
                                  selectedReplyId === reply.id
                                }
                                onClose={handleCloseReplyMenu}
                              >
                                <MenuItem
                                  onClick={() => setEditingReplyId(reply.id)}
                                >
                                  <MdEdit /> Измени
                                </MenuItem>
                                <MenuItem
                                  onClick={() =>
                                    handleDeleteReplyClick(reply.id)
                                  }
                                >
                                  <MdDelete /> Избриши
                                </MenuItem>
                              </Menu>
                            </Box>
                          )}
                      </Box>
                      <Box sx={{ display: "flex" }}>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                          {reply.description}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              ))}
          </Box>
        </Collapse>
      </Box>

      <ConfirmationDialog
        open={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
        onConfirm={handleConfirmReplyDelete}
        title="Потврда за бришење одговор"
      >
        <Typography>
          Дали сте сигурни дека сакате да го избришете одговорот?
        </Typography>
      </ConfirmationDialog>
    </>
  );
};

export default RepliesSection;
