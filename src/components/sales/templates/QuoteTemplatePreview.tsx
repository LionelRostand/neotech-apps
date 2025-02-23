
import { Card } from "@/components/ui/card";

interface QuoteTemplatePreviewProps {
  template: {
    id: string;
    name: string;
    description?: string;
    content: string;
  } | null;
}

const QuoteTemplatePreview = ({ template }: QuoteTemplatePreviewProps) => {
  if (!template) {
    return (
      <Card className="p-6 text-center text-muted-foreground">
        Sélectionnez un modèle pour voir l'aperçu
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold">{template.name}</h4>
          {template.description && (
            <p className="text-sm text-muted-foreground">{template.description}</p>
          )}
        </div>
        <div className="border rounded-lg p-4 bg-background">
          <div dangerouslySetInnerHTML={{ __html: template.content }} />
        </div>
      </div>
    </Card>
  );
};

export default QuoteTemplatePreview;
