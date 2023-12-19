import { API } from "aws-amplify";
import { listBanks } from "./graphql/queries";

export async function fetchAllBanks(): Promise<any[]> {
    var allBanks = [];
    var apiData: any = await API.graphql({ query: listBanks });
    var nextToken = apiData.data.listBanks.nextToken;
    allBanks = apiData.data.listBanks.items;
    while (!!nextToken && apiData.data.listBanks.items.length > 0) {
        apiData = await API.graphql({ query: listBanks, variables: { nextToken: nextToken } })
        nextToken = apiData.data.listBanks.nextToken;
        allBanks = allBanks.concat(apiData.data.listBanks.items);
        console.log('Fetched: ' + allBanks.length);
        // console.log(nextToken);
    }
    return allBanks;
}