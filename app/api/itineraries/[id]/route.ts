import {db} from "@/lib/db";
import {NextRequest, NextResponse} from "next/server";

interface IItineraryProps {
    params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params } : IItineraryProps) {
    const { id } = await params;

    try {
        const itinerary = await db.itinerary.findFirst({
            where: { id: id},
            include: {
                LocationItinerary: {
                    include: {
                        location: true
                    },
                    orderBy: {
                        order: "asc"
                    }
                }
            }
        });

        if (!itinerary) {
            return new NextResponse("Not Found", {status: 404});
        }

        return NextResponse.json(itinerary);
    } catch(err) {
        if (err instanceof Error) {
            console.error("[ITINERARIES_GET] ",err.message);
        }
        return new NextResponse("Internal Error", {status: 500});
    }
}

export async function PUT(req: NextRequest, { params } : IItineraryProps) {
    const { id } = await params;
    const { title, description, LocationItinerary } = await req.json();

    try {
        const itinerary = await db.itinerary.update({
            where: { id: id },
            data: {
                title: title,
                description: description,
                LocationItinerary: {
                    create: LocationItinerary
                }
            },
            include: {
                LocationItinerary: {
                    include: {
                        location: true
                    },
                    orderBy: {
                        order: "asc"
                    }
                }
            }
        });

        return NextResponse.json(itinerary);
    } catch(err) {
        if (err instanceof Error) {
            console.error("[ITINERARIES_PUT] ",err.message);
        }
        return new NextResponse("Internal Error", {status: 500});
    }
}

export async function DELETE(req: NextRequest, { params } : IItineraryProps) {
    const { id } = await params;

    try {
        const itinerary = await db.itinerary.delete({ where: { id: id } });
        return NextResponse.json(itinerary);
    } catch(err) {
        if (err instanceof Error) {
            console.error("[ITINERARIES_DELETE] ",err.message);
        }
        return new NextResponse("Internal Error", {status: 500});
    }
}