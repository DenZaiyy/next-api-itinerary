import {NextRequest, NextResponse} from "next/server";
import {db} from "@/lib/db";

export async function GET() {
    try {
        const itineraries = await db.itinerary.findMany();

        if (!itineraries) {
            return new NextResponse("Not Found", {status: 404});
        }

        return NextResponse.json(itineraries);
    } catch(err) {
        if (err instanceof Error) {
            console.error("[ITINERARIES_GET] ",err.message);
        }
        return new NextResponse("Internal Error", {status: 500});
    }
}

export async function POST(req: NextRequest) {
    const { name, description, LocationItinerary } = await req.json();
}
