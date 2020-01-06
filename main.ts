const missionMenu = new MissionMenu();

//% weight=100 color=#007BA7 icon="\uf0c9"
namespace Menu {
    //% block
    export function addMission(id: number, displayName: string): void {
        const mission: IMission = {
            id: id,
            displayName: displayName,
            isRunning: false
        };

        missionMenu.addMission(mission);
    }

    //% block="when $missionId is selected to run"
    export function defineMissionHandler(missionId: number, missionHandler: () => void): void {
        missionMenu.defineMissionHandler(missionId, missionHandler);
    }

    //% block
    export function clearAllMissions(): void {
        missionMenu.clearAllMissions();
    }

    brick.buttonUp.onEvent(ButtonEvent.Released, () => {
        missionMenu.selectPreviousMission();
    });

    brick.buttonDown.onEvent(ButtonEvent.Released, () => {
        missionMenu.selectNextMission();
    });

    brick.buttonEnter.onEvent(ButtonEvent.Released, () => {
        missionMenu.runSelectedMission();
    });
}
