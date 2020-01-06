const missionMenu = new MissionMenu();

//% weight=100 color=#007BA7 icon="\uf0c9"
namespace Menu {
    //% block="define mission with ID $id and name $displayName"
    export function defineMission(id: number, displayName: string, missionFunction: () => void): void {
        const mission: IMission = {
            id: id,
            displayName: displayName,
            isRunning: false,
            run: missionFunction
        };

        missionMenu.addMission(mission);
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
