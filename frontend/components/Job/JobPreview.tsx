import { LocationOnOutlined } from "@mui/icons-material";
import { Chip, Stack, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import React from "react";
import { ResolvedJobResponse } from "../../api/Models/ResolvedJobResponse";
import useI18n from "../../common/i18n/useI18n";
import {
  getJobDurationTypeTranslation,
  getUserFriendlyLocation,
  getUserFriendlyPrice
} from "../../domain/job/jobHelper";

export type JobPreviewProps = {
  job: ResolvedJobResponse;
};

const BorderLessIFrame = styled("iframe")({
  border: 0,
  width: "100%",
  height: "100%"
});

export default function JobPreview({ job }: JobPreviewProps) {
  const t = useI18n();
  return (
    <Paper sx={{ p: 1 }}>
      <Typography variant="h5">{job.name}</Typography>
      <Stack direction="row" spacing={2}>
        <Chip label={job.categoryName} />
        {job.jobDurationType && <Chip label={getJobDurationTypeTranslation(job.jobDurationType, t)} />}
      </Stack>
      {job.location && (
        <Stack direction="row" alignItems="center">
          <LocationOnOutlined />
          <Typography variant="body2" color="text.secondary">
            {getUserFriendlyLocation(job.location)}
          </Typography>
        </Stack>
      )}
      {job.price && (
        <Typography variant="body2" color="text.secondary">
          {getUserFriendlyPrice(job.price, t)}
        </Typography>
      )}
      <BorderLessIFrame srcDoc={job.description}></BorderLessIFrame>
    </Paper>
  );
}
