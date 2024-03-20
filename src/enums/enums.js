export const EquipmentCategory = {
  Computador: 0,
  Monitor: 1,
  Impresora: 2,
};


export const getCategoryFromValue = (value) =>
  Object.keys(EquipmentCategory).find((key) => EquipmentCategory[key] === value);
