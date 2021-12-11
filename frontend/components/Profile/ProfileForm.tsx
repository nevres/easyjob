import Stack from "@mui/material/Stack";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { DefaultValues, useForm, UseFormHandleSubmit } from "react-hook-form";
import * as yup from "yup";
import { AddOrUpdateUserCommand } from "../../apis/profileApi/Models/AddOrUpdateUserCommand";
import BusinessTypeSelection from "../../common/components/profile/BusinessTypeRadioButtons";
import useI18n from "../../common/i18n/useI18n";
import TextFieldElement from "../../common/react-hook-mui/TextFieldElement";
import { useYupValidationResolver } from "../../common/utils/yupValidationHelper";

export type ProfileForm = Omit<AddOrUpdateUserCommand, "id"> & {
  email: string;
};

export interface ProfileFormProps {
  defaultValues?: DefaultValues<ProfileForm>;
}

export type RefHandle = {
  handleSubmit: UseFormHandleSubmit<AddOrUpdateUserCommand>;
};

export const ProfileForm = forwardRef<RefHandle, ProfileFormProps>(({ defaultValues }: ProfileFormProps, ref) => {
  const t = useI18n();

  const ProfileValidationSchema = yup.object().shape({
    firstName: yup.string().required(t("firstNameIsRequired")),
    lastName: yup.string().required(t("lastNameIsRequired"))
    // lastName: yup.string().required(),
    // phoneNumber: yup.string().matches(PhoneNumberRegex)
  });

  const { handleSubmit, control, watch, reset } = useForm<ProfileForm>({
    context: { validationSchemaId: 0 },
    resolver: useYupValidationResolver([ProfileValidationSchema]),
    defaultValues: defaultValues
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  useImperativeHandle(ref, () => ({
    handleSubmit: handleSubmit
  }));

  return (
    <Stack spacing={2}>
      <TextFieldElement control={control} name={"email"} id="outlined-search" label={t("email")} fullWidth disabled />
      <TextFieldElement control={control} name={"firstName"} id="outlined-search" label={t("firstName")} fullWidth />
      <TextFieldElement control={control} name={"lastName"} id="outlined-search" label={t("lastName")} fullWidth />
      <TextFieldElement control={control} name={"phoneNumber"} id="outlined" label={t("phoneNumber")} fullWidth />
      <BusinessTypeSelection control={control} name="businessType" />
      <TextFieldElement
        control={control}
        name={"description"}
        id="outlined"
        label={t("description")}
        multiline
        rows={4}
        fullWidth
      />
    </Stack>
  );
});
