import { useEffect } from "react";
import { GrainOverlay } from "@/components/GrainOverlay";
import { SideNav } from "@/components/SideNav";
import { motion } from "framer-motion";

const selectedWork = [
  { title: "ebook campaigns",            url: "https://www.manageengine.com/log-management/dark-side-of-ai-in-cybersecurity.html" },
  { title: "complex feature pages",      url: "https://www.manageengine.com/log-management/sem/security-and-risk-posture-management-for-ad-and-mssql.html" },
  { title: "PM and new product websites",url: "https://www.manageengine.com/siem-mssp/" },
  { title: "SEO-driven feature pages",   url: "https://www.manageengine.com/log-management/cyber-security/initial-access.html" },
  { title: "compliance explainer pages", url: "https://www.manageengine.com/products/eventlog/south-africa-popia-personal-information-act.html" },
  { title: "campaign landing pages",     url: "https://www.manageengine.com/log-management/upgrade-log360.html" },
  { title: "brand-level AI videos",      url: "https://www.linkedin.com/feed/update/urn:li:activity:7351098280228900864/" },
  { title: "social campaigns",           url: "https://www.manageengine.com/cybersecurity-awareness-month/" },
];

const thingsBuilt = [
  "GTM and PRDs for security products",
  "end-to-end content for launches",
  "customer-centric marketing and storytelling",
];

const Work = () => {
  useEffect(() => { document.title = "work — divya narasimhan"; }, []);
  return (
  <div className="h-screen overflow-hidden relative">
    <GrainOverlay />
    <SideNav />

    <div className="ml-40 h-full flex flex-col px-10 py-10 overflow-y-auto">
      <div className="max-w-xl page-transition">
        <h1 className="font-handwritten text-4xl md:text-5xl tracking-normal leading-none mb-6">work</h1>
        <p className="text-sm text-foreground leading-relaxed mb-10">
          campaigns, feature pages, product launches and brand storytelling from 3.5 years in enterprise security. you can find my detailed work items in this{" "}
          <a href="https://divyanaras.com/resume-2026.pdf" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors">
            resume
          </a>.
        </p>

        <section className="mb-10">
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">selected work</h2>
          <div className="space-y-3">
            {selectedWork.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <a href={item.url} target="_blank" rel="noopener noreferrer"
                  className="text-sm text-foreground hover:text-primary transition-colors underline decoration-1 underline-offset-4">
                  {item.title}
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-4">things i've helped build</h2>
          <div className="space-y-2">
            {thingsBuilt.map((item, i) => (
              <motion.p key={item} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 + 0.35 }}
                className="text-sm text-muted-foreground">
                {item}
              </motion.p>
            ))}
          </div>
        </section>
      </div>
    </div>
  </div>
  );
};

export default Work;
