import municipalities from "../constants/municipalities.json";
import provinces from "../constants/provinces.json";
import regions from "../constants/regions.json";

export const getRegions = () => {
  return regions;
};

export const getProvinces = (regionName) => {
  return provinces.filter((province) => province.region === regionName);
};

export const getMunicipalities = (provinceName) => {
  return municipalities.filter(
    (municipality) => municipality.province === provinceName
  );
};
