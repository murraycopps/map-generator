type MapType = {
    aspect_ratio: number;
    lands: Array<Land>;
    water: Array<Water>;
    simplified: Array<Land>;
};

type Land = {
    island: boolean;
    vector: Vector;
};

type Water = {
    lake: boolean;
    vector: Vector;
};



type Vector = Array<[number, number]>