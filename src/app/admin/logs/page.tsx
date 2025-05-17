"use client";

import { useState } from "react";
import Head from "next/head";

interface Log {
  timestamp: string;
  ip: string;
  fullResponse: any;
}

export default function AdminLogs() {
  const [secretKey, setSecretKey] = useState("");
  const [logs, setLogs] = useState<Log[]>([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLogs, setTotalLogs] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // New: Filters
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const login = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secretKey }),
      });
      if (!res.ok) throw new Error("Invalid secret key");
      setIsAuthenticated(true);
      fetchLogs(1, sort, dateFrom, dateTo);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchLogs = async (
    page: number,
    sortOrder = sort,
    from = dateFrom,
    to = dateTo
  ) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        sort: sortOrder,
      });
      if (from) params.append("dateFrom", from);
      if (to) params.append("dateTo", to);

      const res = await fetch(`/api/logs?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch logs");
      const data = await res.json();
      setLogs(data.logs);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
      setTotalLogs(data.totalRecords);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching logs");
      setLogs([]);
      setTotalPages(1);
      setCurrentPage(1);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secretKey.trim()) {
      setError("Please enter the secret key");
      return;
    }
    login();
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    fetchLogs(page, sort, dateFrom, dateTo);
  };

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLogs(1, sort, dateFrom, dateTo);
  };

  return (
    <div className="min-h-screen p-8 text-gray-900">
      <Head>
        <title>Admin Logs</title>
        <meta name="robots" content="noindex" />
      </Head>

      {!isAuthenticated ? (
        <>
          <h1 className="text-3xl font-bold text-center py-24 text-[var(--primaryColor)]">
            Visitor Logs
          </h1>
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-gray-800 p-6 rounded shadow"
          >
            <h2 className="text-xl font-semibold mb-4 text-center text-white">
              Enter Secret Key
            </h2>
            <div className="mb-4">
              <input
                id="secretKey"
                type="password"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                className="w-full p-2 border border-white rounded text-white"
                required
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
            >
              {loading ? "Logging in..." : "Access Logs"}
            </button>
          </form>
        </>
      ) : (
        <div className="px-10 mx-auto">
          <h1 className="text-3xl font-bold text-center py-12 text-[var(--primaryColor)]">
            Visitor Logs
          </h1>

          {/* Filter Controls */}
          <form
            onSubmit={handleFilter}
            className="flex flex-wrap gap-4 items-end justify-center mb-6"
          >
            <div>
              <label className="block text-sm mb-1 text-[var(--primaryColor)] font-semibold">
                Sort by Date
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as "asc" | "desc")}
                className="p-2.5 border rounded border-white text-white"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1 text-[var(--primaryColor)]  font-semibold">
                From
              </label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="p-2 border rounded border-white text-white"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-[var(--primaryColor)]  font-semibold">
                To
              </label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="p-2 border rounded border-white text-white"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition w-[50%] md:w-[10%]"
            >
              Apply
            </button>
          </form>

          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <>
              {/* Table for Desktop view */}
              <div className="overflow-x-auto rounded-lg shadow-md md:block hidden">
                <table className="min-w-full">
                  <thead>
                    <tr className="border border-[var(--primaryColor)]">
                      <th className="px-6 py-3 text-left font-medium font-semibold text-[var(--primaryColor)]">
                        Sr. No.
                      </th>
                      <th className="px-6 py-3 text-left font-medium font-semibold text-[var(--primaryColor)]">
                        IP Address
                      </th>
                      <th className="px-6 py-3 text-left font-medium font-semibold text-[var(--primaryColor)]">
                        Timestamp
                      </th>
                      <th className="px-6 py-3 text-left font-medium font-semibold text-[var(--primaryColor)]">
                        City
                      </th>
                      <th className="px-6 py-3 text-left font-medium font-semibold text-[var(--primaryColor)]">
                        Region
                      </th>
                      <th className="px-6 py-3 text-left font-medium font-semibold text-[var(--primaryColor)]">
                        Country
                      </th>
                      <th className="px-6 py-3 text-left font-medium font-semibold text-[var(--primaryColor)]">
                        Zip Code
                      </th>
                      <th className="px-6 py-3 text-left font-medium font-semibold text-[var(--primaryColor)]">
                        Continent
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log, i) => (
                      <tr key={i} className="text-white border border-white">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {(currentPage - 1) * 10 + i + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {log.ip}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {log.fullResponse.city}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {log.fullResponse.region_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="mx-2">
                            {log.fullResponse.location?.country_flag_emoji}
                          </span>
                          {log.fullResponse.country_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {log.fullResponse.zip}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {log.fullResponse.continent_name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Cards for mobile view */}
              <div className="md:hidden flex flex-col gap-6">
                {logs.map((log, i) => (
                  <div
                    key={i}
                    className={`rounded shadow text-white p-4 border ${
                      i % 2 === 0
                        ? "border-[var(--primaryColor)]"
                        : "border-white"
                    }`}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-bold text-[var(--primaryColor)]">
                        #{(currentPage - 1) * 10 + i + 1}
                      </span>
                      <span className="text-xs text-white">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div>
                        <span className="font-semibold text-[var(--primaryColor)]">
                          IP:
                        </span>{" "}
                        {log.ip}
                      </div>
                      <div>
                        <span className="font-semibold text-[var(--primaryColor)]">
                          City:
                        </span>{" "}
                        {log.fullResponse.city}
                      </div>
                      <div>
                        <span className="font-semibold text-[var(--primaryColor)]">
                          Region:
                        </span>{" "}
                        {log.fullResponse.region_name}
                      </div>
                      <div>
                        <span className="font-semibold text-[var(--primaryColor)]">
                          Country:
                        </span>{" "}
                        <span className="mx-2">
                          {log.fullResponse.location?.country_flag_emoji}
                        </span>
                        {log.fullResponse.country_name}
                      </div>
                      <div>
                        <span className="font-semibold text-[var(--primaryColor)]">
                          Zip:
                        </span>{" "}
                        {log.fullResponse.zip}
                      </div>
                      <div>
                        <span className="font-semibold text-[var(--primaryColor)]">
                          Continent:
                        </span>{" "}
                        {log.fullResponse.continent_name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center mt-6 space-x-3 select-none">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded border ${
                    currentPage === 1
                      ? "cursor-not-allowed text-white border-[var(--primaryColor)]"
                      : "text-[var(--primaryColor)]"
                  }`}
                  aria-label="Previous page"
                >
                  &laquo; Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-3 py-1 rounded border border-[var(--primaryColor)] text-white ${
                        page === currentPage ? "bg-[var(--primaryColor)]" : null
                      }`}
                      aria-current={page === currentPage ? "page" : undefined}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded border ${
                    currentPage === totalPages
                      ? "cursor-not-allowed text-white border-[var(--primaryColor)]"
                      : "text-[var(--primaryColor)]"
                  }`}
                  aria-label="Next page"
                >
                  Next &raquo;
                </button>
              </div>
            </>
          )}
          <div className="text-white text-lg mt-4 mx-auto flex justify-center">
            <span>
              Showing{" "}
              <span className="text-[var(--primaryColor)]">{logs.length}</span>{" "}
              logs of{" "}
              <span className="text-[var(--primaryColor)]">{totalLogs}</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
