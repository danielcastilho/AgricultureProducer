export type agriculturalCulturesInputVM = {
    id?: string;
    name?: string;
};
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
