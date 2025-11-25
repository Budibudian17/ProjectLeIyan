"use client";

import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { collection, doc, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import {
  DASHBOARD_PERIODS,
  type DashboardChartPoint,
  type DashboardPeriodKey,
  type DashboardSummary,
  getDashboardSummary,
} from "@/lib/admin/dashboard";

function formatDateId(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(base: Date, offset: number): Date {
  const date = new Date(base);
  date.setDate(date.getDate() + offset);
  return date;
}

const DAY_LABELS_ID = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const MONTH_LABELS_ID = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

export default function AdminDashboardPage() {
  const [period, setPeriod] = useState<DashboardPeriodKey>("7d");
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [stats, setStats] = useState<Record<string, number> | null>(null);
  const [series, setSeries] = useState<DashboardChartPoint[] | null>(null);

  useEffect(() => {
    const ref = doc(db, "stats", "global");

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        const data = snapshot.data() as Record<string, unknown> | undefined;

        if (!data) {
          setStats(null);
          return;
        }

        const numericStats: Record<string, number> = {};

        for (const [key, value] of Object.entries(data)) {
          if (typeof value === "number") {
            numericStats[key] = value;
          }
        }

        setStats(numericStats);
      },
      (error) => {
        console.error("Failed to subscribe to realtime stats", error);
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;

    async function load() {
      try {
        setIsLoading(true);
        const data = await getDashboardSummary(period);
        if (!isCancelled) {
          setSummary(data);
          setErrorMessage(null);
        }
      } catch (error) {
        if (!isCancelled) {
          console.error("Failed to load admin dashboard summary", error);
          setErrorMessage("Gagal memuat data dashboard.");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    }

    void load();

    return () => {
      isCancelled = true;
    };
  }, [period]);

  useEffect(() => {
    let isCancelled = false;

    async function loadSeries(currentPeriod: DashboardPeriodKey) {
      try {
        const now = new Date();
        let fromDate: Date;
        let toDate: Date = now;

        if (currentPeriod === "7d") {
          fromDate = addDays(now, -6);
        } else if (currentPeriod === "30d") {
          fromDate = addDays(now, -29);
        } else {
          fromDate = new Date(now.getFullYear(), 0, 1);
          toDate = new Date(now.getFullYear(), 11, 31);
        }

        const fromId = formatDateId(fromDate);
        const toId = formatDateId(toDate);

        const q = query(
          collection(db, "dailyVisitors"),
          where("__name__", ">=", fromId),
          where("__name__", "<=", toId),
          orderBy("__name__"),
        );

        const snapshot = await getDocs(q);
        const docsById: Record<string, { totalVisitors?: number }> = {};

        snapshot.forEach((docSnapshot) => {
          const data = docSnapshot.data() as { totalVisitors?: number };
          docsById[docSnapshot.id] = data;
        });

        let nextSeries: DashboardChartPoint[] = [];

        if (currentPeriod === "7d") {
          const days: DashboardChartPoint[] = [];

          for (let offset = -6; offset <= 0; offset += 1) {
            const date = addDays(now, offset);
            const id = formatDateId(date);
            const data = docsById[id];
            const value = typeof data?.totalVisitors === "number" ? data.totalVisitors : 0;
            const dayIndex = date.getDay();

            days.push({
              label: DAY_LABELS_ID[dayIndex],
              value,
            });
          }

          nextSeries = days;
        } else if (currentPeriod === "30d") {
          const bucketCount = 4;
          const bucketValues = new Array<number>(bucketCount).fill(0);

          for (let offset = -29; offset <= 0; offset += 1) {
            const date = addDays(now, offset);
            const id = formatDateId(date);
            const data = docsById[id];
            const value = typeof data?.totalVisitors === "number" ? data.totalVisitors : 0;
            const index = offset + 29;
            const bucketIndex = Math.min(bucketCount - 1, Math.floor(index / 7));
            bucketValues[bucketIndex] += value;
          }

          nextSeries = bucketValues.map((value, index) => ({
            label: `M${index + 1}`,
            value,
          }));
        } else {
          const bucketValues = new Array<number>(12).fill(0);

          for (const [id, data] of Object.entries(docsById)) {
            const [yearStr, monthStr, dayStr] = id.split("-");
            const year = Number(yearStr);
            const month = Number(monthStr);
            const day = Number(dayStr);

            if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
              continue;
            }

            const value = typeof data.totalVisitors === "number" ? data.totalVisitors : 0;

            const monthIndex = month - 1;
            if (monthIndex >= 0 && monthIndex < 12) {
              bucketValues[monthIndex] += value;
            }
          }

          nextSeries = bucketValues.map((value, index) => ({
            label: MONTH_LABELS_ID[index],
            value,
          }));
        }

        if (!isCancelled) {
          setSeries(nextSeries);
        }
      } catch (error) {
        console.error("Failed to load visitors series from dailyVisitors", error);
        if (!isCancelled) {
          setSeries(null);
        }
      }
    }

    void loadSeries(period);

    return () => {
      isCancelled = true;
    };
  }, [period]);

  const activeSeries: DashboardChartPoint[] =
    series && series.length > 0
      ? series
      : summary?.visitorsSeries ?? [];

  const maxValue = activeSeries.length > 0
    ? Math.max(0, ...activeSeries.map((p) => p.value))
    : 0;

  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900">Dashboard</h1>
          <p className="text-sm text-zinc-500">
            Ringkasan performa website dan interaksi pengunjung.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-full bg-zinc-100 p-1 text-xs font-medium text-zinc-500">
            {DASHBOARD_PERIODS.map((option) => {
              const isActive = option.key === period;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setPeriod(option.key)}
                  className={`rounded-full px-3 py-1 transition-colors ${
                    isActive
                      ? "bg-zinc-900 text-white"
                      : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          {summary && (
            <span className="hidden rounded-full bg-zinc-100 px-4 py-1 text-xs font-medium text-zinc-600 md:inline-block">
              Periode: {summary.periodLabel}
            </span>
          )}
        </div>
      </header>

      {errorMessage && (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading && !summary ? (
          Array.from({ length: 4 }).map((_, index) => (
            <article
              key={index}
              className="h-28 animate-pulse rounded-xl border border-zinc-200 bg-zinc-50"
            />
          ))
        ) : (
          (summary?.metrics ?? []).map((metric) => {
            const realtimeValue =
              stats && typeof stats[metric.key] === "number"
                ? stats[metric.key]
                : metric.value;

            const isPositive = metric.trend === "up";
            const isNegative = metric.trend === "down";

            return (
              <article
                key={metric.key}
                className="rounded-xl border border-zinc-200 bg-white px-4 py-4 shadow-sm"
              >
                <h2 className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  {metric.label}
                </h2>
                <p className="mt-3 text-2xl font-semibold text-zinc-900">
                  {realtimeValue.toLocaleString("id-ID")}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium ${
                      isPositive
                        ? "bg-emerald-500/10 text-emerald-600"
                        : isNegative
                        ? "bg-red-500/10 text-red-600"
                        : "bg-zinc-100 text-zinc-600"
                    }`}
                  >
                    {isPositive && (
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    )}
                    {isNegative && (
                      <ArrowDownRight className="h-3 w-3" aria-hidden="true" />
                    )}
                    {!isPositive && !isNegative && (
                      <Minus className="h-3 w-3" aria-hidden="true" />
                    )}
                    <span>{metric.changePercentage}%</span>
                  </span>
                  <span className="text-zinc-500">vs periode sebelumnya</span>
                </div>
              </article>
            );
          })
        )}
      </section>

      <section className="space-y-4 rounded-xl border border-zinc-200 bg-white px-5 py-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-medium text-zinc-900">Tren pengunjung</h2>
            <p className="text-xs text-zinc-500">
              Distribusi pengunjung berdasarkan
              {" "}
              {summary?.periodKey === "year" ? "bulan" : "hari"}.
            </p>
          </div>
        </div>

        <div className="mt-2 flex h-56 items-end gap-3">
          {activeSeries.length > 0 ? (
            activeSeries.map((point) => {
              const height = maxValue > 0 ? (point.value / maxValue) * 100 : 0;
              return (
                <div key={point.label} className="flex-1">
                  <div className="mb-2 text-center text-[11px] font-medium text-zinc-700">
                    {point.value.toLocaleString("id-ID")}
                  </div>
                  <div
                    className="relative flex h-40 items-end justify-center rounded-md bg-zinc-50"
                    aria-hidden="true"
                  >
                    <div
                      className="w-3 rounded-full bg-orange-500 shadow-[0_0_18px_rgba(249,115,22,0.5)]"
                      style={{ height: `${Math.max(height, 6)}%` }}
                    />
                  </div>
                  <div className="mt-2 text-center text-[11px] text-zinc-500">
                    {point.label}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex w-full items-center justify-center text-xs text-zinc-500">
              {isLoading ? "Memuat data grafik..." : "Belum ada data grafik pengunjung."}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
