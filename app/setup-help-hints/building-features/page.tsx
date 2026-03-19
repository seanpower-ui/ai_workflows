import { GuidePageContent } from "../_components/GuidePageContent";

const slideClass =
  "flex aspect-video w-full items-center justify-center rounded-lg border border-sol-stroke-default bg-sol-surface-whisper text-sol-text-subtle";

export default function BuildingFeaturesPage() {
  return (
    <GuidePageContent
      steps={[
        {
          title: "Step 1: Break down the feature into tasks",
          description: "",
          content: (
            <div className={slideClass}>
              <span className="text-lg">Step 1: Break down the feature into tasks</span>
            </div>
          ),
        },
        {
          title: "Step 2: Implement and integrate",
          description: "",
          content: (
            <div className={slideClass}>
              <span className="text-lg">Step 2: Implement and integrate</span>
            </div>
          ),
        },
        {
          title: "Step 3: Test and refine with your agent",
          description: "",
          content: (
            <div className={slideClass}>
              <span className="text-lg">Step 3: Test and refine with your agent</span>
            </div>
          ),
        },
        {
          title: "Step 4 — placeholder",
          description: "",
          content: (
            <div className={slideClass}>
              <span className="text-lg">Step 4 — placeholder</span>
            </div>
          ),
        },
        {
          title: "Step 5 — placeholder",
          description: "",
          content: (
            <div className={slideClass}>
              <span className="text-lg">Step 5 — placeholder</span>
            </div>
          ),
        },
        {
          title: "Step 6 — placeholder",
          description: "",
          content: (
            <div className={slideClass}>
              <span className="text-lg">Step 6 — placeholder</span>
            </div>
          ),
        },
        {
          title: "Step 7 — placeholder",
          description: "",
          content: (
            <div className={slideClass}>
              <span className="text-lg">Step 7 — placeholder</span>
            </div>
          ),
        },
        {
          title: "Step 8 — placeholder",
          description: "",
          content: (
            <div className={slideClass}>
              <span className="text-lg">Step 8 — placeholder</span>
            </div>
          ),
        },
        {
          title: "Step 9 — placeholder",
          description: "",
          content: (
            <div className={slideClass}>
              <span className="text-lg">Step 9 — placeholder</span>
            </div>
          ),
        },
        {
          title: "Step 10 — placeholder",
          description: "",
          content: (
            <div className={slideClass}>
              <span className="text-lg">Step 10 — placeholder</span>
            </div>
          ),
        },
      ]}
    />
  );
}
