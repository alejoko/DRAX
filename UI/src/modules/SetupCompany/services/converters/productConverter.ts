

export const sectorConverter = (response : any) => ({
    companyId: response?.company_id,
    companyName: response?.company_record?.name,
    companyDescription: response?.company_record?.description,
    companyIcon: response?.company_record?.icon_url,
    domain: response?.company_record?.domains[0]?.domain,
    mainOffice: response?.company_record?.locations[0]?.country?.name,
    employees: response?.employee_count
});