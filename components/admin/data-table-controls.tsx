"use client";

import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Input, Select } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface DataTableControlsProps {
  search: string;
  setSearch: (value: string) => void;
  category?: string;
  setCategory?: (value: string) => void;
  categories?: string[];
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  placeholder?: string;
}

export function DataTableControls({
  search,
  setSearch,
  category,
  setCategory,
  categories,
  page,
  setPage,
  totalPages,
  placeholder = "Search...",
}: DataTableControlsProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-4">
      <div className="flex flex-1 items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search size={18} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder}
            className="pl-10"
          />
        </div>
        {categories && setCategory && category !== undefined && (
          <Select value={category} onChange={(e) => setCategory(e.target.value)} className="w-40">
            <option value="All">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </Select>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground mr-2">
            Page {page} of {totalPages}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page <= 1}
          >
            <ChevronLeft size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      )}
    </div>
  );
}
