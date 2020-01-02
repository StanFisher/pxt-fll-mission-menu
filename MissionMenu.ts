class MissionMenu {
    private readonly _missions: IMission[];

    private previouslySelectedMissionIndex: number;
    private selectedMissionIndex: number;

    constructor() {
        this._missions = [];
        
        this.previouslySelectedMissionIndex = -1;
        this.selectedMissionIndex = -1;
    }

    public get missions(): IMission[] {
        return this._missions;
    }

    public addMission(mission: IMission): void {
        this.missions.push(mission);

        if (this.missions.length === 1) {
            this.previouslySelectedMissionIndex = 0;
            this.selectedMissionIndex = 0;
        }

        this.updateDisplay();
    }

    public updateDisplay(): void {
        brick.clearScreen();

        for (let missionMenuIndex = 0; missionMenuIndex < this.missions.length; missionMenuIndex++) {
            brick.showString(this.getMissionMenuItemPrefix(missionMenuIndex) + this.missions[missionMenuIndex].displayName, missionMenuIndex + 1);
        }
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
