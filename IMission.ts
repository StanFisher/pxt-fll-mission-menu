interface IMission {
    id: number;
    displayName: string;
    isRunning: boolean;
    run: () => void;
}
