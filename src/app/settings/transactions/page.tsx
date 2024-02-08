import { PaymentsDataTable } from "@/app/_components/Account/PaymentsDataTable";
import { Separator } from "@/components/ui/separator";



export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Transactions</h3>
        <p className="text-sm text-muted-foreground">
          View your past transactions
        </p>
      </div>
      <Separator />
      <PaymentsDataTable/>
    </div>
  );
}
