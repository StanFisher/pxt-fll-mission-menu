class MissionMenu {
    private readonly missions: IMission[];

    private previouslySelectedMissionIndex: number;
    private selectedMissionIndex: number;

    constructor() {
        this.missions = [];

        this.previouslySelectedMissionIndex = -1;
        this.selectedMissionIndex = -1;
    }

    public addMission(mission: IMission): void {
        this.missions.push(mission);

        if (this.missions.length === 1) {
            this.previouslySelectedMissionIndex = 0;
            this.selectedMissionIndex = 0;
        }

        this.updateDisplay();
    }

    public updateMissionFunction(missionId: number, missionFunction: () => void): void {
        if (this.missions.length > 0) {
            this.missions
                .filter(mission => mission.id === missionId)
                .forEach(mission => mission.run = missionFunction);
        }
    }

    public clearAllMissions(): void {
        this.missions.splice(0, this.missions.length);
    }

    public runSelectedMission(): void {
        if (this.missionMenuIndexIsValid(this.selectedMissionIndex)) {
            const selectedMission = this.missions[this.selectedMissionIndex];
            selectedMission.isRunning = true;

            control.runInParallel(() => {
                this.updateDisplay();
            })
            selectedMission.run();

            selectedMission.isRunning = false;
            this.updateDisplay();
        }
    }

    public selectPreviousMission(): void {
        if (this.missions.length > 0) {
            this.previouslySelectedMissionIndex = this.selectedMissionIndex;
            this.selectedMissionIndex = this.selectedMissionIndex === 0 ? this.missions.length - 1 : this.selectedMissionIndex - 1;
        }
    }

    public selectNextMission(): void {
        if (this.missions.length > 0) {
            this.previouslySelectedMissionIndex = this.selectedMissionIndex;
            this.selectedMissionIndex = (this.selectedMissionIndex + 1) % this.missions.length;
        }
    }

    private updateDisplay(): void {
        brick.clearScreen();

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
        return this.missions.length > 0 && missionMenuIndex > 0 && missionMenuIndex < this.missions.length;
    }
}
