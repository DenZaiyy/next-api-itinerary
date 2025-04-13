import {db} from "@/lib/db";
import {NextRequest, NextResponse} from "next/server";

interface IItineraryProps {
    params: Promise<{ id: string, locationId: string }>;
}

export async function DELETE(req: NextRequest, { params } : IItineraryProps) {
    const { id, locationId } = await params;

    try {
        /* const itinerary = await db.itinerary.delete({ where: { id: id } });*/

        const itinerary = await db.locationItinerary.deleteMany({
            where: {
                itinerary: {
                    id: id
                },
                location: {
                    id: locationId
                }
            }
        })

        return NextResponse.json(itinerary);
    } catch(err) {
        if (err instanceof Error) {
            console.error("[ITINERARIES_DELETE] ",err.message);
        }
        return new NextResponse("Internal Error", {status: 500});
    }
}