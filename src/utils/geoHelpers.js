import municipalities from "../constants/municipalities.json";
import provinces from "../constants/provinces.json";
import regions from "../constants/regions.json";

export const getRegions = () => {
  return regions;
};

export const getProvinces = (regionName) => {
  if (!regionName) return [];

  const region = regions.find((r) => r.name === regionName);
  return provinces.filter((province) => province.region === region.designation);
};

export const getMunicipalities = (provinceName) => {
  return municipalities.filter(
    (municipality) => municipality.province === provinceName
  );
};
