export class CounterService {

    activeToInactiveCounter = 0;
    inactiveToActiveCounter = 0;

    incrementActiveToInactive() {
        this.activeToInactiveCounter++;
        console.log("To Inactive: " + this.activeToInactiveCounter);
    }

    incrementInactiveToActive() {
        this.inactiveToActiveCounter++;
        console.log("To Active: " + this.inactiveToActiveCounter);
    }

}