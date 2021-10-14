import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../layouts/Layout";
import { Container } from "@mui/material";
import JobCard from "../components/Job/JobCard";
import { jobMock } from "../domain/models/job";
import JobPortfolio from "../components/Job/JobPortfolio";
import "../common/i18n/i18next";

const Home: NextPage = () => {
  return (
    <Layout>
      <JobPortfolio />
    </Layout>
  );
};

export default Home;
