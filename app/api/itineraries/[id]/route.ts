import {db} from "@/lib/db";
import {NextRequest, NextResponse} from "next/server";

interface IItineraryProps {
    params: Promise<{ id: string }>;
}

interface IItineraryItemsProps {
    id: string;
    order: number;
}

export async function GET(req: NextRequest, {params}: IItineraryProps) {
    const {id} = await params;

    try {
        const itinerary = await db.itinerary.findFirst({
            where: {id: id},
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
    } catch (err) {
        if (err instanceof Error) {
            console.error("[ITINERARIES_GET] ", err.message);
        }
        return new NextResponse("Internal Error", {status: 500});
    }
}

export async function PUT(req: NextRequest, {params}: IItineraryProps) {
    const {id} = await params;
    const {items} = await req.json();

    try {
        const updated = items.map(async (item: IItineraryItemsProps) => {
            await db.locationItinerary.update({
                where: {
                    id: item.id,
                    itinerary: {
                        id: id
                    }
                },
                data: {
                    order: item.order
                }
            });
        })

        return NextResponse.json({success: true, updated});
    } catch (err) {
        if (err instanceof Error) {
            console.error("[ITINERARIES_PUT] ", err.message);
        }
        return new NextResponse("Internal Error", {status: 500});
    }
}

export async function DELETE(req: NextRequest, {params}: IItineraryProps) {
    const {id} = await params;

    try {
        /* const itinerary = await db.itinerary.delete({ where: { id: id } });*/

        const itinerary = await db.$transaction([db.locationItinerary.deleteMany({
            where: {
                itinerary: {
                    id: id
                }
            }
        }),
            db.itinerary.delete({
                where: {id: id}
            })])

        return NextResponse.json(itinerary);
    } catch (err) {
        if (err instanceof Error) {
            console.error("[ITINERARIES_DELETE] ", err.message);
        }
        return new NextResponse("Internal Error", {status: 500});
    }
}