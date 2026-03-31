"use server";

export async function Search(formData: FormData) {
    // parse inputs
    let searchTerm = formData.get('searchTerm') as string;
    let searchObject = formData.get('searchObject') as string;
    
    // search using appropriate url
    let searchResults: {id:any, type:string, additionalInfo?: string}[] = [];
    switch (searchObject) {
        case '1':
            let res = await fetch(`http://localhost:3001/api/production-order/search/${searchTerm}`);
            let json = await res.json();
            let productionOrders = json.results || [];
            for (let po of productionOrders) {
                searchResults.push({
                    id: po.orderNumber,
                    type: 'PO',
                    additionalInfo: po.name
                });
            }
            break;
        case '2':
            // search Machine
            break;
    }

    // return results
    return searchResults;
}