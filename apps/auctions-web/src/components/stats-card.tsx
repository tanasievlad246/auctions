import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface StatsCardProps {
    title: string;
    value: number;
    icon: string | any;
    color: string;
    description: string;
}

export function StatsCard({
    title,
    value,
    icon,
    description
}: StatsCardProps) {
    return (
        <Card className="w-full h-[120px] flex flex-col overflow-hidden">
            <CardHeader className="flex flex-row justify-between p-4 pb-1 space-y-0">
                <CardTitle className="text-xl font-semibold truncate">{title}</CardTitle>
                <span className="flex-shrink-0">{icon}</span>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow min-h-0">
                <p className="text-4xl font-bold truncate">{value}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 mt-6">
                <CardDescription className="line-clamp-1">{description}</CardDescription>
            </CardFooter>
        </Card>
    );
}