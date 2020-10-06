const sectorConverter = (response : any) => response?.map((sector: any) => ({ key: sector?.id, value: sector?.name}));

export default sectorConverter;