export function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between"><div className="text-slate-600">{label}</div><div>{value}</div></div>
  );
}
