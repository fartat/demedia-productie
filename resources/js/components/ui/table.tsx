import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tableVariants = cva(
    "w-full border-collapse text-sm",
    {
        variants: {
            variant: {
                default: "",
                bordered: "border rounded-lg overflow-hidden [&_th]:border-b [&_td]:border-b",
                striped:
                    "[&_tbody_tr:nth-child(odd)]:bg-muted [&_tbody_tr:hover]:bg-muted/70 transition-colors",
            },
            density: {
                normal: "[&_th]:px-4 [&_th]:py-2.5 [&_td]:px-4 [&_td]:py-2.5",
                compact: "[&_th]:px-3 [&_th]:py-1.5 [&_td]:px-3 [&_td]:py-1.5 text-xs",
            },
        },
        defaultVariants: {
            variant: "default",
            density: "normal",
        },
    }
)

type TableProps = React.TableHTMLAttributes<HTMLTableElement> &
    VariantProps<typeof tableVariants>

function Table({ className, variant, density, ...props }: TableProps) {
    return (
        <div className="relative w-full overflow-x-auto">
            <table
                className={cn(tableVariants({ variant, density }), className)}
                {...props}
            />
        </div>
    )
}

function TableHeader(props: React.HTMLAttributes<HTMLTableSectionElement>) {
    return <thead className="[&_th]:text-left [&_th]:font-medium" {...props} />
}

function TableBody(props: React.HTMLAttributes<HTMLTableSectionElement>) {
    return <tbody {...props} />
}

function TableRow(props: React.HTMLAttributes<HTMLTableRowElement>) {
    return (
        <tr
            className={cn(
                "border-b last:border-0",
                // bonus: hover state pentru row
                "data-[clickable=true]:cursor-pointer data-[clickable=true]:hover:bg-muted/60"
            )}
            {...props}
        />
    )
}

function TableHeadCell(props: React.ThHTMLAttributes<HTMLTableCellElement>) {
    return (
        <th
            className="text-xs uppercase tracking-wide text-muted-foreground"
            {...props}
        />
    )
}

function TableCell(props: React.TdHTMLAttributes<HTMLTableCellElement>) {
    return <td className="align-middle" {...props} />
}

export { Table, TableHeader, TableBody, TableRow, TableHeadCell, TableCell }
