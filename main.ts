const missionMenu = new MissionMenu();

//% weight=100 color=#007BA7 icon="\uf0c9"
namespace Menu {
    //% block="define mission $displayName"
    export function addMission(displayName: string, missionFunction: () => void): void {
        const mission: IMission = {
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
