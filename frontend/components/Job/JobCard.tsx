import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ResolvedJobResponse } from "../../api/Models/ResolvedJobResponse";
import {
  getJobDurationTypeTranslation,
  getUserFriendlyLocation,
  getUserFriendlyPrice
} from "../../domain/job/jobHelper";
import useI18n from "../../common/i18n/useI18n";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import Stack from "@mui/material/Stack";
import fromUnixTime from "date-fns/fromUnixTime";
import formatDistance from "date-fns/formatDistance";
import { getUserFriendlyDate } from "../../common/utils/dateTimeHelper";
import { isNullOrUndefined } from "../../common/utils/jsHelper";
import Chip from "@mui/material/Chip";

interface JobCardProps {
  job: ResolvedJobResponse;
  handleCardClick?(job: ResolvedJobResponse): void;
}

interface ExpandMoreProps {
  expand: boolean;
}
type ExpandMoreIconProps = ExpandMoreProps & IconButtonProps;
const ExpandMore = styled((props: ExpandMoreIconProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest
  })
}));

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
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={job.name}
        subheader={getUserFriendlyDate(fromUnixTime(job.createDate?.seconds!), "bs")}
      />
      <CardContent>
        <Stack direction="row" spacing={2}>
          <Chip label={job.categoryName} />
          {job.jobDurationType && <Chip label={getJobDurationTypeTranslation(job.jobDurationType, t)} />}
        </Stack>
        <Typography variant="body1" color="text.secondary">
          {job.highlightedDescription}
        </Typography>
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
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
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
