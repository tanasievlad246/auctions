import { gql } from "@apollo/client";
import { query } from "@/lib/apollo-client";
import { auth0 } from "@/lib/auth0";

export async function GET(request: Request) {
    const session = await auth0.getSession();
    const { searchParams } = new URL(request.url);

    console.log(searchParams);

    const AUCTIONS_LIST_QUERY = gql`
        query AuctionsList {
            auctions {
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                }
                totalCount
                nodes {
                    id
                    createdAt
                    createdBy
                    description
                    endDate
                    startDate
                    startingPrice
                    title
                    status
                    loadings {
                        city
                        startDate
                        endDate
                        country
                    }
                    unloadings {
                        city
                        startDate
                        endDate
                        country
                    }
                    createdBy
                }
            }
        }
    `;
    console.log(session?.tokenSet.accessToken);
    const { data } = await query({
        query: AUCTIONS_LIST_QUERY,
        context: {
            headers: {
                Authorization: `Bearer ${session?.tokenSet.accessToken}`,
            },
        },
    });

    if (!data) {
        return Response.error();
    }

    return Response.json({ data });
}