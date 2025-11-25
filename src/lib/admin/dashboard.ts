import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";

export type DashboardMetricKey =
  | "totalVisitors"
  | "contactClicks"
  | "productPageViews"
  | "galleryPageViews";

export type DashboardPeriodKey = "7d" | "30d" | "year";

export interface DashboardMetric {
  key: DashboardMetricKey;
  label: string;
  value: number;
  changePercentage: number;
  trend: "up" | "down" | "stable";
}

export interface DashboardChartPoint {
  label: string;
  value: number;
}

export interface DashboardSummary {
  periodKey: DashboardPeriodKey;
  periodLabel: string;
  metrics: DashboardMetric[];
  visitorsSeries: DashboardChartPoint[];
}

interface PeriodConfig {
  key: DashboardPeriodKey;
  label: string;
}

export const DASHBOARD_PERIODS: PeriodConfig[] = [
  { key: "7d", label: "7 hari terakhir" },
  { key: "30d", label: "30 hari terakhir" },
  { key: "year", label: "Tahun ini" },
];

type FirestoreDashboardSummary = {
  periodKey: DashboardPeriodKey;
  periodLabel: string;
  metrics: DashboardMetric[];
  visitorsSeries: DashboardChartPoint[];
};

const COLLECTION_NAME = "dashboard";

// Hardcode data sementara. Nanti kalau sudah ada database/API,
// cukup ganti fungsi ini supaya ambil data dari backend.
export function getDashboardSummaryFromLocal(period: DashboardPeriodKey): DashboardSummary {
  switch (period) {
    case "30d":
      return {
        periodKey: "30d",
        periodLabel: "30 hari terakhir",
        metrics: [
          {
            key: "totalVisitors",
            label: "Total Visitors",
            value: 4820,
            changePercentage: 22,
            trend: "up",
          },
          {
            key: "contactClicks",
            label: "Contact Us Clicks",
            value: 310,
            changePercentage: 14,
            trend: "up",
          },
          {
            key: "productPageViews",
            label: "Product Page Views",
            value: 1620,
            changePercentage: 6,
            trend: "stable",
          },
          {
            key: "galleryPageViews",
            label: "Gallery Page Views",
            value: 880,
            changePercentage: 3,
            trend: "down",
          },
        ],
        visitorsSeries: [
          { label: "M1", value: 120 },
          { label: "M2", value: 150 },
          { label: "M3", value: 138 },
          { label: "M4", value: 162 },
          { label: "M5", value: 176 },
          { label: "M6", value: 190 },
          { label: "M7", value: 174 },
        ],
      };

    case "year":
      return {
        periodKey: "year",
        periodLabel: "Tahun ini",
        metrics: [
          {
            key: "totalVisitors",
            label: "Total Visitors",
            value: 28540,
            changePercentage: 34,
            trend: "up",
          },
          {
            key: "contactClicks",
            label: "Contact Us Clicks",
            value: 1920,
            changePercentage: 27,
            trend: "up",
          },
          {
            key: "productPageViews",
            label: "Product Page Views",
            value: 10120,
            changePercentage: 11,
            trend: "stable",
          },
          {
            key: "galleryPageViews",
            label: "Gallery Page Views",
            value: 6240,
            changePercentage: 8,
            trend: "up",
          },
        ],
        visitorsSeries: [
          { label: "Jan", value: 1800 },
          { label: "Feb", value: 2100 },
          { label: "Mar", value: 2450 },
          { label: "Apr", value: 2680 },
          { label: "Mei", value: 2900 },
          { label: "Jun", value: 3100 },
          { label: "Jul", value: 3250 },
          { label: "Agu", value: 3400 },
          { label: "Sep", value: 3600 },
          { label: "Okt", value: 3780 },
          { label: "Nov", value: 3920 },
          { label: "Des", value: 4140 },
        ],
      };

    case "7d":
    default:
      return {
        periodKey: "7d",
        periodLabel: "7 hari terakhir",
        metrics: [
          {
            key: "totalVisitors",
            label: "Total Visitors",
            value: 1240,
            changePercentage: 18,
            trend: "up",
          },
          {
            key: "contactClicks",
            label: "Contact Us Clicks",
            value: 86,
            changePercentage: 9,
            trend: "up",
          },
          {
            key: "productPageViews",
            label: "Product Page Views",
            value: 430,
            changePercentage: 3,
            trend: "stable",
          },
          {
            key: "galleryPageViews",
            label: "Gallery Page Views",
            value: 215,
            changePercentage: 5,
            trend: "down",
          },
        ],
        visitorsSeries: [
          { label: "Sen", value: 140 },
          { label: "Sel", value: 160 },
          { label: "Rab", value: 175 },
          { label: "Kam", value: 190 },
          { label: "Jum", value: 210 },
          { label: "Sab", value: 220 },
          { label: "Min", value: 245 },
        ],
      };
  }
}

export async function getDashboardSummary(
  period: DashboardPeriodKey,
): Promise<DashboardSummary> {
  try {
    const docRef = doc(collection(db, COLLECTION_NAME), period);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      return getDashboardSummaryFromLocal(period);
    }

    const data = snapshot.data() as FirestoreDashboardSummary;

    return {
      periodKey: data.periodKey ?? period,
      periodLabel: data.periodLabel,
      metrics: Array.isArray(data.metrics) ? data.metrics : [],
      visitorsSeries: Array.isArray(data.visitorsSeries) ? data.visitorsSeries : [],
    };
  } catch (error) {
    console.error("Failed to load dashboard summary from Firestore", error);
    return getDashboardSummaryFromLocal(period);
  }
}
