import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { NextPage } from "next";
import React, { useMemo, useRef } from "react";
import { useAsync } from "react-async-hook";
import { DefaultValues } from "react-hook-form";
import { AddOrUpdateUserCommand } from "../../apis/profileApi/Models/AddOrUpdateUserCommand";
import { UserResponse } from "../../apis/profileApi/Models/UserResponse";
import authService from "../../common/auth/AuthorizeService";
import { useProfileApi } from "../../common/customHooks/api/useProfileApi";
import "../../common/i18n/i18next";
import useI18n from "../../common/i18n/useI18n";
import useLoader from "../../common/useLoader/useLoader";
import useSnackbar from "../../common/useSnackbar/useSnackbar";
import { ProfileForm, RefHandle } from "../../components/Profile/ProfileForm";
import Layout, { smallerPageContentWrapper } from "../../layouts/Layout";

const MyProfile: NextPage = () => {
  return (
    <Layout mainContentStyle={smallerPageContentWrapper}>
      <CurrentUserProfile />
    </Layout>
  );
};

const CurrentUserProfile = () => {
  const profileFormRef = useRef<RefHandle>(null);
  const t = useI18n();
  const profileApi = useProfileApi();
  const currentUserId = useRef<string>("");
  const notify = useSnackbar();
  const { addLoader, removeLoader } = useLoader();

  var { result } = useAsync(async () => {
    const currentUser = (await authService.getUser()) as any;
    currentUserId.current = currentUser.sub;
    var user = await profileApi.get(currentUser.sub);
    return user;
  }, []);

  var defaultValues = useMemo<DefaultValues<UserResponse>>(() => {
    return { ...result };
  }, [result]);

  const handleSubmit = async (user: AddOrUpdateUserCommand) => {
    try {
      addLoader();
      user.id = currentUserId.current;
      await profileApi.addOrUpdate(currentUserId.current, user);
      notify(t("yourProfileSuccessfullyUpdated"), "success");
    } finally {
      removeLoader();
    }
  };

  const handleError = () => {
    debugger;
    window.console.log("error");
  };

  return (
    <React.Fragment>
      <ProfileForm ref={profileFormRef} defaultValues={defaultValues} />
      <Stack spacing={2} direction={"row"} justifyContent="end" sx={{ mt: 1 }}>
        <Button variant="contained" onClick={profileFormRef.current?.handleSubmit(handleSubmit, handleError)}>
          {t("save")}
        </Button>
      </Stack>
    </React.Fragment>
  );
};

export default MyProfile;
