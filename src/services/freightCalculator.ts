
export interface FreightCalculation {
  weight: number;
  size: 'S' | 'M' | 'L' | 'XL';
  distance: number;
}

export const calculateFreightCost = ({ weight, size, distance }: FreightCalculation): number => {
  // Base de prix au km
  const baseRatePerKm = 0.5;
  
  // Multiplicateur selon la taille
  const sizeMultiplier = {
    'S': 1,    // < 1m³
    'M': 1.5,  // 1-2m³
    'L': 2,    // 2-5m³
    'XL': 3    // > 5m³
  };

  // Multiplicateur selon le poids (par tranche de 10kg)
  const weightMultiplier = Math.ceil(weight / 10) * 0.2;

  // Calcul final: (distance * taux de base) * (multiplicateur taille + multiplicateur poids)
  const cost = (distance * baseRatePerKm) * (sizeMultiplier[size] + weightMultiplier);
  
  return Math.round(cost * 100) / 100;
};
