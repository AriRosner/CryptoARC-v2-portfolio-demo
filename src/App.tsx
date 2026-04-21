import React from "react";
import { Activity, Lock, Sparkles, Wallet } from "lucide-react";
import { AppLayout } from "./components/AppLayout";
import { Modal } from "./components/Modal";
import { Button } from "./components/Button";
import { Badge } from "./components/Badge";
import { TokenDetail } from "./components/TokenDetail";
import { MonitorPage } from "./pages/MonitorPage";
import { AnalysisPage } from "./pages/AnalysisPage";
import { BacktestsPage } from "./pages/BacktestsPage";
import { ReviewPage } from "./pages/ReviewPage";
import { DataPage, type DataClearTarget } from "./pages/DataPage";
import "./styles.css";
import {
  demoAnalytics,
  demoAuditEvents,
  demoBacktests,
  demoDataIntegrity,
  demoDataSummary,
  demoExperiments,
  demoLiveAudit,
  demoLiveLedger,
  demoLivePositions,
  demoLiveRequests,
  demoOpsMonitoring,
  demoPnlHistory,
  demoPriceDiagnostics,
  demoPriceObservations,
  demoPumpfunReport,
  demoReadiness,
  demoReviewDetail,
  demoReviewTimeline,
  demoSafetyStatus,
  demoSecurity,
  demoSettingsVersions,
  demoSolana,
  demoSourceAdapters,
  demoSourceEvents,
  demoSourceHealth,
  demoStats,
  demoStrategyDecisions,
  demoSuggestions,
  demoTokens,
  demoTradeLabels,
  demoTradeSessions,
  demoTrades,
  demoWatchdog
} from "./demoData";

type WorkspacePage = "monitor" | "analysis" | "backtests" | "review" | "data";
type QueueFilter = "all" | "open" | "profitable" | "losses";
type QueueSort = "newest" | "score" | "pnl" | "creator";
type PnlWalletScope = "paper" | "live-demo";

const liveWallets = ["DemoWalletPublicKey111111111111111111111111111"];

function shortAddress(value: string): string {
  return value ? `${value.slice(0, 6)}...${value.slice(-4)}` : "not connected";
}

function buildReviewDetail(tokenId: string) {
  if (tokenId === demoReviewDetail.trade?.token_id) return demoReviewDetail;
  const trade = demoTrades.find((row) => row.token_id === tokenId) ?? demoTrades[0];
  const token = demoTokens.find((row) => row.id === tokenId) ?? demoTokens[0];
  return {
    ...demoReviewDetail,
    trade,
    token,
    timeline: demoReviewTimeline.map((item, index) => ({
      ...item,
      title: index === 1 ? `${token.symbol} scored for entry` : item.title
    })),
    decisions: [
      {
        ...demoReviewDetail.decisions[0],
        id: `decision-${tokenId}`,
        score: token.score,
        reason: token.entry_reason || token.reason
      }
    ],
    pnl_breakdown: {
      ...demoReviewDetail.pnl_breakdown,
      final_pnl_sol: trade.pnl_sol ?? 0
    }
  } as typeof demoReviewDetail;
}

export default function App() {
  const [workspacePage, setWorkspacePage] = React.useState<WorkspacePage>("monitor");
  const [status, setStatus] = React.useState<"running" | "stopped" | "starting" | "stopping">("running");
  const [apiState] = React.useState("connected");
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [walletOpen, setWalletOpen] = React.useState(false);
  const [selectedTokenId, setSelectedTokenId] = React.useState<string | null>(null);
  const [selectedReviewTradeId, setSelectedReviewTradeId] = React.useState<string | null>(demoTrades[1].token_id);
  const [tokenSearch, setTokenSearch] = React.useState("");
  const [queueFilter, setQueueFilter] = React.useState<QueueFilter>("all");
  const [queueSort, setQueueSort] = React.useState<QueueSort>("newest");
  const [hideSkippedTokens, setHideSkippedTokens] = React.useState(false);
  const [watchlist, setWatchlist] = React.useState<string[]>([demoTokens[0].mint, demoTokens[4].mint]);
  const [pnlTimeframe, setPnlTimeframe] = React.useState("all");
  const [pnlWallet, setPnlWallet] = React.useState<PnlWalletScope>("paper");
  const [pnlCurrency, setPnlCurrency] = React.useState<"SOL" | "USD">("SOL");
  const [latestBacktest, setLatestBacktest] = React.useState(demoBacktests[0]);
  const [backtestRuns, setBacktestRuns] = React.useState(demoBacktests);
  const [tradeLabels, setTradeLabels] = React.useState(demoTradeLabels);
  const [toasts, setToasts] = React.useState(demoAuditEvents.slice(-2));

  const selectedToken = demoTokens.find((token) => token.id === selectedTokenId) ?? null;
  const reviewDetail = React.useMemo(
    () => (selectedReviewTradeId ? buildReviewDetail(selectedReviewTradeId) : null),
    [selectedReviewTradeId]
  );

  const pushToast = React.useCallback((message: string, level = "info") => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const next = { id, created_at: new Date().toISOString(), message, level, token_id: "" };
    setToasts((current) => [next, ...current].slice(0, 4));
  }, []);

  const filteredTokens = React.useMemo(() => {
    const query = tokenSearch.trim().toLowerCase();
    return [...demoTokens]
      .filter((token) => {
        if (hideSkippedTokens && token.status === "skipped") return false;
        if (queueFilter === "open" && !["paper_bought", "monitoring", "buying"].includes(token.status)) return false;
        if (queueFilter === "profitable" && (token.pnl_sol ?? 0) <= 0) return false;
        if (queueFilter === "losses" && (token.pnl_sol ?? 0) >= 0) return false;
        if (!query) return true;
        return [token.symbol, token.name, token.mint, token.creator, token.reason]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(query);
      })
      .sort((left, right) => {
        if (queueSort === "score") return (right.score ?? 0) - (left.score ?? 0);
        if (queueSort === "pnl") return (right.pnl_sol ?? 0) - (left.pnl_sol ?? 0);
        if (queueSort === "creator") return String(left.creator).localeCompare(String(right.creator));
        return (left.age_seconds ?? 0) - (right.age_seconds ?? 0);
      });
  }, [hideSkippedTokens, queueFilter, queueSort, tokenSearch]);

  const handleStart = React.useCallback(() => {
    setStatus("starting");
    pushToast("Demo engine starting", "info");
    window.setTimeout(() => {
      setStatus("running");
      pushToast("Demo engine running with representative mock data", "success");
    }, 500);
  }, [pushToast]);

  const handleStop = React.useCallback(() => {
    setStatus("stopping");
    pushToast("Demo engine stopping", "warning");
    window.setTimeout(() => {
      setStatus("stopped");
      pushToast("Demo engine stopped", "warning");
    }, 500);
  }, [pushToast]);

  const rotateBacktest = React.useCallback((label: string) => {
    setBacktestRuns((current) => {
      const rotated = [...current.slice(1), current[0]];
      setLatestBacktest(rotated[0]);
      return rotated;
    });
    pushToast(`${label} completed against portfolio dataset`, "success");
  }, [pushToast]);

  const handleLabelTrade = React.useCallback(async (tokenId: string, label: string) => {
    setTradeLabels((current) => {
      const next = current.filter((item) => item.token_id !== tokenId);
      return [{ id: `label-${tokenId}`, token_id: tokenId, label, note: "" } as any, ...next];
    });
    pushToast(`Applied review label: ${label.replace(/_/g, " ")}`, "info");
  }, [pushToast]);

  const displayPnlValue = pnlWallet === "paper"
    ? demoStats.total_pnl_sol * (pnlCurrency === "USD" ? 164.25 : 1)
    : (demoLiveLedger.summary.realized_pnl_sol + demoLiveLedger.summary.unrealized_pnl_sol) * (pnlCurrency === "USD" ? 164.25 : 1);
  const pnlHistory = demoPnlHistory.map((value) => Number((value * (pnlCurrency === "USD" ? 164.25 : 1)).toFixed(pnlCurrency === "USD" ? 2 : 4)));

  return (
    <>
      <AppLayout
        activePage={workspacePage}
        setActivePage={setWorkspacePage}
        status={status}
        apiState={apiState}
        onStart={handleStart}
        onStop={handleStop}
        onSettingsOpen={() => setSettingsOpen(true)}
        onLiveWalletOpen={() => setWalletOpen(true)}
        walletPublicKey={liveWallets[0]}
        walletBalance={14.281}
        toasts={toasts}
      >
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded-2xl border border-[#00ffbd]/15 bg-[#081018]/80 px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          <Badge variant="info">Portfolio Demo</Badge>
          <div className="text-sm text-zinc-300">
            This build uses curated mock data and preserves the product story without exposing the production backend or strategy internals.
          </div>
        </div>

        {workspacePage === "monitor" ? (
          <MonitorPage
            stats={demoStats}
            pnlHistory={pnlHistory}
            pnlValue={displayPnlValue}
            pnlCurrency={pnlCurrency}
            pnlCurrencyLabel={pnlCurrency === "USD" ? "USD via mock SOL price: $164.25" : "SOL display"}
            solUsdPrice={164.25}
            onTogglePnlCurrency={() => setPnlCurrency((current) => current === "SOL" ? "USD" : "SOL")}
            pnlCaption={pnlWallet === "paper" ? "35 mock closed paper trades across the showcase dataset" : "1 mock live wallet position with approximate P&L"}
            liveWallets={liveWallets}
            walletPublicKey={liveWallets[0]}
            timeframe={pnlTimeframe}
            setTimeframe={setPnlTimeframe}
            pnlWallet={pnlWallet}
            setPnlWallet={setPnlWallet}
            tokens={filteredTokens}
            onSelectToken={setSelectedTokenId}
            selectedTokenId={selectedTokenId}
            watchlist={new Set(watchlist)}
            onToggleWatch={(token) => setWatchlist((current) => current.includes(token.mint) ? current.filter((mint) => mint !== token.mint) : [token.mint, ...current])}
            search={tokenSearch}
            setSearch={setTokenSearch}
            filter={queueFilter}
            setFilter={setQueueFilter}
            sort={queueSort}
            setSort={setQueueSort}
            hideSkipped={hideSkippedTokens}
            setHideSkipped={setHideSkippedTokens}
            apiState={apiState}
          />
        ) : null}

        {workspacePage === "analysis" ? (
          <AnalysisPage
            tokens={demoTokens}
            trades={demoTrades}
            stats={demoStats}
            analytics={demoAnalytics}
            suggestions={demoSuggestions}
            priceDiagnostics={demoPriceDiagnostics}
            pumpfunReport={demoPumpfunReport}
            safetyStatus={demoSafetyStatus}
            readinessStatus={demoReadiness}
            pnlTimeframe={pnlTimeframe}
            onTimeframeChange={setPnlTimeframe}
            onApplySuggestion={async (suggestion) => pushToast(`Demo suggestion previewed: ${suggestion.title}`, "info")}
          />
        ) : null}

        {workspacePage === "backtests" ? (
          <BacktestsPage
            runs={backtestRuns}
            latest={latestBacktest}
            limit={220}
            profile="balanced"
            dateFrom="2026-04-01"
            dateTo="2026-04-20"
            speed="fast"
            onLimitChange={() => undefined}
            onProfileChange={() => undefined}
            onDateFromChange={() => undefined}
            onDateToChange={() => undefined}
            onSpeedChange={() => undefined}
            onRun={() => rotateBacktest("Replay backtest")}
            onRawReplay={() => rotateBacktest("Raw replay")}
            onCompare={() => pushToast("Strategy comparison opened for the portfolio dataset", "info")}
            onABReplay={() => pushToast("A/B replay staged with mock sessions", "info")}
            onRunV3={() => rotateBacktest("Backtest suite V3")}
            onSaveExperiment={() => pushToast("Experiment saved to the portfolio scenario board", "success")}
            v3Result={null}
            experiments={demoExperiments}
          />
        ) : null}

        {workspacePage === "review" ? (
          <ReviewPage
            trades={demoTrades}
            versions={demoSettingsVersions}
            tokens={demoTokens}
            analytics={demoAnalytics}
            suggestions={demoSuggestions}
            selectedTradeId={selectedReviewTradeId}
            timeline={demoReviewTimeline}
            detail={reviewDetail}
            labels={tradeLabels}
            onLabelTrade={handleLabelTrade}
            onSelectTrade={async (tokenId) => setSelectedReviewTradeId(tokenId)}
            onApplySuggestion={async (suggestion) => pushToast(`Demo tuning change reviewed: ${suggestion.setting}`, "info")}
          />
        ) : null}

        {workspacePage === "data" ? (
          <DataPage
            summary={demoDataSummary}
            sourceEvents={demoSourceEvents}
            sourceHealth={demoSourceHealth}
            securityStatus={demoSecurity}
            trades={demoTrades}
            priceObservations={demoPriceObservations}
            strategyDecisions={demoStrategyDecisions}
            tradeSessions={demoTradeSessions}
            settingsVersions={demoSettingsVersions}
            dataIntegrity={demoDataIntegrity}
            priceDiagnostics={demoPriceDiagnostics}
            pumpfunReport={demoPumpfunReport}
            safetyStatus={demoSafetyStatus}
            readinessStatus={demoReadiness}
            opsMonitoring={demoOpsMonitoring}
            sourceAdapters={demoSourceAdapters}
            watchdogStatus={demoWatchdog}
            solanaStatus={demoSolana}
            liveRequests={demoLiveRequests}
            liveAudit={demoLiveAudit}
            auditEvents={demoAuditEvents}
            onRefresh={async () => pushToast("Portfolio dataset refreshed", "success")}
            onRecover={async () => pushToast("Mock watchdog recovery completed", "success")}
            onReviewLiveRequest={async (_requestId, reviewStatus) => pushToast(`Manual review marked ${reviewStatus}`, "info")}
            onClear={async (target: DataClearTarget) => pushToast(`Clear action previewed for ${target.replace(/_/g, " ")}`, "warning")}
          />
        ) : null}
      </AppLayout>

      <TokenDetail token={selectedToken} isOpen={!!selectedToken} onClose={() => setSelectedTokenId(null)} />

      <Modal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        title="Portfolio Demo Settings"
        description="Representative controls and guardrails shown for portfolio review."
        className="max-w-3xl"
      >
        <div className="space-y-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-zinc-300">
            This public demo intentionally avoids the real backend, private operational flows, and production strategy internals. It exists to show the product surface, operator UX, and overall system design.
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500">
                <Activity size={14} />
                Demo Controls
              </div>
              <div className="mt-4 space-y-3 text-sm text-zinc-300">
                <div className="flex items-center justify-between"><span>Strategy Profile</span><Badge variant="info">Balanced</Badge></div>
                <div className="flex items-center justify-between"><span>Score Threshold</span><span className="font-black text-white">62</span></div>
                <div className="flex items-center justify-between"><span>Max Open Positions</span><span className="font-black text-white">3</span></div>
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500">
                <Lock size={14} />
                Safety Boundary
              </div>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                <li>No private keys or signer material</li>
                <li>Manual live only in the real product</li>
                <li>Public demo runs on curated mock data</li>
              </ul>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="primary" onClick={() => setSettingsOpen(false)}>Close</Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={walletOpen}
        onClose={() => setWalletOpen(false)}
        title="Live Wallet Showcase"
        description="Browser-wallet workflow represented with mock audit data."
        className="max-w-3xl"
      >
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-xl border border-[#00ffbd]/15 bg-[#081018]/85 p-5">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#00ffbd]">
                <Wallet size={14} />
                Connected Demo Wallet
              </div>
              <div className="mt-3 font-mono text-sm text-white">{shortAddress(liveWallets[0])}</div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-zinc-500">Balance</span>
                <span className="font-black text-white">14.281 SOL</span>
              </div>
              <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-4 text-sm text-zinc-300">
                Manual browser-wallet signing is part of the real product direction. In this portfolio build, the flow is presented visually only with mock quote, simulation, and audit states.
              </div>
            </div>
            <div className="space-y-4 rounded-xl border border-white/10 bg-black/25 p-5">
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-500">
                <Sparkles size={14} />
                Capability Summary
              </div>
              <div className="space-y-3 text-sm text-zinc-300">
                <div className="flex items-center justify-between"><span>Manual signing</span><Badge variant="success">Available</Badge></div>
                <div className="flex items-center justify-between"><span>Unattended auto-sell</span><Badge variant="warning">Blocked</Badge></div>
                <div className="flex items-center justify-between"><span>Private key custody</span><Badge variant="danger">Unavailable</Badge></div>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-zinc-300">
            This demo repository is safe to share because it contains curated scenarios only. The production backend, live safeguards, and strategy implementation remain private.
          </div>
        </div>
      </Modal>
    </>
  );
}
