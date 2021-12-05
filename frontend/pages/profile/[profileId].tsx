import Layout from "../../layouts/Layout";
import { NextPage } from "next";
import { ProfileForm, RefHandle } from "../../components/Profile/ProfileForm";
import "../../common/i18n/i18next";
import { useRef } from "react";
import Stack from "@mui/material/Stack";
import { Button } from "@mui/material";
import useI18n from "../../common/i18n/useI18n";

const UserProfile: NextPage = () => {
  const profileFormRef = useRef<RefHandle>(null);

  const t = useI18n();

  const handleSubmit = () => {
    debugger;
    window.console.log("sucess");
  };

  const handleError = () => {
    debugger;
    window.console.log("error");
  };

  return (
    <Layout>
      <ProfileForm ref={profileFormRef} />
      <Stack spacing={2} direction={"row"} justifyContent="center">
        <Button variant="contained" onClick={profileFormRef.current?.handleSubmit(handleSubmit, handleError)}>
          {t("search")}
        </Button>
        {/* <Button variant="outlined" onClick={() => reset()}>
          {t("cancel")}
        </Button> */}
      </Stack>
    </Layout>
  );
};

export default UserProfile;
