import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../layouts/Layout";
import { Container } from "@mui/material";
import JobCard from "../components/Job/JobCard";
import JobPortfolio from "../components/Job/JobPortfolio";
import "../common/i18n/i18next";
import JobNewPage from "../components/Job/New/JobNewPage";

const Home: NextPage = () => {
  return (
    <Layout>
      <JobNewPage />
    </Layout>
  );
};

export default Home;
