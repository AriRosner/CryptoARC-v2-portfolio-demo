import type {
  BacktestResult,
  DataIntegrityReport,
  DataSummary,
  LiveExecutionAudit,
  LiveExecutionRequest,
  OperationalMonitoring,
  PerformanceAnalytics,
  PriceDiagnostics,
  PumpFunReport,
  ReadinessStatus,
  SafetyStatus,
  SecurityStatus,
  SettingsVersion,
  SolanaStatus,
  SourceAdapterStatus,
  SourceEvent,
  SourceHealth,
  StrategyDecisionRecord,
  TradeEvent,
  TradeLabel,
  TradeRecord,
  TradeReviewDetail,
  TradeSession,
  TuningSuggestion,
  WatchdogStatus,
  LiveLedger,
  LivePosition,
  TokenSignal,
  ExperimentRun
} from "./types";

const now = Date.now();
const isoMinutesAgo = (minutes: number) => new Date(now - minutes * 60_000).toISOString();
const isoHoursAgo = (hours: number) => new Date(now - hours * 3_600_000).toISOString();

export const demoStats = {
  total_trades: 42,
  closed_trades: 35,
  wins: 24,
  losses: 8,
  scratches: 3,
  win_rate_pct: 68.6,
  total_pnl_sol: 1.3842,
  open_positions: 2,
  best_trade_sol: 0.241,
  worst_trade_sol: -0.063,
  scratch_threshold_sol: 0.001
} as any;

export const demoTokens = [
  {
    id: "tok_arc_1",
    symbol: "ARCX",
    name: "Arc Reactor Index",
    mint: "6uD7H3kWf8YvX9ZdemoArcx4BvLmP7Q2nSjR8pA1C",
    creator: "ArCreaTor11111111111111111111111111111111",
    status: "paper_bought",
    score: 84,
    pnl_sol: 0.1842,
    age_seconds: 312,
    success_rate_pct: 73,
    hold_duration_seconds: 294,
    slippage_paid_pct: 0.82,
    fee_paid_sol: 0.0014,
    price_impact_pct: 1.12,
    ticks_held: 18,
    honeypot_risk: false,
    rug_risk: false,
    creator_hold_pct: 4.8,
    metadata_score: 0.93,
    bonding_curve: "pump bonding curve",
    metadata_uri: "https://demo.cryptoarc.dev/meta/arcx.json",
    buy_velocity: 0.79,
    sell_pressure: 0.22,
    initial_buy_sol: 12.43,
    market_cap_sol: 182.6,
    observed_price_updates: 148,
    price_source: "market_cap",
    price_confidence: 0.94,
    last_observed_trade_at: isoMinutesAgo(2),
    decision_log: ["Metadata complete", "Strong creator diversification", "Buy velocity above profile floor"],
    score_breakdown: ["Metadata +22", "Momentum +28", "Pressure +16", "Creator +18"],
    entry_reason: "Promoted by balanced profile after strong early demand.",
    exit_reason: "",
    intelligence_tags: ["metadata-complete", "wallet-cluster-clean", "momentum-strong"],
    entry_risk_filters: ["creator concentration clear", "sell pressure under cap"],
    reason: "High-conviction launch candidate"
  },
  {
    id: "tok_arc_2",
    symbol: "NOVA",
    name: "Nova Liquidity Grid",
    mint: "NoVaDemoMint111111111111111111111111111111",
    creator: "NoVaCreator1111111111111111111111111111111",
    status: "analyzing",
    score: 71,
    pnl_sol: 0,
    age_seconds: 96,
    success_rate_pct: 61,
    hold_duration_seconds: 0,
    slippage_paid_pct: 0,
    fee_paid_sol: 0,
    price_impact_pct: 0,
    ticks_held: 0,
    honeypot_risk: false,
    rug_risk: false,
    creator_hold_pct: 7.2,
    metadata_score: 0.81,
    bonding_curve: "pump bonding curve",
    metadata_uri: "https://demo.cryptoarc.dev/meta/nova.json",
    buy_velocity: 0.62,
    sell_pressure: 0.31,
    initial_buy_sol: 6.12,
    market_cap_sol: 98.4,
    observed_price_updates: 54,
    price_source: "direct",
    price_confidence: 0.88,
    last_observed_trade_at: isoMinutesAgo(1),
    decision_log: ["Price feed healthy", "Monitoring for confirmation"],
    score_breakdown: ["Metadata +20", "Momentum +23", "Pressure +12", "Creator +16"],
    entry_reason: "",
    exit_reason: "",
    intelligence_tags: ["price-healthy", "candidate"],
    entry_risk_filters: ["awaiting second velocity confirmation"],
    reason: "Potential follow-up candidate"
  },
  {
    id: "tok_arc_3",
    symbol: "GLYPH",
    name: "Glyph Router",
    mint: "GlYPhDemoMint11111111111111111111111111111",
    creator: "GlYphCreator111111111111111111111111111111",
    status: "skipped",
    score: 42,
    pnl_sol: -0.012,
    age_seconds: 428,
    success_rate_pct: 29,
    hold_duration_seconds: 0,
    slippage_paid_pct: 0,
    fee_paid_sol: 0,
    price_impact_pct: 0,
    ticks_held: 0,
    honeypot_risk: false,
    rug_risk: true,
    creator_hold_pct: 26.4,
    metadata_score: 0.54,
    bonding_curve: "",
    metadata_uri: "",
    buy_velocity: 0.17,
    sell_pressure: 0.74,
    initial_buy_sol: 1.88,
    market_cap_sol: 24.1,
    observed_price_updates: 16,
    price_source: "direct",
    price_confidence: 0.52,
    last_observed_trade_at: isoMinutesAgo(6),
    decision_log: ["Creator concentration too high", "Sell pressure above policy cap"],
    score_breakdown: ["Metadata +12", "Momentum +9", "Pressure +4", "Creator +17"],
    entry_reason: "",
    exit_reason: "",
    intelligence_tags: ["creator-heavy", "sell-pressure-risk"],
    entry_risk_filters: ["creator concentration exceeded", "sell pressure exceeded"],
    reason: "Skipped for creator concentration and sell pressure"
  },
  {
    id: "tok_arc_4",
    symbol: "PULSE",
    name: "Pulse Scan Mesh",
    mint: "PuLSEDemoMint11111111111111111111111111111",
    creator: "PuLSECreator11111111111111111111111111111",
    status: "paper_sold",
    score: 78,
    pnl_sol: 0.0926,
    age_seconds: 1180,
    success_rate_pct: 67,
    hold_duration_seconds: 512,
    slippage_paid_pct: 0.63,
    fee_paid_sol: 0.0012,
    price_impact_pct: 0.76,
    ticks_held: 29,
    honeypot_risk: false,
    rug_risk: false,
    creator_hold_pct: 5.5,
    metadata_score: 0.89,
    bonding_curve: "pump bonding curve",
    metadata_uri: "https://demo.cryptoarc.dev/meta/pulse.json",
    buy_velocity: 0.68,
    sell_pressure: 0.28,
    initial_buy_sol: 8.92,
    market_cap_sol: 146.8,
    observed_price_updates: 132,
    price_source: "market_cap",
    price_confidence: 0.91,
    last_observed_trade_at: isoMinutesAgo(10),
    decision_log: ["TP ladder completed", "Exit confirmed on momentum fade"],
    score_breakdown: ["Metadata +24", "Momentum +24", "Pressure +14", "Creator +16"],
    entry_reason: "Entered after pump acceleration and clean metadata.",
    exit_reason: "Partial take profit ladder completed.",
    intelligence_tags: ["tp-complete", "high-quality"],
    entry_risk_filters: ["all checks clear"],
    reason: "Closed winner"
  },
  {
    id: "tok_arc_5",
    symbol: "VEIL",
    name: "Veil Order Mirror",
    mint: "VeiLDemoMint111111111111111111111111111111",
    creator: "VeilCreator111111111111111111111111111111",
    status: "monitoring",
    score: 76,
    pnl_sol: -0.0213,
    age_seconds: 644,
    success_rate_pct: 58,
    hold_duration_seconds: 388,
    slippage_paid_pct: 1.21,
    fee_paid_sol: 0.0011,
    price_impact_pct: 1.54,
    ticks_held: 22,
    honeypot_risk: false,
    rug_risk: false,
    creator_hold_pct: 8.1,
    metadata_score: 0.79,
    bonding_curve: "pump bonding curve",
    metadata_uri: "https://demo.cryptoarc.dev/meta/veil.json",
    buy_velocity: 0.57,
    sell_pressure: 0.47,
    initial_buy_sol: 4.74,
    market_cap_sol: 88.3,
    observed_price_updates: 84,
    price_source: "direct",
    price_confidence: 0.83,
    last_observed_trade_at: isoMinutesAgo(4),
    decision_log: ["Position open", "Watching for break-even stop"],
    score_breakdown: ["Metadata +18", "Momentum +25", "Pressure +15", "Creator +18"],
    entry_reason: "Paper entry promoted from watchlist candidate.",
    exit_reason: "",
    intelligence_tags: ["watchlist", "risk-monitor"],
    entry_risk_filters: ["volume clear"],
    reason: "Open position"
  },
  {
    id: "tok_arc_6",
    symbol: "ORBIT",
    name: "Orbit Depth Relay",
    mint: "OrBiTDemoMint11111111111111111111111111111",
    creator: "OrBiTCreator11111111111111111111111111111",
    status: "detected",
    score: 63,
    pnl_sol: 0,
    age_seconds: 38,
    success_rate_pct: 49,
    hold_duration_seconds: 0,
    slippage_paid_pct: 0,
    fee_paid_sol: 0,
    price_impact_pct: 0,
    ticks_held: 0,
    honeypot_risk: false,
    rug_risk: false,
    creator_hold_pct: 9.7,
    metadata_score: 0.72,
    bonding_curve: "pump bonding curve",
    metadata_uri: "https://demo.cryptoarc.dev/meta/orbit.json",
    buy_velocity: 0.44,
    sell_pressure: 0.33,
    initial_buy_sol: 3.15,
    market_cap_sol: 54.9,
    observed_price_updates: 8,
    price_source: "direct",
    price_confidence: 0.79,
    last_observed_trade_at: isoMinutesAgo(1),
    decision_log: ["Token detected", "Awaiting score confirmation"],
    score_breakdown: ["Metadata +17", "Momentum +21", "Pressure +11", "Creator +14"],
    entry_reason: "",
    exit_reason: "",
    intelligence_tags: ["new-launch"],
    entry_risk_filters: ["pending"],
    reason: "New launch detected"
  }
] as unknown as TokenSignal[];

export const demoTrades = [
  {
    id: "trade_demo_1",
    token_id: "tok_arc_4",
    strategy_profile: "balanced",
    lifecycle_status: "closed",
    pnl_sol: 0.0926,
    opened_at: isoHoursAgo(6),
    closed_at: isoHoursAgo(5.85),
    hold_duration_seconds: 512,
    entry_price: 0.00000412,
    exit_price: 0.00000587,
    amount_sol: 0.12,
    entry_reason: "Promoted from queue after confidence lift",
    exit_reason: "Partial take profit ladder completed",
    settings_version_id: "set_demo_2",
    source_price_confidence: 0.91
  },
  {
    id: "trade_demo_2",
    token_id: "tok_arc_1",
    strategy_profile: "balanced",
    lifecycle_status: "closed",
    pnl_sol: 0.1842,
    opened_at: isoHoursAgo(2.5),
    closed_at: isoHoursAgo(2.3),
    hold_duration_seconds: 294,
    entry_price: 0.00000398,
    exit_price: 0.00000611,
    amount_sol: 0.14,
    entry_reason: "Strong creator diversity and velocity",
    exit_reason: "Trailing stop locked profit",
    settings_version_id: "set_demo_3",
    source_price_confidence: 0.94
  },
  {
    id: "trade_demo_3",
    token_id: "tok_arc_5",
    strategy_profile: "balanced",
    lifecycle_status: "open",
    pnl_sol: -0.0213,
    opened_at: isoHoursAgo(1.5),
    closed_at: null,
    hold_duration_seconds: 388,
    entry_price: 0.00000517,
    exit_price: null,
    amount_sol: 0.09,
    entry_reason: "Watchlist promotion with favorable setup",
    exit_reason: "",
    settings_version_id: "set_demo_3",
    source_price_confidence: 0.83
  },
  {
    id: "trade_demo_4",
    token_id: "tok_arc_3",
    strategy_profile: "conservative",
    lifecycle_status: "closed",
    pnl_sol: -0.0478,
    opened_at: isoHoursAgo(9),
    closed_at: isoHoursAgo(8.9),
    hold_duration_seconds: 146,
    entry_price: 0.0000048,
    exit_price: 0.00000374,
    amount_sol: 0.08,
    entry_reason: "Momentum entry before sell pressure spike",
    exit_reason: "Stop loss after sell pressure expansion",
    settings_version_id: "set_demo_1",
    source_price_confidence: 0.68
  }
] as unknown as TradeRecord[];

export const demoPnlHistory = [0, 0.06, 0.11, 0.08, 0.19, 0.27, 0.31, 0.29, 0.42, 0.61, 0.74, 0.93, 1.08, 1.22, 1.31, 1.38];

export const demoAnalytics = {
  by_strategy: [
    { label: "Balanced", pnl_sol: 1.02, win_rate_pct: 71.2 },
    { label: "Conservative", pnl_sol: 0.28, win_rate_pct: 63.5 },
    { label: "Aggressive", pnl_sol: 0.08, win_rate_pct: 49.5 }
  ]
} as unknown as PerformanceAnalytics;

export const demoSuggestions = [
  {
    title: "Raise sell pressure sensitivity",
    setting: "sell_pressure_exit_threshold",
    confidence: 0.82,
    suggested_value: 0.58,
    reason: "Recent losers clustered around late sell-pressure recognition."
  },
  {
    title: "Shorten stalled-trade window",
    setting: "stalled_trade_seconds",
    confidence: 0.74,
    suggested_value: 75,
    reason: "Flat trades are tying up capital longer than needed in the replay sample."
  },
  {
    title: "Increase score threshold slightly",
    setting: "score_threshold",
    confidence: 0.68,
    suggested_value: 65,
    reason: "Mid-quality entries underperformed the current winners during the mock sample."
  }
] as unknown as TuningSuggestion[];

export const demoPriceDiagnostics = {
  acceptance_rate: 0.992,
  impossible_jump_warnings: 1,
  observations: 1842
} as unknown as PriceDiagnostics;

export const demoPumpfunReport = {
  creator_reuse_rate: 0.11,
  metadata_coverage: 0.89
} as unknown as PumpFunReport;

export const demoSafetyStatus = {
  entries_allowed: true,
  stop_reasons: ["Manual live remains disabled in portfolio demo"]
} as unknown as SafetyStatus;

export const demoReadiness = {
  engine_version: "readiness-v1",
  score: 96,
  status: "ready",
  entries_allowed: true,
  gates: [],
  recommended_actions: ["Continue collecting representative sessions before changing live caps."],
  sample_size: { closed_trades: 35, source_events: 5000 },
  paper_only: true
} as unknown as ReadinessStatus;

export const demoBacktests = [
  {
    id: "bt_demo_1",
    created_at: isoHoursAgo(4),
    profile: "balanced",
    tokens_replayed: 220,
    estimated_pnl_sol: 0.8421,
    win_rate_pct: 67.3,
    paper_buys: 28,
    skips: 144
  },
  {
    id: "bt_demo_2",
    created_at: isoHoursAgo(16),
    profile: "conservative",
    tokens_replayed: 160,
    estimated_pnl_sol: 0.3918,
    win_rate_pct: 62.1,
    paper_buys: 21,
    skips: 117
  },
  {
    id: "bt_demo_3",
    created_at: isoHoursAgo(28),
    profile: "aggressive",
    tokens_replayed: 240,
    estimated_pnl_sol: 0.1184,
    win_rate_pct: 51.4,
    paper_buys: 34,
    skips: 133
  }
] as unknown as BacktestResult[];

export const demoExperiments = [
  {
    id: "exp_demo_1",
    name: "Balanced replay baseline",
    created_at: isoHoursAgo(4),
    notes: "Representative mock paper session."
  }
] as unknown as ExperimentRun[];

export const demoReviewTimeline = [
  { at: isoHoursAgo(2.5), type: "source", title: "Launch observed", detail: "PumpPortal normalized launch entered the queue." },
  { at: isoHoursAgo(2.48), type: "decision", title: "Entry approved", detail: "Balanced profile score crossed the configured threshold." },
  { at: isoHoursAgo(2.46), type: "trade", title: "Paper buy filled", detail: "Mock execution filled with modeled fees and slippage." },
  { at: isoHoursAgo(2.36), type: "price", title: "Trailing stop armed", detail: "Observed price momentum locked in the break-even floor." },
  { at: isoHoursAgo(2.3), type: "trade", title: "Paper sell closed", detail: "Trailing stop exited into strength and captured the move." }
];

export const demoReviewDetail = {
  trade: demoTrades[1],
  token: demoTokens[0],
  timeline: demoReviewTimeline,
  decisions: [
    {
      id: "dec_demo_1",
      action: "buy",
      allowed: true,
      score: 84,
      reason: "Queue promotion after velocity and metadata checks passed.",
      score_breakdown: ["Metadata +22", "Momentum +28", "Pressure +16", "Creator +18"],
      decision_log: ["Launch normalized", "Metadata complete", "Creator concentration low"]
    }
  ],
  observations: [
    { id: "obs1", accepted: true },
    { id: "obs2", accepted: true },
    { id: "obs3", accepted: true },
    { id: "obs4", accepted: false }
  ],
  pnl_breakdown: {
    final_pnl_sol: 0.1842,
    net_before_fees_estimate: 0.1861,
    fees_sol: 0.0014,
    slippage_pct: 0.82
  }
} as unknown as TradeReviewDetail;

export const demoTradeLabels = [
  { id: "lbl_demo_1", token_id: "tok_arc_1", label: "good_entry", note: "" }
] as unknown as TradeLabel[];

export const demoSettingsVersions = [
  { id: "set_demo_1", created_at: isoHoursAgo(24), label: "Conservative sweep" },
  { id: "set_demo_2", created_at: isoHoursAgo(8), label: "Balanced refinement" },
  { id: "set_demo_3", created_at: isoHoursAgo(3), label: "Momentum tuning" }
] as unknown as SettingsVersion[];

export const demoDataSummary = {
  tokens: 241,
  events: 512,
  source_events: 5000,
  trades: 35,
  strategy_decisions: 2287,
  price_observations: 5000
} as unknown as DataSummary;

export const demoSourceHealth = {
  health_score: 100,
  status_message: "idle",
  normalized_ratio: 0.955,
  events_per_minute: 0
} as unknown as SourceHealth;

export const demoSecurity = {
  paper_only: true,
  dashboard_auth_enabled: true,
  totp_enabled: false
} as unknown as SecurityStatus;

export const demoDataIntegrity = {
  score: 92,
  issues: [
    { severity: "info", message: "Rejected price observations require review", count: 13 },
    { severity: "info", message: "Some trades have no matching price observation history", count: 3 }
  ]
} as unknown as DataIntegrityReport;

export const demoOpsMonitoring = {
  backend: { status: "running", bot_status: "running" },
  recent_errors: [],
  recent_warnings: [
    { id: "warn_demo_1", created_at: isoMinutesAgo(18), message: "Manual live remains capability-gated in demo mode", level: "warning" }
  ]
} as unknown as OperationalMonitoring;

export const demoSourceAdapters = [
  { name: "pumpportal", status: "available", enabled: true, confidence: 0.96 },
  { name: "mock", status: "available", enabled: true, confidence: 0.99 }
] as unknown as SourceAdapterStatus[];

export const demoWatchdog = {
  status: "ok",
  tick_age_seconds: 1,
  launch_ingestion_age_seconds: 24
} as unknown as WatchdogStatus;

export const demoSolana = {
  configured: true,
  health: "ok",
  wallet_address: "DemoReadOnlyWallet1111111111111111111111111",
  balance_sol: 14.281,
  read_only: true
} as unknown as SolanaStatus;

export const demoLiveRequests = [
  { id: "livereq_demo_1", created_at: isoHoursAgo(1), action: "buy", amount_sol: 0.03, status: "reviewed" }
] as unknown as LiveExecutionRequest[];

export const demoLiveAudit = [
  {
    id: "audit_demo_1",
    created_at: isoHoursAgo(1),
    action: "buy",
    mint: demoTokens[0].mint,
    status: "confirmed",
    final_status: "confirmed",
    transaction_signature: "5u8HxDemoSignature111111111111111111111111111111"
  }
] as unknown as LiveExecutionAudit[];

export const demoAuditEvents = [
  { id: "evt_demo_1", created_at: isoMinutesAgo(40), level: "info", message: "Portfolio demo loaded representative dataset." },
  { id: "evt_demo_2", created_at: isoMinutesAgo(18), level: "warning", message: "Manual live path is showcased visually only in this build." },
  { id: "evt_demo_3", created_at: isoMinutesAgo(8), level: "success", message: "Replay health checks completed across the current scenario." }
] as unknown as TradeEvent[];

export const demoSourceEvents = [
  { id: "src_demo_1", received_at: isoHoursAgo(2), status: "normalized" },
  { id: "src_demo_2", received_at: isoHoursAgo(1.5), status: "trade" }
] as unknown as SourceEvent[];

export const demoPriceObservations = [
  { id: "po_demo_1", observed_at: isoHoursAgo(2), mint: demoTokens[0].mint, accepted: true },
  { id: "po_demo_2", observed_at: isoHoursAgo(1.9), mint: demoTokens[0].mint, accepted: true }
] as unknown as any[];

export const demoStrategyDecisions = [
  { id: "sd_demo_1", token_id: demoTokens[0].id, action: "buy", score: 84, allowed: true, reason: "Strong candidate" }
] as unknown as StrategyDecisionRecord[];

export const demoTradeSessions = [
  { id: "ts_demo_1", created_at: isoHoursAgo(3), label: "Morning session" }
] as unknown as TradeSession[];

export const demoLivePositions = [
  { mint: demoTokens[4].mint, symbol: demoTokens[4].symbol, token_balance: 128442, estimated_value_sol: 0.071, source: "wallet", warning: "" }
] as unknown as LivePosition[];

export const demoLiveLedger = {
  positions: [
    {
      id: "ledger_demo_1",
      created_at: isoHoursAgo(1.5),
      updated_at: isoMinutesAgo(12),
      mint: demoTokens[4].mint,
      wallet_public_key: "DemoWalletPublicKey111111111111111111111111111",
      symbol: demoTokens[4].symbol,
      status: "open",
      token_balance: 128442,
      total_fees_sol: 0.0011,
      total_priority_fees_sol: 0.0003,
      fills: [],
      reconciliation_status: "ok",
      reconciliation: {},
      review_notes: "",
      realized_pnl_sol: 0.024,
      unrealized_pnl_sol: 0.017,
      cost_basis_sol: 0.09
    }
  ],
  summary: {
    realized_pnl_sol: 0.024,
    unrealized_pnl_sol: 0.017,
    cost_basis_sol: 0.09,
    open_positions: 1,
    approximate: true
  }
} as unknown as LiveLedger;
