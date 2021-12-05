import { Box, Button, Grid } from "@mui/material";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ResolvedJobResponse } from "../../apis/jobProcessingApi/Models/ResolvedJobResponse";
import { useJobApi } from "../../common/customHooks/api/useJobApi";
import useI18n from "../../common/i18n/useI18n";
import { SHOP_CURRENCY } from "../../domain/constants";
import JobFilter, { JobFilterModel } from "./Filter/Filter";
import JobCard from "./JobCard";
import JobPreview from "./JobPreview";

export default function JobPortfolio() {
  const [filter, setFilter] = useState<JobFilterModel>();
  const [selectedJob, setSelectedJob] = useState<ResolvedJobResponse | null>();
  const [loadedItems, setLoadedItems] = useState<ResolvedJobResponse[]>([]);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const jobApi = useJobApi();
  const t = useI18n();

  const NUMBER_OF_ITEMS_TO_LOAD = 5;

  useEffect(() => {
    const getJobsPromise = getJobsFromApi();
    getJobsPromise.then((getJobsResult) => {
      if (getJobsResult && getJobsResult.data && getJobsResult.data.length > 0) {
        setLoadedItems((prevLoadedItems) => {
          return [...prevLoadedItems, ...getJobsResult.data!];
        });
        if (!selectedJob) {
          setSelectedJob(getJobsResult.data[0]);
        }

        var pageCount = Math.ceil(getJobsResult?.count! / getJobsResult?.pageSize!);
        var isLastPage = getJobsResult?.page! >= pageCount;
        setIsLastPage(isLastPage);
      }
    });
  }, [currentPage, filter]);

  var handleFilterSubmit = useCallback((data: JobFilterModel) => {
    setSelectedJob(null);
    setLoadedItems([]);
    setCurrentPage(1);
    setFilter(data);
  }, []);

  console.log("Job portfolio render");

  return (
    <Grid container spacing={6}>
      <Grid item md={2}>
        <JobFilter handleOnSubmit={handleFilterSubmit} />
      </Grid>
      <Grid item md={4}>
        {loadedItems && (
          <InfiniteScroll
            dataLength={loadedItems.length}
            hasMore={!isLastPage}
            height={"calc(100vh - 84px)"}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            next={() => setCurrentPage((prevValue) => (prevValue += 1))}
          >
            {loadedItems?.map((x) => (
              <Box sx={{ marginBottom: 1 }}>
                <JobCard
                  job={x}
                  handleCardClick={(job) => setSelectedJob(job)}
                  key={x.id}
                  customStyle={
                    selectedJob?.id == x.id ? { background: (theme) => theme.palette.primary.veryLight } : undefined
                  }
                />
              </Box>
            ))}
          </InfiniteScroll>
        )}
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

  async function getJobsFromApi() {
    return await jobApi.getjobs(
      filter?.name,
      filter?.name,
      SHOP_CURRENCY,
      filter?.price.priceType,
      filter?.price.minPrice,
      filter?.price.maxPrice,
      filter?.categories?.map((x) => x.value as number),
      filter?.jobDurationType,
      filter?.location,
      currentPage,
      NUMBER_OF_ITEMS_TO_LOAD,
      undefined
    );
  }
}
