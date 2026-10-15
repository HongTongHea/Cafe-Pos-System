import { useCallback, useMemo, useRef } from "react";
import $ from "jquery";
import DataTableLib from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";

DataTableLib.use($);

export default function DataTable({
    columns,
    renderRow,
    data,
    pageLength = 10,
    searchPlaceholder = "Search...",
    nonSortableColumns = [],
}) {
    const dtRef = useRef(null);
    // Callback ref: fires with `node` on mount, `null` right before unmount.
    // Combined with `key` below, this fires fresh every time `data` changes.
    const tableCallbackRef = useCallback(
        (node) => {
            if (node) {
                // Guard: if this node somehow already has a DataTable
                // attached (e.g. StrictMode's synthetic double-mount),
                // tear it down before creating a new one.
                if ($.fn.DataTable.isDataTable(node)) {
                    $(node).DataTable().destroy();
                }

                dtRef.current = new DataTableLib(node, {
                    paging: true,
                    searching: true,
                    info: true,
                    lengthChange: true,
                    ordering: false,
                    lengthMenu: [10, 15, 25, 50, 100],
                    pageLength,
                    order: [],
                    destroy: true, // belt-and-suspenders: allow safe re-init on this node
                    columnDefs: [{ orderable: false, targets: nonSortableColumns }],
                    dom: '<"dt-toolbar"lf>rt<"dt-footer"ip>',
                    language: {
                        search: "",
                        searchPlaceholder,
                        info: "Showing _START_–_END_ of _TOTAL_",
                        infoEmpty: "No results found",
                        paginate: { previous: "‹", next: "›" },
                        emptyTable: "No data to show",
                        lengthMenu: "Show _MENU_",
                    },
                });
            } else {
                if (dtRef.current) {
                    dtRef.current.destroy();
                    dtRef.current = null;
                }
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
    // Changes whenever the row *content* changes (not just length),
    // so React fully unmounts/remounts the <table> node.
    const remountKey = useMemo(
        () => data.map((item) => JSON.stringify(item)).join("|"),
        [data]
    );

    return (
        <div className="table-wrap dt-clean">
            <table
                key={remountKey}
                ref={tableCallbackRef}
                className="display"
                style={{ width: "100%" }}
            >
                <thead>
                    <tr>
                        {columns.map((col, i) => (
                            <th key={i}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>{data.map((item) => renderRow(item))}</tbody>
            </table>
        </div>
    );
}