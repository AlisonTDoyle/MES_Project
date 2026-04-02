"use server";

export async function Search(formData: FormData) {
    // parse inputs
    let searchTerm = formData.get('searchTerm') as string;
    let searchObject = formData.get('searchObject') as string;

    // search using appropriate url
    let searchResults: {
        id: any, 
        type: string, 
        additionalInfo?: string,
        databaseId?: string
    }[] = [];

    let res;
    let json;

    switch (searchObject) {
        case '1':
            res = await fetch(`http://localhost:3001/api/production-order/search/${searchTerm}`);
            json = await res.json();
            let productionOrders = json.results || [];
            for (let po of productionOrders) {
                searchResults.push({
                    databaseId: po.id,
                    id: po.orderNumber,
                    type: 'PO',
                    additionalInfo: po.name
                });
            }
            break;
        case '2':
            res = await fetch(`http://localhost:3001/api/machine/search/${searchTerm}`);
            json = await res.json();
            let machines = json.results || [];
            for (let machine of machines) {
                searchResults.push({
                    id: machine.id,
                    type: 'Machine',
                    additionalInfo: machine.description,
                    databaseId: machine.id
                });
            }
            break;
    }

    // return results
    return searchResults;
}

