class MissionMenu {
    private readonly missions: IMission[];
    private readonly missionHandlers: IMissionHandler[];

    private selectedMissionIndex: number;

    constructor() {
        this.missions = [];
        this.missionHandlers = [];

        this.selectedMissionIndex = -1;
    }

    public addMission(mission: IMission): void {
        this.missions.push(mission);

        if (this.missions.length === 1) {
            this.selectedMissionIndex = 0;
        }

        this.updateDisplay();
    }

    public defineMissionHandler(missionId: number, missionHandler: () => void): void {
        const missionHandlerItem: IMissionHandler = {
            id: missionId,
            handler: missionHandler
        };
        
        this.missionHandlers.push(missionHandlerItem);
    }

    public clearAllMissions(): void {
        this.missions.splice(0, this.missions.length);
        this.missionHandlers.splice(0, this.missionHandlers.length);
        brick.clearScreen();
    }

    public runSelectedMission(): void {
        if (this.missionMenuIndexIsValid(this.selectedMissionIndex)) {
            const selectedMission = this.missions[this.selectedMissionIndex];
            const selectedMissionHandler = this.findMissionHandler(selectedMission.id);

            selectedMission.isRunning = true;
            this.updateDisplay();

            if (selectedMissionHandler) {
                selectedMissionHandler.handler();
            }

            selectedMission.isRunning = false;
            this.updateDisplay();

            this.selectNextMission();
            this.updateDisplay();
        }
    }

    public selectPreviousMission(): void {
        if (this.missionMenuIndexIsValid(this.selectedMissionIndex)) {
            this.selectedMissionIndex = this.selectedMissionIndex === 0 ? this.missions.length - 1 : this.selectedMissionIndex - 1;
        }

        this.updateDisplay();
    }

    public selectNextMission(): void {
        if (this.missionMenuIndexIsValid(this.selectedMissionIndex)) {
            this.selectedMissionIndex = (this.selectedMissionIndex + 1) % this.missions.length;
        }

        this.updateDisplay();
    }

    private findMissionHandler(missionId: number): IMissionHandler | undefined {
        if (this.missionHandlers.length > 0) {
            for (let missionHandlerIndex = 0; missionHandlerIndex < this.missionHandlers.length; missionHandlerIndex++) {
                if (this.missionHandlers[missionHandlerIndex].id === missionId) {
                    return this.missionHandlers[missionHandlerIndex];
                }
            }
        }

        return undefined;
    }

    private updateDisplay(): void {
        for (let missionMenuIndex = 0; missionMenuIndex < this.missions.length; missionMenuIndex++) {
            brick.showString(this.getMissionMenuItemPrefix(missionMenuIndex) + this.missions[missionMenuIndex].displayName, missionMenuIndex + 1);
        }
    }

    private getMissionMenuItemPrefix(missionMenuIndex: number): string {
        let prefix = '  ';

        if (this.missionMenuIndexIsValid(missionMenuIndex)) {
            const mission = this.missions[missionMenuIndex];

            if (missionMenuIndex === this.selectedMissionIndex) {
                prefix = mission.isRunning ? '>*' : '> ';
            }
        }

        return prefix;
    }

    private missionMenuIndexIsValid(missionMenuIndex: number): boolean {
        return this.missions.length > 0 && missionMenuIndex >= 0 && missionMenuIndex < this.missions.length;
    }
}
