import { Person } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { ResolvedJobResponse } from "../../apis/jobProcessingApi/Models/ResolvedJobResponse";
import useI18n from "../../common/i18n/useI18n";
import { getUserFriendlyDate } from "../../common/utils/dateTimeHelper";
import { isNullOrUndefined } from "../../common/utils/jsHelper";
import {
  getJobDurationTypeTranslation,
  getUserFriendlyLocation,
  getUserFriendlyPrice,
  getUserInitials
} from "../../domain/job/jobHelper";

interface JobCardProps {
  job: ResolvedJobResponse;
  customStyle?: SxProps<Theme>;
  handleCardClick?(job: ResolvedJobResponse): void;
}

interface ExpandMoreProps {
  expand: boolean;
}

export default function JobCard(props: JobCardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const { job } = props;
  const t = useI18n();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      onClick={() => {
        if (!isNullOrUndefined(props.handleCardClick)) props.handleCardClick(props.job);
      }}
      sx={[
        {
          "&:hover": (theme) => ({
            background: theme.palette.primary.veryLight
          })
        },
        ...(props.customStyle ? (Array.isArray(props.customStyle) ? props.customStyle : [props.customStyle]) : [])
      ]}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {props.job.employer && getUserInitials(props.job.employer?.firstName, props.job.employer?.lastName)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={job.name}
        subheader={job.createDate && getUserFriendlyDate(new Date(job.createDate), "bs")}
      />
      <CardContent>
        {job.employer && (
          <Stack direction="row" alignItems="center">
            <Person />
            <Typography variant="body2" color="text.secondary">
              {`${job.employer.firstName} ${job.employer.lastName}`}
            </Typography>
          </Stack>
        )}
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
        <Typography variant="body1" color="text.secondary">
          {job.highlightedDescription}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Chip label={job.categoryName} />
          {job.jobDurationType && <Chip label={getJobDurationTypeTranslation(job.jobDurationType, t)} />}
        </Stack>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{t("jobDescription")}</Typography>
          <Typography paragraph>{job.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
