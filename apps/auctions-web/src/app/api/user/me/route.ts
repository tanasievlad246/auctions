import { auth0 } from "@/lib/auth0";

export async function GET() {
    const session = await auth0.getSession();
    if (session) {
        return Response.json({ session })
    } else {
        return Response.json({})
    }
}
