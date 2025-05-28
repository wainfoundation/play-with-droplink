
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkflowShowcase from "@/components/WorkflowShowcase";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <WorkflowShowcase />
    </div>
  );
};

export default Home;
