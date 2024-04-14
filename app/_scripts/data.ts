class MapClass {
    static map: MapType = {
        aspect_ratio: 1,
        lands: [
            {
                island: true, vector: [
                    [10, 10],
                    [40, 10],
                    [60, 50],
                    [40, 90],
                    [10, 90],
                    [10, 10]
                ]
            },
            {
                island: true, vector: [
                    [50, 10],
                    [90, 10],
                    [90, 90],
                    [50, 90],
                    [50, 10]
                ]
            }
        ],
        water: [],
        simplified: [],
    };
    static addLand(land: Land) {
        this.map.lands.push(land);
    }
}

export default MapClass; 