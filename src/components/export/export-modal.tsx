"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download } from "lucide-react";

interface ExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExportModal({ open, onOpenChange }: ExportModalProps) {
  const [format, setFormat] = useState<"csv" | "pdf">("csv");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    setIsLoading(true);
    const params = new URLSearchParams();
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);

    const url = `/api/export/${format}?${params.toString()}`;
    
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `payzen-${format === "csv" ? "transactions.csv" : "report.html"}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(downloadUrl);
      onOpenChange(false);
    } catch (error) {
      console.error("Export failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Transactions</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label>Format</Label>
            <Select onValueChange={(v) => setFormat(v as "csv" | "pdf")} defaultValue="csv">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">📄 CSV (Excel/Sheets)</SelectItem>
                <SelectItem value="pdf">📋 HTML Report (Print to PDF)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">From Date</Label>
              <Input id="startDate" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">To Date</Label>
              <Input id="endDate" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Leave dates empty to export all transactions.</p>

          <Button onClick={handleExport} disabled={isLoading} className="w-full">
            <Download className="mr-2 h-4 w-4" />
            {isLoading ? "Exporting..." : "Download Export"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
