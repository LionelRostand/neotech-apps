
import { QuotesView } from '@/components/sales/QuotesView';

const Sales = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Devis</h1>
        <p className="text-muted-foreground">
          Gérez vos devis et suivez leur statut
        </p>
      </div>
      <QuotesView />
    </div>
  );
};

export default Sales;
