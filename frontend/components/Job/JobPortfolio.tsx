import JobCard from "./JobCard";
import { useAsync } from "react-async-hook";
import { Button, Grid } from "@mui/material";
import JobFilter, { JobFilterModel } from "./Filter/Filter";
import React, { useCallback, useState } from "react";
import { useJobApi } from "../../common/customHooks/api/useJobApi";
import { ResolvedJobResponse } from "../../api/Models/ResolvedJobResponse";
import { SHOP_CURRENCY } from "../../domain/constants";
import JobPreview from "./JobPreview";
import { isNullOrUndefined } from "../../common/utils/jsHelper";
import useLoader from "../../common/useLoader/useLoader";
import useI18n from "../../common/i18n/useI18n";
import Link from "next/link";

export default function JobPortfolio() {
  const [filter, setFilter] = useState<JobFilterModel>();
  const [selectedJob, setSelectedJob] = useState<ResolvedJobResponse | null>();
  const jobApi = useJobApi();
  const { addLoader, removeLoader } = useLoader();
  const t = useI18n();

  const getJobs = async (filter: JobFilterModel) => {
    addLoader();
    setSelectedJob(null);
    try {
      const jobs = await jobApi.getjobs(
        filter?.name,
        filter?.name,
        SHOP_CURRENCY,
        filter?.price.priceType,
        filter?.price.minPrice,
        filter?.price.maxPrice,
        filter?.categories?.map((x) => x.value as number),
        filter?.jobDurationType,
        filter?.location,
        1,
        10,
        undefined
      );
      if (jobs && jobs.length > 0) {
        setSelectedJob(jobs[0]);
      }
      return jobs;
    } finally {
      removeLoader();
    }
  };

  var fetchResult = useAsync<ResolvedJobResponse[]>(getJobs, [filter]);

  var handleFilterSubmit = useCallback((data: JobFilterModel) => {
    setFilter(data);
  }, []);

  return (
    <Grid container spacing={6}>
      <Grid item md={2}>
        <JobFilter handleOnSubmit={handleFilterSubmit} />
      </Grid>
      <Grid item md={4}>
        <Grid container spacing={2}>
          {fetchResult.loading && <div>Loading</div>}
          {fetchResult.error && <div>Error: {fetchResult.error.message}</div>}
          {fetchResult.result &&
            fetchResult.result.map((x) => (
              <Grid item key={x.id} width={"100%"}>
                <JobCard job={x} handleCardClick={(job) => setSelectedJob(job)} />
              </Grid>
            ))}
        </Grid>
      </Grid>
      {selectedJob && (
        <Grid item xs={6}>
          <Link href="/job/new">
            <Button variant="contained">{t("addNewJob")}</Button>
          </Link>
          <JobPreview job={selectedJob} />
        </Grid>
      )}
    </Grid>
  );
}
