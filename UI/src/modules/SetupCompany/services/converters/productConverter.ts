const productConverter = (response : any) => response?.map((product : any) => ({ key: product?.id, value: product?.name}));

export default productConverter;