"use client";
export const dynamic = 'force-dynamic';

import { useState } from "react";
import { useCards, useDeleteCard } from "@/hooks/use-cards";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CardForm } from "@/components/cards/card-form";
import { Trash2, CreditCard as CardIcon } from "lucide-react";

export default function CardsPage() {
  const { data: cards, isLoading } = useCards();
  const deleteMutation = useDeleteCard();
  const [open, setOpen] = useState(false);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this credit card? All associated transactions will lose their card link.")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Credit Cards</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Credit Card</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Credit Card</DialogTitle>
            </DialogHeader>
            <CardForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="py-8 text-center text-muted-foreground">Loading cards...</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards?.map((card: any) => {
            const usagePercent = Math.min((card.currentUsage / card.limit) * 100, 100);
            return (
              <Card key={card.id} className="overflow-hidden">
                <div className="h-2 w-full" style={{ backgroundColor: card.color }}></div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <CardIcon className="h-5 w-5" style={{ color: card.color }} />
                      <h3 className="font-semibold text-lg">{card.name}</h3>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-destructive opacity-50 hover:opacity-100"
                      onClick={() => handleDelete(card.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Limit Usage</span>
                        <span className="font-medium">${Number(card.currentUsage).toFixed(2)} / ${Number(card.limit).toFixed(2)}</span>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500" 
                          style={{ 
                            width: `${usagePercent}%`, 
                            backgroundColor: usagePercent > 90 ? '#ef4444' : usagePercent > 70 ? '#f59e0b' : card.color 
                          }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t">
                      <div>
                        <p className="text-muted-foreground">Closes on</p>
                        <p className="font-medium">Day {card.closingDay}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Due on</p>
                        <p className="font-medium">Day {card.dueDay}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {cards?.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground border rounded-lg border-dashed">
              No credit cards found. Add one to track your expenses!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
