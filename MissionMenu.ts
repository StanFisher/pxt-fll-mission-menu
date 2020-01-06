class MissionMenu {
    private readonly missions: IMission[];

    private selectedMissionIndex: number;

    constructor() {
        this.missions = [];

        this.selectedMissionIndex = -1;
    }

    public addMission(mission: IMission): void {
        this.missions.push(mission);

        if (this.missions.length === 1) {
            this.selectedMissionIndex = 0;
        }

        this.updateDisplay();
    }

    public clearAllMissions(): void {
        this.missions.splice(0, this.missions.length);
        brick.clearScreen();
    }

    public runSelectedMission(): void {
        if (this.missionMenuIndexIsValid(this.selectedMissionIndex)) {
            const selectedMission = this.missions[this.selectedMissionIndex];

            selectedMission.isRunning = true;
            this.updateDisplay();

            selectedMission.run();

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
