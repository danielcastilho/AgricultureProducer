/**
 * Represents the input view model for agricultural cultures.
 */
export type agriculturalCulturesInputVM = {
  id?: string;
  name?: string;
};
/**
 * Represents the input data for create or update a rural producer.
 */
export type RuralProducerInputVM = {
  id?: string;
  document: string;
  totalArea: number;
  agriculturalArea: number;
  vegetationArea: number;
  cityId?: string;
  cityName: string;
  stateCityAccronym: string;
  farmName: string;
  name: string;
  agriculturalCultures?: agriculturalCulturesInputVM[];
};
