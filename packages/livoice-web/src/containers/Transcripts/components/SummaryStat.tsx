type SummaryStatProps = {
  label: string;
  value: string | number;
};

export const SummaryStat = ({ label, value }: SummaryStatProps) => (
  <div className="rounded-2xl border border-slate-100 bg-white/70 px-4 py-3 shadow-sm">
    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">{label}</p>
    <p className="text-2xl font-semibold text-slate-900">{value.toString()}</p>
  </div>
);
