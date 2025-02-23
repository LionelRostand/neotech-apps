
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Scale, Package, Calculator, Truck } from 'lucide-react';
import { calculateFreightCost } from '@/services/freightCalculator';
import { toast } from "sonner";

interface FreightCalculatorProps {
  onCalculate?: (cost: number) => void;
}

const FreightCalculator = ({ onCalculate }: FreightCalculatorProps) => {
  const [weight, setWeight] = useState<number>(0);
  const [size, setSize] = useState<'S' | 'M' | 'L' | 'XL'>('M');
  const [distance, setDistance] = useState<number>(0);
  const [cost, setCost] = useState<number | null>(null);
  const [initialCost, setInitialCost] = useState<number | null>(null);

  // Calcul du coût initial basé uniquement sur le poids
  useEffect(() => {
    if (weight > 0) {
      const baseInitialCost = calculateFreightCost({ 
        weight, 
        size: 'M', // Taille moyenne par défaut
        distance: 1 // Distance minimale pour le calcul initial
      });
      setInitialCost(baseInitialCost);
    } else {
      setInitialCost(null);
    }
  }, [weight]);

  const handleCalculate = () => {
    if (weight <= 0 || distance <= 0) {
      toast.error("Veuillez entrer des valeurs valides pour le poids et la distance");
      return;
    }

    const calculatedCost = calculateFreightCost({ weight, size, distance });
    setCost(calculatedCost);
    onCalculate?.(calculatedCost);
    toast.success(`Coût calculé: ${calculatedCost}€`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Calculateur de coûts de transport
        </CardTitle>
        <CardDescription>
          Calculez le coût de transport en fonction du poids, de la taille et de la distance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="weight" className="flex items-center gap-2">
              <Scale className="h-4 w-4" />
              Poids (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              min="0"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              placeholder="Entrez le poids"
            />
            {initialCost !== null && (
              <p className="text-sm text-muted-foreground">
                Coût initial estimé: {initialCost}€
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="size" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Taille
            </Label>
            <select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value as 'S' | 'M' | 'L' | 'XL')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="S">Petit (&lt; 1m³)</option>
              <option value="M">Moyen (1-2m³)</option>
              <option value="L">Grand (2-5m³)</option>
              <option value="XL">Très grand (&gt; 5m³)</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="distance" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Distance (km)
            </Label>
            <Input
              id="distance"
              type="number"
              min="0"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              placeholder="Entrez la distance"
            />
          </div>
        </div>

        <Button onClick={handleCalculate} className="w-full">
          Calculer le coût
        </Button>

        {cost !== null && (
          <div className="mt-4 p-4 bg-secondary/20 rounded-md">
            <p className="text-center text-xl font-semibold">
              Coût estimé: {cost}€
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FreightCalculator;

