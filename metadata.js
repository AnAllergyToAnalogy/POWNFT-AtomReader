const ions = [
    [		],
    [	1	],
    [		],
    [	1	],
    [	2	],
    [		],
    [		],
    [	-3	],
    [	-2	],
    [	-1	],
    [		],
    [	1	],
    [	2	],
    [	3	],
    [		],
    [	-3	],
    [	-2	],
    [	-1	],
    [		],
    [	1	],
    [	2	],
    [	3	],
    [	3,4	],
    [	3,5	],
    [	2,3	],
    [	2,4	],
    [	2,3	],
    [	2,3	],
    [	2,3	],
    [	1,2	],
    [	2	],
    [	3	],
    [	4	],
    [	-3	],
    [	-2	],
    [	-1	],
    [		],
    [	1	],
    [	2	],
    [	3	],
    [	4	],
    [	3,5	],
    [	6	],
    [	7	],
    [	3,4	],
    [	3	],
    [	2,4	],
    [	1	],
    [	2	],
    [	3	],
    [	2,4	],
    [	3,5	],
    [	-2	],
    [	-1	],
    [		],
    [	1	],
    [	2	],
    [	3	],
    [	3	],
    [	3	],
    [	3	],
    [	3	],
    [	2,3	],
    [	2,3	],
    [	3	],
    [	3	],
    [	3	],
    [	3	],
    [	3	],
    [	3	],
    [	3	],
    [	3	],
    [	4	],
    [	5	],
    [	6	],
    [	7	],
    [	4	],
    [	4	],
    [	2,4	],
    [	1,3	],
    [	2	],
    [	1,3	],
    [	2,4	],
    [	3,5	],
    [	2,4	],
    [	-1	],
    [		],
    [	1	],
    [	2	],
    [	3	],
    [	4	],
    [	4,5	],
    [	4,6	],
    [	5	],
    [	4	],
    [	3,4	],
    [	3	],
    [	3	],
    [	3	],
    [	3	],
    [	3	],
    [	2,3	],
    [	2,3	],
    [	3	],
    [		],
    [		],
    [		],
    [		],
    [		],
    [		],
    [		],
    [		],
    [		],
    [		],
    [		],
    [		],
    [		],
    [		],
    [		]
]
function sin(a) {
    return Math.sin(a);
}
function cos(a) {
    return Math.cos(a);
}
function generationOf(_tokenId){
    return Math.floor(Math.log2(_tokenId));
}



function getIons(atomicNumber){
    return ions[atomicNumber];
}

// function atomise(tokenId,hash){
//     let t0 = new Date();
//
//     const atomData = parseHash(tokenId,hash);
//     Atom(atomData);
//
//     Frame(atomData);
//
//     let t1 = new Date();
//
//
//     const buffer = canvas.toBuffer('image/png');
//
//     return {
//         buffer,
//         metadata: Metadata(tokenId,atomData)
//     }
// }

 function parseHash(tokenId,hash){
    tokenId = parseInt(tokenId);
    hash = hash.substr(2);

    // hash = (BN.from(hash)).toString();

    function byte(index){
        return parseInt(hash[index * 2] + hash[index * 2 + 1],16);
    }
    function bytes(index,length){
        return parseInt(hash.substr(index*2,length*2),16);
    }

    function getAtomicNumber(tokenId,salt){
        if(parseInt(tokenId) === 1) return 0;
        const generation = generationOf(tokenId);
        let max;
        if(generation >= 13){
            max = 118
        }else if(generation >= 11){
            max = 86
        }else if(generation >= 9){
            max = 54
        }else if(generation >= 7){
            max = 36
        }else if(generation >= 5){
            max = 18
        }else if(generation >= 3){
            max = 10
        }else if(generation >= 1){
            max = 2
        }
        const r = salt/parseInt("ffffffffff",16);

        return Math.ceil(
            Math.pow(r,1+(generation>=8)*1)* max
        );
    }
    function getIon(tokenId,salt){
        return ions[atomicNumber].length === 0?0:1*(salt%3===0);
    }
    function getNucleusRate(salt){
        return  1/(10 + 20 * salt/255)
    }


    function getIonNum(ion,salt){
        return ion===0?0:salt%ions[atomicNumber].length ;
    }
    function getColours(salt0,salt1,salt2){
        let min = 70;
        let i = [0,1,2];
        let high = i.splice(Math.floor(salt0/255 * 3),1);
        let low = i.splice(Math.floor(salt1/255 * 2),1);

        let mid = Math.floor((255 - min) * salt2/255);

        let colour0 = [0,0,0];
        colour0[high] = 255;
        colour0[low] = min;
        colour0[i] = min + mid;

        let colour1 = [0,0,0];
        colour1[high] = 255;
        colour1[i] = min;
        colour1[low] = 255 - mid;

        return [
            colour0,colour1
        ]
    }

    function getZoomness1(salt){
        // return salt/255;
        return salt/255 * 0.3 + 0.7;
    }
    function getZoomness2(salt){
        return salt/255 * 0.2 + 0.8;
    }

    let ion;
    let ion_num;
    const atomicNumber = getAtomicNumber(tokenId,bytes(0,5));
    const properties = getElement(atomicNumber);
    let colours;
    let nucleus_rate;
    let zoomness;
    let zoomness2;


    if(tokenId === 1){
        ion = 0;
        ion_num = 0;
        colours = [
            [255,255,255],
            [255,255,255]
        ];
        nucleus_rate = 1/30;
        zoomness = 1;
        zoomness2 = 1;
    }else{

        ion = getIon(tokenId,byte(5));

        ion_num = getIonNum(ion,byte(6));

        colours = getColours(byte(7),byte(8),byte(9));
        nucleus_rate = getNucleusRate(byte(10))
        zoomness = getZoomness1(byte(11))
        zoomness2 = getZoomness2(byte(12))
    }

    return {
        atomicNumber: atomicNumber,
        ion_charge: !ion?0:ions[atomicNumber][ion_num] * ion,

        atomicBytes: bytes(0,5),

        symbol:     properties.symbol,
        name:       properties.name,
        mass:       properties.mass,
        category:   properties.category,

        group: properties.group,
        period: properties.period,
        category_counter: properties.category_counter,
        group_counter: properties.group_counter,
        period_counter: properties.period_counter,

        visual: {
            big_motion_salt:    hash.substr(-24),
            ion:                ion,
            ion_num:            ion_num,
            colours:            colours,
            nucleus_rate:       nucleus_rate,
            zoomness :          zoomness,
            zoomness2:          zoomness2,
        }
    }

}

 function getMetadata(tokenId,hash){
    let atomData = parseHash(tokenId,hash);
    return Metadata(tokenId,atomData);
}

 function Metadata(tokenId,atomData){
    tokenId = parseInt(tokenId);
    if(tokenId === 1) return {
        atomicNumber: 0,
        "name": "#1 Genesis",
        "description": description(tokenId,0,"",0),
        "image": getImageUrl(tokenId),
    }

    let metadata = {
        atomicNumber: atomData.atomicNumber,
        "name": "#"+tokenId+" "+atomData.name,
        "description": description(tokenId,atomData.atomicNumber,atomData.name,atomData.ion_charge),
        "image": getImageUrl(tokenId),
    }
    if(atomData.ion_charge !== 0){
        let ion_charge = atomData.ion_charge;
        if(ion_charge > 0){
            ion_charge = "+"+ion_charge;
        }
        metadata.ion_charge = ion_charge;
    }
    metadata.period = atomData.period+" ("+atomData.period_counter+")";
    metadata.group = atomData.group+" ("+atomData.group_counter+")";
    metadata.category = atomData.category+" ("+atomData.category_counter+")";

    metadata.generation = generationOf(tokenId);


    return metadata;
}

function getImageUrl(tokenId){
    return "http://www.test.com"//todo
}

function Mmetadata(tokenId,atomData){
    if(tokenId === 1) return {
        "name": "#1 Genesis",
        "description": description(tokenId,0,"",0),
        "image": getImageUrl(tokenId),
    }


    let attributes = [
        {
            "trait_type": "Generation",
            "value": generationOf(tokenId)
        },

    ]
    if(atomData.ion_charge !== 0){
        let ion_charge = atomData.ion_charge;
        if(ion_charge > 0){
            ion_charge = "+"+ion_charge;
        }
        attributes.push({
            "trait_type": "Ion Charge",
            "value":ion_charge
        });
    }

    attributes.push({
        "trait_type": "Period",
        "value": atomData.period+" ("+atomData.period_counter+")"
    });
    if(atomData.group !== 1){
        attributes.push({
            "trait_type": "Group",
            "value": atomData.group+" ("+atomData.group_counter+")"
        });
    }
    attributes.push({
        "trait_type": "Category",
        "value": atomData.category+" ("+atomData.category_counter+")"
    });

    return {
        "name": "#"+tokenId+" "+atomData.name,
        "description": description(tokenId,atomData.atomicNumber,atomData.name,atomData.ion_charge),
        "attributes": attributes,
        "image": getImageUrl(tokenId)
    }
}

function getElement(atomicNumber){
    if(atomicNumber > 0 && atomicNumber <= 118){
        return {
            atomicNumber,
            symbol:     elementData[atomicNumber][0],
            name:       elementData[atomicNumber][1],
            mass:       elementData[atomicNumber][3],
            category:   categories[elementData[atomicNumber][2]],
            group:      elementData[atomicNumber][4],
            period:      elementData[atomicNumber][5],

            category_counter:   elementData[atomicNumber][6]+"/"+category_counter[elementData[atomicNumber][2]],
            group_counter:      elementData[atomicNumber][7]+"/"+group_counter[elementData[atomicNumber][4]],
            period_counter:      elementData[atomicNumber][8]+"/"+period_counter[elementData[atomicNumber][5]],


        }
    }else if(atomicNumber === 0){
        return {
            atomicNumber,
            symbol:     "Genesis",
            name:       "Creation",
            mass:       "∞",
            category:   "The Beginning",
        }
    }else{
        return {
            atomicNumber,
            symbol:     "ERROR",
            name:       "ERROR",
            mass:       "ERROR",
            category:   "ERROR",
        }
    }
}
const categories = {
    0: "Reactive nonmetal",
    1: "Noble gas",
    2: "Alkali metal",
    3: "Alkaline earth metal",
    4: "Metalloid",
    5: "Post-transition metal",
    6: "Transition Metal",
    7: "Lanthanide",
    8: "Actinide",
    9: "Unknown",
}



const elementData = {
    1	:["H","Hydrogen",       0,"1.008"       ,	1	,	1],
    2	:["He","Helium",        1,"4.003"       ,	18	,	1],
    3	:["Li","Lithium",       2,"6.941"       ,	1	,	2],
    4	:["Be","Beryllium",     3,"9.012"       ,	2	,	2],
    5	:["B","Boron",          4,"10.811"      ,	13	,	2],
    6	:["C","Carbon",         0,"12.011"      ,	14	,	2],
    7	:["N","Nitrogen",       0,"14.007"      ,	15	,	2],
    8	:["O","Oxygen",         0,"15.999"      ,	16	,	2],
    9	:["F","Fluorine",       0,"18.998"      ,	17	,	2],
    10	:["Ne","Neon",          1,"20.18"       ,	18	,	2],
    11	:["Na","Sodium",        2,"22.99"       ,	1	,	3],
    12	:["Mg","Magnesium",     3,"24.305"      ,	2	,	3],
    13	:["Al","Aluminium",     5,"26.982"      ,	13	,	3],
    14	:["Si","Silicon",       4,"28.086"      ,	14	,	3],
    15	:["P","Phosphorus",     0,"30.974"      ,	15	,	3],
    16	:["S","Sulphur",        0,"32.065"      ,	16	,	3],
    17	:["Cl","Chlorine",      0,"35.453"      ,	17	,	3],
    18	:["Ar","Argon",         1,"39.948"      ,	18	,	3],
    19	:["K","Potassium",      2,"39.098"      ,	1	,	4],
    20	:["Ca","Calcium",       3,"40.078"      ,	2	,	4],
    21	:["Sc","Scandium",      6,"44.956"      ,	3	,	4],
    22	:["Ti","Titanium",      6,"47.867"      ,	4	,	4],
    23	:["V","Vanadium",       6,"50.942"      ,	5	,	4],
    24	:["Cr","Chromium",      6,"51.996"      ,	6	,	4],
    25	:["Mn","Manganese",     6,"54.938"      ,	7	,	4],
    26	:["Fe","Iron",          6,"55.845"      ,	8	,	4],
    27	:["Co","Cobalt",        6,"58.933"      ,	9	,	4],
    28	:["Ni","Nickel",        6,"58.693"      ,	10	,	4],
    29	:["Cu","Copper",        6,"63.546"      ,	11	,	4],
    30	:["Zn","Zinc",          6,"65.39"       ,	12	,	4],
    31	:["Ga","Gallium",       5,"69.723"      ,	13	,	4],
    32	:["Ge","Germanium",     4,"72.64"       ,	14	,	4],
    33	:["As","Arsenic",       4,"74.922"      ,	15	,	4],
    34	:["Se","Selenium",      0,"78.96"       ,	16	,	4],
    35	:["Br","Bromine",       0,"79.904"      ,	17	,	4],
    36	:["Kr","Krypton",       1,"83.8"        ,	18	,	4],
    37	:["Rb","Rubidium",      2,"85.468"      ,	1	,	5],
    38	:["Sr","Strontium",     3,"87.62"       ,	2	,	5],
    39	:["Y","Yttrium",        6,"88.906"      ,	3	,	5],
    40	:["Zr","Zirconium",     6,"91.224"      ,	4	,	5],
    41	:["Nb","Niobium",       6,"92.906"      ,	5	,	5],
    42	:["Mo","Molybdenum",    6,"95.94"       ,	6	,	5],
    43	:["Tc","Technetium",    6,"98"          ,	7	,	5],
    44	:["Ru","Ruthenium",     6,"101.07"      ,	8	,	5],
    45	:["Rh","Rhodium",       6,"102.906"     ,	9	,	5],
    46	:["Pd","Palladium",     6,"106.42"      ,	10	,	5],
    47	:["Ag","Silver",        6,"107.868"     ,	11	,	5],
    48	:["Cd","Cadmium",       6,"112.411"     ,	12	,	5],
    49	:["In","Indium",        5,"114.818"     ,	13	,	5],
    50	:["Sn","Tin",           5,"118.71"      ,	14	,	5],
    51	:["Sb","Antimony",      4,"121.76"      ,	15	,	5],
    52	:["Te","Tellurium",     4,"127.6"       ,	16	,	5],
    53	:["I","Iodine",         0,"126.905"     ,	17	,	5],
    54	:["Xe","Xenon",         1,"131.293"     ,	18	,	5],
    55	:["Cs","Caesium",       2,"132.906"     ,	1	,	6],
    56	:["Ba","Barium",        3,"137.327"     ,	2	,	6],
    57	:["La","Lanthanum",     7,"138.906"     ,	0	,	6],
    58	:["Ce","Cerium",        7,"140.116"     ,	0	,	6],
    59	:["Pr","Praseodymium",  7,"140.908"     ,	0	,	6],
    60	:["Nd","Neodymium",     7,"144.24"      ,	0	,	6],
    61	:["Pm","Promethium",    7,"145"         ,	0	,	6],
    62	:["Sm","Samarium",      7,"150.36"      ,	0	,	6],
    63	:["Eu","Europium",      7,"151.964"     ,	0	,	6],
    64	:["Gd","Gadolinium",    7,"157.25"      ,	0	,	6],
    65	:["Tb","Terbium",       7,"158.925"     ,	0	,	6],
    66	:["Dy","Dysprosium",    7,"162.5"       ,	0	,	6],
    67	:["Ho","Holmium",       7,"164.93"      ,	0	,	6],
    68	:["Er","Erbium",        7,"167.259"     ,	0	,	6],
    69	:["Tm","Thulium",       7,"168.934"     ,	0	,	6],
    70	:["Yb","Ytterbium",     7,"173.04"      ,	0	,	6],
    71	:["Lu","Lutetium",      7,"174.967"     ,	3	,	6],
    72	:["Hf","Hafnium",       6,"178.49"      ,	4	,	6],
    73	:["Ta","Tantalum",      6,"180.948"     ,	5	,	6],
    74	:["W","Tungsten",       6,"183.84"      ,	6	,	6],
    75	:["Re","Rhenium",       6,"186.207"     ,	7	,	6],
    76	:["Os","Osmium",        6,"190.23"      ,	8	,	6],
    77	:["Ir","Iridium",       6,"192.217"     ,	9	,	6],
    78	:["Pt","Platinum",      6,"195.078"     ,	10	,	6],
    79	:["Au","Gold",          6,"196.967"     ,	11	,	6],
    80	:["Hg","Mercury",       6,"200.59"      ,	12	,	6],
    81	:["Tl","Thallium",      5,"204.383"     ,	13	,	6],
    82	:["Pb","Lead",          5,"207.2"       ,	14	,	6],
    83	:["Bi","Bismuth",       5,"208.98"      ,	15	,	6],
    84	:["Po","Polonium",      5,"209"         ,	16	,	6],
    85	:["At","Astatine",      4,"210"         ,	17	,	6],
    86	:["Rn","Radon",         1,"222"         ,	18	,	6],
    87	:["Fr","Francium",      2,"223"         ,	1	,	7],
    88	:["Ra","Radium",        3,"226"         ,	2	,	7],
    89	:["Ac","Actinium",      8,"227"         ,	0	,	7],
    90	:["Th","Thorium",       8,"232.038"     ,	0	,	7],
    91	:["Pa","Protactinium",  8,"231.036"     ,	0	,	7],
    92	:["U","Uranium",        8,"238.029"     ,	0	,	7],
    93	:["Np","Neptunium",     8,"237"         ,	0	,	7],
    94	:["Pu","Plutonium",     8,"244"         ,	0	,	7],
    95	:["Am","Americium",     8,"243"         ,	0	,	7],
    96	:["Cm","Curium",        8,"247"         ,	0	,	7],
    97	:["Bk","Berkelium",     8,"247"         ,	0	,	7],
    98	:["Cf","Californium",   8,"251"         ,	0	,	7],
    99	:["Es","Einsteinium",   8,"252"         ,	0	,	7],
    100	:["Fm","Fermium",       8,"257"         ,	0	,	7],
    101	:["Md","Mendelevium",   8,"258"         ,	0	,	7],
    102	:["No","Nobelium",      8,"259"         ,	0	,	7],
    103	:["Lr","Lawrencium",    8,"262"         ,	3	,	7],
    104	:["Rf","Rutherfordium", 6,"261"         ,	4	,	7],
    105	:["Db","Dubnium",       6,"262"         ,	5	,	7],
    106	:["Sg","Seaborgium",    6,"266"         ,	6	,	7],
    107	:["Bh","Bohrium",       6,"264"         ,	7	,	7],
    108	:["Hs","Hassium",       6,"277"         ,	8	,	7],
    109	:["Mt","Meitnerium",    9,"268"         ,	9	,	7],
    110	:["Ds","Darmstadtium",  9,"281"         ,	10	,	7],
    111	:["Rg","Roentgenium",   9,"282"         ,	11	,	7],
    112	:["Cn","Copernicium",   9,"285"         ,	12	,	7],
    113	:["Nh","Nihonium",      9,"286"         ,	13	,	7],
    114	:["Fl","Flerovium",     9,"289"         ,	14	,	7],
    115	:["Mc","Moscovium",     9,"290"         ,	15	,	7],
    116	:["Lv","Livermorium",   9,"293"         ,	16	,	7],
    117	:["Ts","Tennessine",    9,"294"         ,	17	,	7],
    118	:["Og","Oganesson",     9,"296"         ,	18	,	7]
}

let category_counter = {};
let group_counter = {};
let period_counter = {};

for(let i = 1; i <= 118; i++){
    let e = elementData[i];
    let category = e[2];
    let group = e[4];
    let period = e[5];

    if(!category_counter[category]){
        category_counter[category] = 1;
    }else{
        category_counter[category]++;
    }
    if(!group_counter[group]){
        group_counter[group] = 1;
    }else{
        group_counter[group]++;
    }
    if(!period_counter[period]){
        period_counter[period] = 1;
    }else{
        period_counter[period]++;
    }

    elementData[i].push(category_counter[category]);
    elementData[i].push(group_counter[group]);
    elementData[i].push(period_counter[period]);

}


function description(tokenId,atomicNumber,name,charge){
    let description = "";
    if(tokenId === 1){
        description = "The genesis token, the first token ever";
    }else{
        let article;
        if([8,13,18,26,33,49,51,53,68,76,77,85,89,95,118].includes(atomicNumber)){
            article = "An ";
        }else{
            article = "A ";
        }
        charge = parseInt(charge);
        let form;
        if(charge === 0){
            form = " atom,";
        }else {
            if(charge > 0){
                charge = "+"+charge;
            }else{
                charge = String(charge);
            }
            form = " ion with "+charge+" charge,"
        }
        description = article+name+form;
    }

    return description+" created with Proof of Work NFT mining.";
}


module.exports = {
    parseHash,
    Metadata,
    getIons
}