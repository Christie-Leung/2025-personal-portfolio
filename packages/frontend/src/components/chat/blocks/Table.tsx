import type { TableBlock } from "~/generated/models/TableBlock";
import Typewriter from "./Typewriter";

const Table = ({ headers, rows, disabled = false }: TableBlock & { disabled?: boolean }) => {
  return (
    <div className="w-full overflow-x-auto mb-10">
      <table className="w-full border-collapse rounded-xl">
        <thead className="border-b border-border">
          <tr>
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wide text-primary"
              >
                <Typewriter text={h} disabled={disabled} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri} className="not-last:border-b not-last:border-border/30">
              {r.map((cell, ci) => (
                <td key={ci} className="px-3 py-2 text-sm text-primary">
                  <Typewriter text={cell} disabled={disabled} />
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
