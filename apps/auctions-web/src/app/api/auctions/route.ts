import { gql } from "@apollo/client";
import { getClient, query } from "@/lib/apollo-client";
import { auth0 } from "@/lib/auth0";

export async function GET() {
    const session = await auth0.getSession();

    const AUCTIONS_LIST_QUERY = gql`
        query AuctionsList {
            auctions {
                pageInfo {
                    hasNextPage
                    hasPreviousPage
                }
                totalCount
                nodes {
                    createdAt
                    createdBy
                    description
                    endDate
                    startDate
                    startingPrice
                    loadings {
                        city
                    }
                    unloadings {
                        city
                    }
                    createdBy
                }
            }
        }
    `;

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