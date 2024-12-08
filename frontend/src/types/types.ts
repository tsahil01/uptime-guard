export interface IWebsite {
    id: string;
    url: string;
    userId: string;
}


export interface StatusData {
    status: string;
    code: number;
    responseTime: number;
    lastChecked: string;
}

export interface StatusCardProps {
    title: string;
    icon: React.ElementType;
    status?: StatusData | null;
    loading?: boolean;
}
