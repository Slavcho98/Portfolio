//prettier-ignore
import {Box, IconButton, Menu, MenuItem,Stack, Typography} from "@mui/material";
import { HiDotsVertical } from "react-icons/hi";
import { MdDelete, MdEdit } from "react-icons/md";
import useCommentsContext from "../../hooks/useCommentsContext";
import { MouseEvent } from "react";
import CommentForm from "./CommentForm";
import RepliesSection from "./RepliesSection";
import { useUser } from "../../authentication/useUser";
import { CommentsProps } from "../../types/type";

type DynamicDataProps = {
  dynamicData: CommentsProps[]
}

function CommentMenu({ dynamicData }: DynamicDataProps) {
  const { menuAnchorEl, selectedCommentId, editingCommentId, dispatch } =
    useCommentsContext();
  const { isAuthenticated, fetchStatus, user } = useUser();

  const handleMenuClick = (
    event: MouseEvent<HTMLElement>,
    commentId: string
  ) => {
    dispatch({ type: "SET_MENU_ANCHOR_EL", payload: event.currentTarget });
    dispatch({ type: "SET_SELECTED_COMMENT_ID", payload: commentId });
  };

  const handleCloseMenu = () => {
    dispatch({ type: "SET_MENU_ANCHOR_EL", payload: null });
    dispatch({ type: "SET_SELECTED_COMMENT_ID", payload: null });
  };

  const handleEditClick = (commentId: string) => {
    dispatch({ type: "SET_EDITING_COMMENT_ID", payload: commentId });
    handleCloseMenu();
  };

  const handleDeleteClick = (commentId: string) => {
    dispatch({ type: "SET_COMMENT_TO_DELETE", payload: commentId });
    dispatch({ type: "TOGGLE_COMMENT_MODAL", payload: true });
    handleCloseMenu();
  };

  console.log(dynamicData);

  return (
    <>
      {dynamicData?.map((comment: CommentsProps) => (
        <Box key={comment.id} sx={{ mb: 8 }}>
          {editingCommentId === comment.id ? (
            <CommentForm
              commentToEdit={comment}
              onSuccess={() =>
                dispatch({ type: "SET_EDITING_COMMENT_ID", payload: null })
              }
            />
          ) : (
            <>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box
                  sx={{
                    backgroundImage: `url(${comment.userAvatar})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    borderRadius: "0 0 50vw 50vw",
                    width: "70px",
                    height: "70px",
                  }}
                />
                <Stack direction="row" spacing={1}>
                  <Typography variant="body1">{comment.userName}</Typography>
                  <Typography variant="body1">
                    {comment.userLastname}
                  </Typography>
                </Stack>
              </Box>
              <Box sx={{ display: "flex", pt: 3 }}>
                <Typography variant="body2" sx={{ flexGrow: 1 }}>
                  {comment.description}
                </Typography>
                {isAuthenticated && comment.userId === user?.id && (
                  <Box>
                    <IconButton onClick={(e) => handleMenuClick(e, comment.id)}>
                      <HiDotsVertical />
                    </IconButton>
                    <Menu
                      anchorEl={menuAnchorEl}
                      open={
                        Boolean(menuAnchorEl) &&
                        selectedCommentId === comment.id
                      }
                      onClose={handleCloseMenu}
                    >
                      <MenuItem onClick={() => handleEditClick(comment.id)}>
                        <MdEdit /> Измени
                      </MenuItem>
                      <MenuItem onClick={() => handleDeleteClick(comment.id)}>
                        <MdDelete /> Избриши
                      </MenuItem>
                    </Menu>
                  </Box>
                )}
              </Box>
              <Stack direction="row" spacing={1}>
                <RepliesSection
                  commentId={comment.id}
                  isAuthenticated={isAuthenticated}
                  fetchStatus={fetchStatus}
                  user={user}
                />
              </Stack>
            </>
          )}
        </Box>
      ))}
    </>
  );
}

export default CommentMenu;
