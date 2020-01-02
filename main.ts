const missionMenu = new MissionMenu();

//% weight=100 color=#007BA7 icon="\uf0c9"
namespace Menu {
    //% block
    export function addMission(name: string, missionFunction: () => void): void {
        const mission: IMission = {
            displayName: name,
            isRunning: false,
            run: missionFunction
        };

        missionMenu.addMission(mission);
    }
}
