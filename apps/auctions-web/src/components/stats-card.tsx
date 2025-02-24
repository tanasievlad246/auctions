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
        <Card className="w-full h-[150px] flex flex-col">
            <CardHeader className="flex flex-row justify-between p-4 pb-2">
                <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                <span>{icon}</span>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-grow">
                <p className="text-4xl font-bold">{value}</p>
            </CardContent>
            <CardFooter className="p-4 pt-2">
                <CardDescription>{description}</CardDescription>
            </CardFooter>
        </Card>
    );
}