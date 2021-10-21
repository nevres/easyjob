import JobCard from "./JobCard";
import { useAsync } from "react-async-hook";
import { Grid } from "@mui/material";
import JobFilter, { JobFilterModel } from "./Filter/Filter";
import React, { useCallback, useState } from "react";
import { useJobApi } from "../../common/customHooks/api/useJobApi";
import { JobResponse } from "../../api/Models/JobResponse";
import { SHOP_CURRENCY } from "../../domain/constants";
import { JobNewModal } from "./New/JobNewModal";

export default function JobPortfolio() {
  var [filter, setFilter] = useState<JobFilterModel>();
  var jobApi = useJobApi();

  const getJobs = async (filter: JobFilterModel) => {
    return await jobApi.getjobs(
      filter?.name,
      filter?.name,
      SHOP_CURRENCY,
      filter?.price.type,
      filter?.price.minAmount,
      filter?.price.maxAmount,
      1,
      10,
      undefined,
      filter?.categories
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
        <JobNewModal />
      </Grid>
      <Grid item md={9} xs={12}>
        <Grid container spacing={2}>
          {fetchResult.loading && <div>Loading</div>}
          {fetchResult.error && <div>Error: {fetchResult.error.message}</div>}
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
