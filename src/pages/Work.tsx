import { Link } from "react-router-dom";
import { GrainOverlay } from "@/components/GrainOverlay";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const Work = () => {
  const selectedWork = [
    {
      title: "ebook campaigns",
      url: "https://www.manageengine.com/log-management/dark-side-of-ai-in-cybersecurity.html",
    },
    {
      title: "complex feature pages",
      url: "https://www.manageengine.com/log-management/sem/security-and-risk-posture-management-for-ad-and-mssql.html",
    },
    {
      title: "PM and new product websites",
      url: "https://www.manageengine.com/siem-mssp/",
    },
    {
      title: "SEO-driven feature pages",
      url: "https://www.manageengine.com/log-management/cyber-security/initial-access.html",
    },
    {
      title: "compliance explainer pages",
      url: "https://www.manageengine.com/products/eventlog/south-africa-popia-personal-information-act.html",
    },
    {
      title: "campaign landing pages",
      url: "https://www.manageengine.com/log-management/upgrade-log360.html",
    },
    {
      title: "brand-level AI videos",
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7351098280228900864/",
    },
    {
      title: "social campaigns",
      url: "https://www.manageengine.com/cybersecurity-awareness-month/",
    },
  ];

  const thingsBuilt = [
    "GTM and PRDs for security products",
    "end-to-end content for launches",
    "customer branding and community",
    "customer story-telling",
  ];

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-12 relative">
      <GrainOverlay />
      <ThemeToggle />

      {/* Top Navigation */}
      <nav className="fixed top-6 left-6 z-20 flex flex-col gap-2">
        <Link
          to="/work"
          className="text-sm text-foreground font-medium hover:opacity-70 transition-opacity"
        >
          work
        </Link>
        <Link
          to="/bookshelf"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          bookshelf
        </Link>
      </nav>

      <main className="page-transition max-w-lg w-full flex flex-col items-center text-center z-10 pt-16">
        {/* Back Link */}
        <Link
          to="/"
          className="self-start flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          <span className="text-sm">back</span>
        </Link>

        {/* Header */}
        <div className="w-full border border-border rounded-lg p-6 mb-12 text-left">
          <h1 className="text-2xl font-semibold text-foreground mb-4">Work</h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            a collection of work I've put together over the years — from campaigns and feature pages to product launches and brand storytelling.
          </p>
        </div>

        {/* Selected Work Section */}
        <section className="w-full text-left mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6">selected work</h2>
          <div className="space-y-4">
            {selectedWork.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary transition-colors underline decoration-1 underline-offset-4"
                >
                  {item.title}
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Things I've Helped Build Section */}
        <section className="w-full text-left mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-6">things I've helped build</h2>
          <div className="space-y-3">
            {thingsBuilt.map((item, index) => (
              <motion.p
                key={item}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 + 0.4 }}
                className="text-muted-foreground text-base"
              >
                {item}
              </motion.p>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Work;
