import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { NextPage } from "next";
import { useMemo, useRef } from "react";
import { useAsync } from "react-async-hook";
import { DefaultValues } from "react-hook-form";
import { AddOrUpdateUserCommand } from "../../apis/profileApi/Models/AddOrUpdateUserCommand";
import { UserResponse } from "../../apis/profileApi/Models/UserResponse";
import authService from "../../common/auth/AuthorizeService";
import { useProfileApi } from "../../common/customHooks/api/useProfileApi";
import "../../common/i18n/i18next";
import useI18n from "../../common/i18n/useI18n";
import { ProfileForm, RefHandle } from "../../components/Profile/ProfileForm";
import Layout, { smallerPageContentWrapper } from "../../layouts/Layout";

const UserProfile: NextPage = () => {
  const profileFormRef = useRef<RefHandle>(null);
  const t = useI18n();
  const profileApi = useProfileApi();
  const currentUserId = useRef<string>("");

  var { result } = useAsync(async () => {
    const currentUser = (await authService.getUser()) as any;
    currentUserId.current = currentUser.sub;
    var user = await profileApi.get(currentUser.sub);
    return user;
  }, []);

  var defaultValues = useMemo<DefaultValues<UserResponse>>(() => {
    return { ...result };
  }, [result]);

  const handleSubmit = (user: AddOrUpdateUserCommand) => {
    user.id = currentUserId.current;
    profileApi.addOrUpdate(currentUserId.current, user);
    debugger;
    window.console.log("sucess");
  };

  const handleError = () => {
    debugger;
    window.console.log("error");
  };

  return (
    <Layout mainContentStyle={smallerPageContentWrapper}>
      <ProfileForm ref={profileFormRef} defaultValues={defaultValues} />
      <Stack spacing={2} direction={"row"} justifyContent="end" sx={{ mt: 1 }}>
        <Button variant="contained" onClick={profileFormRef.current?.handleSubmit(handleSubmit, handleError)}>
          {t("save")}
        </Button>
      </Stack>
    </Layout>
  );
};

export default UserProfile;
