import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Catalog, Locale } from "@/app/catalogs/types";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { CatalogForm } from "./catalog-form";
import { useCatalogs } from "../contexts/catalogs-context";
import Link from "next/link";

export const columns: ColumnDef<Catalog>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "vertical",
    header: ({ column }) => {
      return (
        <Link
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="pr-2 flex flex-row w-full justify-start "
          href={""}
        >
          <CaretSortIcon className=" h-4 w-4" />
          Vertical
        </Link>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("vertical")}</div>
    ),
  },
  {
    accessorKey: "isPrimary",
    header: "Primary",
    cell: ({ row }) => {
      const val = row.getValue("isPrimary") as boolean;
      return <div>{val ? "Primary" : "Non Primary"}</div>;
    },
  },
  {
    accessorKey: "locales",
    header: "Locales",
    filterFn: (row, columnId) => {
      const locales = row.getValue(columnId);
      return Array.isArray(locales) && locales.length > 1;
    },
    cell: ({ row }) => {
      const val = row.getValue("locales") as Locale[];
      return <div>{val.length > 1 ? "Multi-Local" : "Non-Multi"}</div>;
    },
  },
  {
    accessorKey: "indexedAt",
    header: () => <div className="">indexedAt</div>,
    cell: ({ row }) => {
      const condition = isNaN(Date.parse(row.getValue("indexedAt")));

      if (condition) {
        return <div className=" font-medium">Not indexed</div>;
      }
      const date = new Date(row.getValue("indexedAt"));
      const formattedDate = date.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      return <div className=" font-medium">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const catalog = row.original;
      const { deleteCatalog } = useCatalogs();
      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => deleteCatalog(catalog._id)}>
                Delete Catalog
              </DropdownMenuItem>
              <DialogTrigger>
                <DropdownMenuItem>Edit Catalog</DropdownMenuItem>{" "}
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Catalog</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <CatalogForm createMode={false} catalog={catalog}></CatalogForm>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
