import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchData from "@/utils/services/fetchData.ts";
import { Button } from "@/components/ui/button.tsx";

export default function HomePage() {
    const [greeting, setGreeting] = useState<string | null>();
    const { data } = useQuery({ queryKey: ["data"], queryFn: fetchData });

    useEffect(() => {
        setGreeting(data);
    }, [data]);

    return (
        <div className="flex justify-center items-center h-full bg-neutral-500">
            <Button>Click me</Button>
        </div>
    );
}
