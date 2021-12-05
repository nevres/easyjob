import { DefaultValues, useForm, UseFormHandleSubmit } from "react-hook-form";
import { useYupValidationResolver } from "../../common/utils/yupValidationHelper";
import * as yup from "yup";
import Stack from "@mui/material/Stack";
import TextFieldElement from "../../common/react-hook-mui/TextFieldElement";
import useI18n from "../../common/i18n/useI18n";
import { PhoneNumberRegex } from "../../common/utils/regex";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { User } from "../../apis/profileApi/Models/User";
import BusinessTypeSelection from "../../common/components/profile/BusinessTypeSelection";

export interface ProfileFormProps {
  defaultValues?: DefaultValues<User>;
}

export type RefHandle = {
  handleSubmit: UseFormHandleSubmit<User>;
};

export const ProfileForm = forwardRef<RefHandle, ProfileFormProps>(({ defaultValues }: ProfileFormProps, ref) => {
  const ProfileValidationSchema = yup.object().shape({
    firstName: yup.string().required()
    // lastName: yup.string().required(),
    // phoneNumber: yup.string().matches(PhoneNumberRegex)
  });

  const { handleSubmit, control, watch, reset } = useForm<User>({
    context: { validationSchemaId: 0 },
    resolver: useYupValidationResolver([ProfileValidationSchema]),
    defaultValues: defaultValues
  });

  const t = useI18n();

  useImperativeHandle(ref, () => ({
    handleSubmit: handleSubmit
  }));

  return (
    <Stack spacing={2}>
      <TextFieldElement control={control} name={"email"} id="outlined-search" label={t("email")} fullWidth disabled />
      <TextFieldElement control={control} name={"firstName"} id="outlined-search" label={t("firstName")} fullWidth />
      <TextFieldElement control={control} name={"lastName"} id="outlined-search" label={t("lastName")} fullWidth />
      <TextFieldElement
        control={control}
        name={"description"}
        id="outlined"
        label={t("description")}
        multiline
        rows={3}
        fullWidth
      />
      <TextFieldElement control={control} name={"phoneNumber"} id="outlined" label={t("phoneNumber")} fullWidth />
      <BusinessTypeSelection />
    </Stack>
  );
});
