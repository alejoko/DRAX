const getDomain = (response : any) => `http://www.${response?.company_record?.domains[0]?.domain}`;

const getSectors = (response : any) => response?.company_record?.sectors?.map((sector: any) => ({ key: sector?.id, value: sector?.name}));

const getProducts = (response : any) => response?.products?.map((product: any) => ({ key: product?.id, value: product?.name}));

//TODO: to be changed.
const getLocation = (response : any) => 'local';

const getTags = (response : any) => response?.tags?.map((product: any) => ({ key: product?.id, value: product?.name}));

const companyConverter = (response : any) => ({
    companyId: response?.company_id,
    companyName: response?.company_record?.name,
    companyDescription: response?.company_record?.description,
    companyIcon: response?.company_record?.icon_url,
    domain: getDomain(response),
    mainOffice: response?.company_record?.locations[0]?.country?.name,
    employees: response?.employee_count,
    sectors: getSectors(response),
    products: getProducts(response),
    location: getLocation(response),
    tags: getTags(response)
});

export default companyConverter;