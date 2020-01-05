const missionMenu = new MissionMenu();

brick.buttonUp.onEvent(ButtonEvent.Released, () => {
    missionMenu.selectPreviousMission();
});

brick.buttonDown.onEvent(ButtonEvent.Released, () => {
    missionMenu.selectNextMission();
});

brick.buttonEnter.onEvent(ButtonEvent.Released, () => {
    missionMenu.runSelectedMission();
});

//% weight=100 color=#007BA7 icon="\uf0c9"
namespace Menu {
    //% block
    export function addMission(id: number, displayName: string): void {
        const mission: IMission = {
            id: id,
            displayName: displayName,
            isRunning: false,
            run: () => { }
        };

        missionMenu.addMission(mission);
    }

    //% block="define mission $id"
    export function defineMission(id: number, missionFunction: () => void): void {
        missionMenu.updateMissionFunction(id, missionFunction);
    }

    //% block
    export function clearAllMissions(): void {
        missionMenu.clearAllMissions();
    }
}
