"use client";

import { useState } from "react";
import Head from "next/head";
import { RefreshCw } from "lucide-react";

interface IPAPILog {
  timestamp: string;
  ip: string;
  fullResponse: any;
}

export default function AdminLogs() {
  const [secretKey, setSecretKey] = useState("");
  const [ipapiLogs, setIPAPILogs] = useState<IPAPILog[]>([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLogs, setTotalLogs] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedRawLog, setSelectedRawLog] = useState<any>(null);

  // Filters
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
      
      setIPAPILogs(data.logs);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
      setTotalLogs(data.totalRecords);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching logs");
      setIPAPILogs([]);
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
    <div className="min-h-screen p-4 md:p-8 text-gray-900">
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
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-center py-6 md:py-12 text-[var(--primaryColor)]">
            Visitor Logs
          </h1>

          {/* Filter Controls */}
          <form
            onSubmit={handleFilter}
            className="flex flex-wrap gap-4 items-end justify-center mb-6 bg-gray-800/50 p-4 rounded-xl border border-gray-700"
          >
            <div className="flex flex-col">
              <label className="text-xs mb-1 text-gray-400 font-semibold uppercase tracking-wider">
                Sort
              </label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as "asc" | "desc")}
                className="p-2 border rounded border-gray-600 bg-gray-900 text-white text-sm"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-xs mb-1 text-gray-400 font-semibold uppercase tracking-wider">
                From
              </label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="p-2 border rounded border-gray-600 bg-gray-900 text-white text-sm"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs mb-1 text-gray-400 font-semibold uppercase tracking-wider">
                To
              </label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="p-2 border rounded border-gray-600 bg-gray-900 text-white text-sm"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition shrink-0"
              >
                Apply
              </button>
              <button
                type="button"
                onClick={() => fetchLogs(currentPage)}
                disabled={loading}
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
                title="Refresh logs"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="md:hidden lg:inline">Refresh</span>
              </button>
            </div>
          </form>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primaryColor)]"></div>
            </div>
          ) : error ? (
            <p className="text-center text-red-500 py-20">{error}</p>
          ) : (
            <>
              {/* Desktop View */}
              <div className="overflow-x-auto rounded-xl shadow-2xl border border-gray-800 md:block hidden">
                <table className="min-w-full bg-gray-900/50 backdrop-blur-sm">
                  <thead>
                    <tr className="bg-gray-800/50">
                      <th className="px-6 py-4 text-left font-bold text-[var(--primaryColor)] uppercase tracking-wider text-xs">#</th>
                      <th className="px-6 py-4 text-left font-bold text-[var(--primaryColor)] uppercase tracking-wider text-xs">IP & Time</th>
                      <th className="px-6 py-4 text-left font-bold text-[var(--primaryColor)] uppercase tracking-wider text-xs">Location</th>
                      <th className="px-6 py-4 text-left font-bold text-[var(--primaryColor)] uppercase tracking-wider text-xs">Extra Info</th>
                      <th className="px-6 py-4 text-left font-bold text-[var(--primaryColor)] uppercase tracking-wider text-xs">Raw</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {ipapiLogs.map((log, i) => (
                      <tr key={i} className="hover:bg-gray-800/30 transition-colors">
                        <td className="px-6 py-4 text-gray-400">{(currentPage - 1) * 10 + i + 1}</td>
                        <td className="px-6 py-4">
                          <div className="text-white font-mono text-sm">{log.ip}</div>
                          <div className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-white">{log.fullResponse.city}, {log.fullResponse.region_name}</div>
                          <div className="text-xs text-gray-400 flex items-center gap-2">
                            <span>{log.fullResponse.location?.country_flag_emoji}</span>
                            {log.fullResponse.country_name}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs text-gray-400">Zip: {log.fullResponse.zip}</div>
                          <div className="text-xs text-gray-400">Cont: {log.fullResponse.continent_name}</div>
                        </td>
                        <td className="px-6 py-4">
                           <button 
                             onClick={() => setSelectedRawLog(log)}
                             className="text-[var(--primaryColor)] hover:underline text-xs bg-[var(--primaryColor)]/10 px-2 py-1 rounded"
                           >
                             Full JSON
                           </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="md:hidden space-y-4">
                {ipapiLogs.map((log, i) => (
                  <div key={i} className="bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-lg">
                    <div className="flex justify-between items-start mb-3 border-b border-gray-700 pb-2">
                       <span className="bg-[var(--primaryColor)] text-white text-[10px] px-2 py-0.5 rounded-full">
                         #{(currentPage - 1) * 10 + i + 1}
                       </span>
                      <span className="text-[10px] text-gray-400">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                       <div className="col-span-1">
                         <p className="text-[10px] text-gray-500 uppercase font-bold">IP Address</p>
                         <p className="text-xs text-white font-mono">{log.ip}</p>
                       </div>
                       <div className="col-span-1">
                         <p className="text-[10px] text-gray-500 uppercase font-bold">Location</p>
                         <p className="text-xs text-white flex items-center gap-1">
                           <span>{log.fullResponse.location?.country_flag_emoji}</span>
                           {log.fullResponse.city}, {log.fullResponse.country_name}
                         </p>
                       </div>
                       <div className="col-span-2">
                          <p className="text-[10px] text-gray-500 uppercase font-bold">Extra</p>
                          <p className="text-xs text-white">Zip: {log.fullResponse.zip} | Cont: {log.fullResponse.continent_name}</p>
                       </div>
                    </div>
                    <button 
                         onClick={() => setSelectedRawLog(log)}
                         className="w-full mt-4 bg-gray-700/50 text-[var(--primaryColor)] text-[10px] py-1.5 rounded-lg border border-gray-600 font-bold uppercase tracking-wider"
                    >
                        View Raw JSON Data
                    </button>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center mt-10 space-x-2 select-none">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                    currentPage === 1
                      ? "opacity-30 cursor-not-allowed border-gray-700 text-gray-500"
                      : "border-[var(--primaryColor)] text-[var(--primaryColor)] hover:bg-[var(--primaryColor)] hover:text-white"
                  }`}
                >
                  &larr; Prev
                </button>

                <div className="flex gap-1 overflow-x-auto max-w-[150px] md:max-w-none no-scrollbar">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    if (totalPages > 5 && Math.abs(pageNum - currentPage) > 1 && pageNum !== 1 && pageNum !== totalPages) {
                      if (pageNum === 2 || pageNum === totalPages - 1) return <span key={i} className="px-1 text-gray-600">.</span>;
                      return null;
                    }
                    return (
                      <button
                        key={i}
                        onClick={() => goToPage(pageNum)}
                        className={`min-w-[32px] h-8 rounded-lg border text-xs transition-all ${
                          pageNum === currentPage
                            ? "bg-[var(--primaryColor)] border-[var(--primaryColor)] text-white shadow-lg"
                            : "border-gray-700 text-gray-400 hover:border-gray-500"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                    currentPage === totalPages
                      ? "opacity-30 cursor-not-allowed border-gray-700 text-gray-500"
                      : "border-[var(--primaryColor)] text-[var(--primaryColor)] hover:bg-[var(--primaryColor)] hover:text-white"
                  }`}
                >
                  Next &rarr;
                </button>
              </div>

              <div className="text-gray-500 text-sm mt-6 text-center">
                Displaying <span className="text-white font-bold">{ipapiLogs.length}</span> results of <span className="text-white font-bold">{totalLogs}</span> total records
              </div>
            </>
          )}

          {/* Raw JSON Modal */}
          {selectedRawLog && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                <div className="bg-gray-900 border border-gray-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
                    <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-800/20">
                        <h3 className="text-white font-bold uppercase tracking-widest text-sm">Full Raw Log Data</h3>
                        <button 
                          onClick={() => setSelectedRawLog(null)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-white hover:bg-red-500 transition-colors"
                        >
                          &times;
                        </button>
                    </div>
                    <div className="p-6 overflow-y-auto flex-grow bg-gray-950">
                        <pre className="text-emerald-400 font-mono text-xs whitespace-pre-wrap">
                            {JSON.stringify(selectedRawLog, null, 2)}
                        </pre>
                    </div>
                    <div className="p-4 border-t border-gray-800 flex justify-end">
                        <button 
                          onClick={() => setSelectedRawLog(null)}
                          className="px-6 py-2 bg-[var(--primaryColor)] text-white rounded-lg font-bold"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
