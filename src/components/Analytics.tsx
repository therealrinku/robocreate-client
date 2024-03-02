import { useUser } from "@/hooks/useUser";
import { getPageInsights } from "@/services/connectionService";
import { Chart, registerables } from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

Chart.register(...registerables);

export default function Analytics() {
  const { user, selectedConnectionIndex } = useUser();

  const [analytics, setAnalytics] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const selectedConnection = user?.connections[selectedConnectionIndex];

  useEffect(() => {
    (async function () {
      try {
        if (!user?.connections) return;
        setAnalytics(await (await getPageInsights({ connectionId: selectedConnection?.id || "" })).json());
        setIsLoading(false);
      } catch (err) {}
    })();
  }, [user]);

  if (isLoading) {
    return <p className="text-sm">Loading Analytics... Hold tight.</p>;
  }

  //@ts-expect-error
  const pagePostsEngagement = analytics.data?.data?.find((analytic) => analytic.name === "page_post_engagements");
  // from api it comes for 30 days but we are slicing it to show 15 days for now
  //@ts-expect-error
  const labels = pagePostsEngagement?.values?.map((v) => new Date(v.end_time).toDateString())?.slice(0, 15);
  //@ts-expect-error
  const values = pagePostsEngagement?.values?.map((v) => v.value)?.slice(0, 15);

  const pagePostsEngagementChartConfig = {
    data: {
      labels: labels,
      datasets: [
        {
          label: "No. of posts engagements",
          data: values,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div className=" mb-3 text-sm ">
      <div className="bg-white p-3 border rounded shadow">
        <p className="mb-3 font-bold">Page Posts Engagements(Last 15 days)</p>

        <Line data={pagePostsEngagementChartConfig.data} options={pagePostsEngagementChartConfig.options} />
      </div>
    </div>
  );
}
