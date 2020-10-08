const getDomain = (response : any) => `http://www.${response?.company_record?.domains[0]?.domain}`;

//TODO: to be changed.
const getLocation = (response : any) => 'Internacional';

const companyConverter = (response : any) => ({
    companyId: response?.company_id,
    companyName: response?.company_record?.name,
    companyDescription: response?.company_record?.description,
    companyIcon: response?.company_record?.icon_url,
    domain: getDomain(response),
    mainOffice: response?.company_record?.locations[0]?.country?.name,
    employees: response?.employee_count,
    location: getLocation(response)

});

export default companyConverter;