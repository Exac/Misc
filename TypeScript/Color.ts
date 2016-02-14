class Color {
    private buffer:ArrayBuffer = new ArrayBuffer(4);
    private bufferView:Uint8Array;
    private alpha:number;//float

    /**
     *
     * @param _red      0 <= _red <=255
     * @param _green    0 <= _green <= 255
     * @param _blue     0 <= _blue <= 255
     * @param _alpha    0.0 <= _alpha <= 1.0
     */
    constructor(_red:number, _green:number, _blue:number, _alpha:number = 1.0) {
        for(var colorValue of [_red, _green, _blue]) {
            colorValue = this.to8Bit(colorValue);
        }

        this.bufferView = new Uint8Array(this.buffer, 0, 4);
        this.setR(_red);
        this.setG(_green);
        this.setB(_blue);
        this.setA(_alpha);
    }
    public r():number {
        return this.bufferView[0];
    }
    public g():number {
        return this.bufferView[1];
    }
    public b():number {
        return this.bufferView[2];
    }
    public a():number {
        return this.alpha;
    }
    public setR(_red:number) {
        this.bufferView[0] = this.to8Bit(_red);
    }
    public setG(_green:number) {
        this.bufferView[1] = this.to8Bit(_green);
    }
    public setB(_blue:number) {
        this.bufferView[2] = this.to8Bit(_blue);
    }
    public setA(_alpha:number) {
        if(_alpha > 1 || _alpha < -1) {
            _alpha = 1;
        }
        this.alpha = Math.abs(_alpha);
    }
    public rgb():string {
        return "rgb(" +
            this.bufferView[0] + ", " +
            this.bufferView[1] + ", " +
            this.bufferView[2] + ")";
    }
    public rgba():string {
        return "rgba(" +
            this.bufferView[0] + ", " +
            this.bufferView[1] + ", " +
            this.bufferView[2] + ", " +
            this.alpha + ")";
    }
    public hex():string {
        return "#" + this.decimalToHex(this.bufferView[0]) +
            this.decimalToHex(this.bufferView[1]) +
            this.decimalToHex(this.bufferView[2]);
    }
    private decimalToHex(d:number, padding:number = 2):string {
        var hex = Number(d).toString(16);

        while (hex.length < padding) {
            hex = "0" + hex;
        }

        return hex;
    }
    private to8Bit(eightBit:number):number {
        return eightBit != 255 ? eightBit % 255: eightBit;
    }
}
