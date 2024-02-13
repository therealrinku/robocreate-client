interface Props {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
}

export default function DashboardTabs({ activeTab, setActiveTab }: Props) {
  return (
    <div className="tabs flex items-center text-sm h-10">
      <button
        className={`border-r h-full flex items-center px-10 ${activeTab !== "Create" && "border-b"}`}
        onClick={() => setActiveTab("Create")}
      >
        Create
      </button>

      <button
        className={`border-r h-full flex items-center px-10 ${activeTab !== "Channels" && "border-b"}`}
        onClick={() => setActiveTab("Channels")}
      >
        Channels
      </button>

      <button
        disabled
        className={`border-r h-full disabled:bg-gray-100 flex items-center px-10 ${activeTab !== "Analytics" && "border-b"}`}
        onClick={() => setActiveTab("Analytics")}
      >
        Analytics✨
      </button>

      {/* dummy line */}
      <div className="border-b w-full h-full" />
    </div>
  );
}
