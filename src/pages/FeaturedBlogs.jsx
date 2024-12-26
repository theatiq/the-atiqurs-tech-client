import React, { useMemo } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

const FeaturedBlogs = () => {
  const allBlogs = useLoaderData();

  // Define Table Columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "index",
        header: "#",
        cell: (info) => info.row.index + 1, // Index column
      },
      {
        accessorKey: "image",
        header: "Thumbnail",
        cell: (info) => (
          <img
            src={info.getValue()}
            alt="Thumbnail"
            className="w-10 h-10 rounded-full mx-auto"
          />
        ),
      },
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "longDescription",
        header: "Description",
        cell: (info) => (
          <div 
            className="truncate description-cell" 
            title={info.getValue()}
          >
            {info.getValue()}
          </div>
        ),
      },
      {
        accessorKey: "postedDate",
        header: "Posted On",
      },
      {
        accessorKey: "category",
        header: "Category",
      },
    ],
    []
  );

  // Table Instance
  const [sorting, setSorting] = React.useState([]);
  const table = useReactTable({
    data: allBlogs,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold text-center mb-5">
        Featured Blogs ({allBlogs.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="p-3 border border-gray-300 text-left cursor-pointer"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted()
                      ? header.column.getIsSorted() === "asc"
                        ? " 🔼"
                        : " 🔽"
                      : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-3 border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
