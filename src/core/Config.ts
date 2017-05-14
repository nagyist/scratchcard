export default class Config {
    slotSize: number;
    slotNumber: [number, number];
    marginSize: number;
    outerMarginSize: number;
    options?: object;
    size: {width:number, height: number};
    positions: [number,number][];
    constructor(config){
        this.slotSize = config.slotSize;
        this.marginSize = config.marginSize;
        this.outerMarginSize = config.outerMarginSize;
        this.slotNumber = config.slotNumber;
        this.options = config.options;
        this.getSize();
        this.getPositions();
    }

    // Calculate the total size of the card using the other parameters
    getSize(): void{
        const  calc = (index: number): number => {
            return (this.slotNumber[0] * this.slotSize) + 
            (this.marginSize * (this.slotNumber[0] - 1)) + 
            this.outerMarginSize * 2;
        }
        this.size = {width: calc(0), height: calc(1)};
    }

    // Calculate cordinates of the slots using the other parameters 
    getPositions(): void{
        let positions: [number,number][] = [];
        for (var i = 0; i < this.slotNumber[1]; i++) {
            for (var j = 0; j < this.slotNumber[0]; j++) {
                positions.push([
                    j * this.slotSize + j * this.marginSize + this.outerMarginSize, 
                    i * this.slotSize + i * this.marginSize + this.outerMarginSize
                ]);
            }
        }
        this.positions = positions;
    }
};