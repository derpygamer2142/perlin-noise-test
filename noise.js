export default class Noise {
    tween(val1,val2,amount) {
        let returnVal = val1;
        returnVal += (val2-val1)*amount;
        return returnVal;
    }

    generateNoise(amount,amp) {
        let slopes = [];
        for (let i = 0; i < amount; i++) {
            slopes.push((Math.random()-0.5) * amp)
        }

        let noiseSlopes = [];

        for (let i = 0; i < slopes.length; i++) {
            for (let a = 0; a <= 1; a += 0.1) {
                noiseSlopes.push(this.tween(slopes[i],slopes[i+1],a))
            }
        }

        let y = 0;
        let noise = [];
        noiseSlopes.forEach(s => {
            y += s;
            noise.push(y)
        });

        return noise;

    }
}