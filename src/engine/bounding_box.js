"use strict";

var eBoundCollideStatus = {
    eCollideLeft:   1,
    eCollideRight:  2,
    eCollideTop:    4,
    eCollideBottom: 8,
    eInside:        16,
    eOutside:       0 
};

class BoundingBox {
    constructor(centerPos, w, h){
        this.mLowLeft = vec2.fromValues(0, 0);
        this.setBounds(centerPos, w, h);
    }

    // centerPos is vec2, rotation ignored
    setBounds(centerPos, w, h){
        this.widht  = w;
        this.height = h;
        this.mLowLeft[0] = centerPos[0] - w / 2;
        this.mLowLeft[1] = centerPos[1] - h / 2;
    }

    containsPoint(x, y) {
        return ( (x>this.minX()) && (x<this.maxX()) && (y>this.minY()) && (y<this.maxY()));
    }
    
    intersectsBound(otherBound){
        return (
            (this.minX() < otherBound.maxX()) &&
            (this.maxX() > otherBound.minX()) &&
            (this.minY() < otherBound.maxY()) &&
            (this.maxY() > otherBound.minY())
        );
    }

    boundCollideStatus(otherBound){
        var status = eBoundCollideStatus.eOutside;

        if(this.intersectsBound(otherBound)) {
            if(otherBound.minX() < this.minX())
                status |= eBoundCollideStatus.eCollideLeft;

            if(otherBound.maxX() > this.maxX())
                status |= eBoundCollideStatus.eCollideRight;

            if(otherBound.minY() < this.minY())
                status |= eBoundCollideStatus.eCollideBottom

            if(otherBound.maxY() > this.maxY())
                status |= eBoundCollideStatus.eCollideTop;

            // If the bounds intersects and yet none of sides overlaps OtherBound is completly inside.
            if(status === eBoundCollideStatus.eOutside)
                status = eBoundCollideStatus.eInside;
        }

        return status;
    }

    minX() { return this.mLowLeft[0]; }
    maxX() { return this.mLowLeft[0] + this.widht; }
    minY() { return this.mLowLeft[1]; }
    maxY() { return this.mLowLeft[1] + this.height; }

}

export { eBoundCollideStatus }
export default BoundingBox;