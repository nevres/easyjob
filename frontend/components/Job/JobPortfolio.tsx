import JobCard from "./JobCard";
import { useAsync } from "react-async-hook";
import { Grid } from "@mui/material";
import JobFilter, { JobFilterModel } from "./Filter";
import { useCallback, useState } from "react";
import { useJobApi } from "../../common/customHooks/api/useJobApi";
import { JobResponse } from "../../api/Models/JobResponse";

export default function JobPortfolio() {
  var [filter, setFilter] = useState<JobFilterModel>();
  var jobApi = useJobApi();

  const getJobs = async (filter: JobFilterModel) => {
    var job = await jobApi.get();
    var allJobs = [job];
    return allJobs.filter(
      (x) => filter.name === undefined || x.name!.indexOf(filter.name) !== -1
    );
  };

  var fetchResult = useAsync<JobResponse[]>(getJobs, [filter]);

  var handleFilterSubmit = useCallback((data: JobFilterModel) => {
    setFilter(data);
  }, []);

  return (
    <Grid container spacing={6}>
      <Grid item md={3} xs={12}>
        <JobFilter handleOnSubmit={handleFilterSubmit} />
      </Grid>
      <Grid item md={9} xs={12}>
        <Grid container spacing={2}>
          {fetchResult.result &&
            fetchResult.result.map((x) => (
              <Grid item key={x.id}>
                <JobCard job={x} />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
