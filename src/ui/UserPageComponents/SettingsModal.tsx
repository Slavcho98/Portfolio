import React, { useReducer } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useUser } from "../../authentication/useUser";
import { useUpdateUser } from "../../authentication/useUpdateUser";
import { useForm } from "react-hook-form";
import CustomButton from "../../ui/CustomButton";
import supabase from "../../services/supabase";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import ProfessionSelect from "./ProfessionSelect";
import NotificationCheckboxes from "./NotificationCheckboxes";
import { initialState, settingsReducer } from "./settingsReducer";
import Spinner from "../Spinner";
import Grid from "@mui/material/Grid2";
import CustomModal from "../Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  borderRadius: "20px",
  bgcolor: "background.paper",
  boxShadow: 24,
  px: 4,
  pt: 7,
  pb: 12,
  border: "none",
  outline: "none",
};

type Props = {
  open: boolean;
  onClose: () => void;
};

const SettingsModal: React.FC<Props> = ({ open, onClose }) => {
  const { user } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();
  const { register } = useForm();

  const [state, dispatch] = useReducer(settingsReducer, {
    ...initialState,
    userName: user?.user_metadata?.name || "",
    lastName: user?.user_metadata?.surname || "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.userName || !state.lastName) return;

    await updateUser(
      { name: state.userName, surname: state.lastName },
      {
        onSuccess: async () => {
          if (state.newPassword) {
            await updatePassword(state.newPassword);
          }
          onClose();
        },
      }
    );
  };

  const updatePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      console.error("Error updating password:", error.message);
    }
  };

  return (
    <CustomModal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" fontWeight={600}>
          Поставки
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} pt={4} sx={{ pb: 5 }}>
            <Grid size={6}>
              <Grid spacing={2}>
                <Grid pb={4}>
                  <InputField
                    label="Име"
                    value={state.userName}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_USER_NAME",
                        payload: e.target.value,
                      })
                    }
                    disabled={isUpdating}
                  />
                </Grid>
                <Grid pb={4}>
                  <InputField
                    label="E-mail"
                    value={user?.user_metadata?.email || ""}
                    onChange={() => {}}
                    disabled={true}
                  />
                </Grid>
                <Grid pb={4}>
                  <PasswordField
                    label="Лозинка"
                    value={state.newPassword}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_NEW_PASSWORD",
                        payload: e.target.value,
                      })
                    }
                    showPassword={state.showPassword}
                    onTogglePassword={() =>
                      dispatch({ type: "TOGGLE_PASSWORD_VISIBILITY" })
                    }
                  />
                </Grid>
                <Grid>
                  <ProfessionSelect
                    register={register}
                    value={state.profession}
                    onChange={(event) =>
                      dispatch({
                        type: "SET_PROFESSION",
                        payload: event.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid size={6}>
              <Grid pb={4}>
                <InputField
                  label="Презиме"
                  value={state.lastName}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_LAST_NAME",
                      payload: e.target.value,
                    })
                  }
                  disabled={isUpdating}
                />
              </Grid>

              <Grid pb={4}>
                <Typography variant="body1" pb={1}>
                  Добиј нотификации на
                </Typography>
                <NotificationCheckboxes
                  labels={["Платформа", "Е-маил", "Социјални медиуми"]}
                />
              </Grid>

              <Grid>
                <Typography variant="body1" pb={1}>
                  Добивај нотификации за
                </Typography>
                <NotificationCheckboxes
                  labels={[
                    "Нови содржини",
                    "Нови настани",
                    "Приближување на датум за настан",
                  ]}
                />
              </Grid>
              <Grid>
                <CustomButton
                  style={{
                    position: "absolute",
                    left: "50%",
                    bottom: "35px",
                    transform: "translate(-50%)",
                  }}
                  type="submit"
                  disabled={isUpdating}
                >
                  {isUpdating ? <Spinner /> : "Зачувај"}
                </CustomButton>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </CustomModal>
  );
};

export default SettingsModal;
