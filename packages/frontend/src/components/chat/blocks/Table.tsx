import type { TableBlock } from "@/generated/models/TableBlock";

const Table = ({ headers, rows }: TableBlock) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse rounded-xl">
        <thead>
          <tr className="bg-zinc-900/60">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-zinc-300"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className="odd:bg-zinc-900/20">
              {r.map((cell, ci) => (
                <td key={ci} className="px-3 py-2 text-sm text-zinc-200">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
