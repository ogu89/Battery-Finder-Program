// ここから書いてください。
const battery =
    [{
        "batteryName": "WKL-78",
        "capacityAh": 2.3,
        "voltage": 14.4,
        "maxDraw": 3.2,
        "endVoltage": 10,
    },
    {
        "batteryName": "WKL-140",
        "capacityAh": 4.5,
        "voltage": 14.4,
        "maxDraw": 9.2,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-78",
        "capacityAh": 2.5,
        "voltage": 14.5,
        "maxDraw": 10,
        "endVoltage": 5,
    },
    {
        "batteryName": "Wmacro-140",
        "capacityAh": 3.6,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 5,
    },
    {
        "batteryName": "IOP-E78",
        "capacityAh": 6.6,
        "voltage": 14.4,
        "maxDraw": 10.5,
        "endVoltage": 8,
    },
    {
        "batteryName": "IOP-E140",
        "capacityAh": 9.9,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 10,
    },
    {
        "batteryName": "IOP-E188",
        "capacityAh": 13.2,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C65",
        "capacityAh": 4.9,
        "voltage": 14.8,
        "maxDraw": 4.9,
        "endVoltage": 11,
    },
    {
        "batteryName": "RYN-C85",
        "capacityAh": 6.3,
        "voltage": 14.4,
        "maxDraw": 6.3,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C140",
        "capacityAh": 9.8,
        "voltage": 14.8,
        "maxDraw": 10,
        "endVoltage": 12,
    },
    {
        "batteryName": "RYN-C290",
        "capacityAh": 19.8,
        "voltage": 14.4,
        "maxDraw": 14,
        "endVoltage": 12,
    }]
;

const camera =
    [{
        "brand": "Cakon",
        "model": "ABC 3000M",
        "powerConsumptionWh": 35.5,
    },
    {
        "brand": "Cakon",
        "model": "ABC 5000M",
        "powerConsumptionWh": 37.2,
    },
    {
        "brand": "Cakon",
        "model": "ABC 7000M",
        "powerConsumptionWh": 39.7,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9000M",
        "powerConsumptionWh": 10.9,
    },
    {
        "brand": "Cakon",
        "model": "ABC 9900M",
        "powerConsumptionWh": 15.7,
    },
    {
        "brand": "Go MN",
        "model": "UIK 110C",
        "powerConsumptionWh": 62.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 210C",
        "powerConsumptionWh": 64.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 230C",
        "powerConsumptionWh": 26.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 250C",
        "powerConsumptionWh": 15.3,
    },
    {
        "brand": "Go MN",
        "model": "UIK 270C",
        "powerConsumptionWh": 20.3,
    },
    {
        "brand": "VANY",
        "model": "CEV 1100P",
        "powerConsumptionWh": 22,
    },
    {
        "brand": "VANY",
        "model": "CEV 1300P",
        "powerConsumptionWh": 23,
    },
    {
        "brand": "VANY",
        "model": "CEV 1500P",
        "powerConsumptionWh": 24,
    },
    {
        "brand": "VANY",
        "model": "CEV 1700P",
        "powerConsumptionWh": 25,
    },
    {
        "brand": "VANY",
        "model": "CEV 1900P",
        "powerConsumptionWh": 26,
    }]
;

//console.log(battery);
//console.log(camera);

let brands = document.getElementById("brands")
let brandArr = [];
let models = document.getElementById("models")

camera.map(each=> {
    let brand = document.createElement("option");
    if(! brandArr.includes(each.brand)){
        brandArr.push(each.brand);
        brand.value = each.brand;
        brand.innerHTML = each.brand;
        brands.append(brand);
    }
});

function setModelOptions(){
    models.innerHTML = "";
    camera.map(each=>{
        if(each.brand == brands.value){
            let model = document.createElement("option")
            model.value = each.model;
            model.innerHTML =each.brand + ": " + each.model;
            models.append(model);
        }
    });
}



//maxDraw * endVoltage
//capacityAh * voltage

function setList(){
    let bList = document.getElementById("batteryList");
    bList.innerHTML = "";

    let currCamera = camera.find(object => object.model === models.value);
    let accesary = document.getElementById("accesary");

    let batteryList = [];
    battery.forEach(each=> {
        if( (each.maxDraw * each.endVoltage) > currCamera.powerConsumptionWh +Number(accesary.value)) batteryList.push(each);
    })

    batteryList.sort(function(a,b){

        let nameA = a.batteryName.toUpperCase();
        let nameB = b.batteryName.toUpperCase();
        let middleA = a.batteryName.search("-");
        let middleB = b.batteryName.search("-");

        nameA = nameA.substring(0, middleA);
        nameB = nameB.substring(0, middleB);


        if(nameA < nameB){
        return -1;
        }
        else if(nameA > nameB){
        return 1;
        }
        else{
            return (a.capacityAh > b.capacityAh) ? 1 : -1 ;
        }
            
        

    });



    batteryList.map(each => {

        let w =Math.floor(  (each.capacityAh * each.voltage) / (currCamera.powerConsumptionWh + Number(accesary.value)) *10)/10;

        let eachList=
        `
            <div class="border border-dark col-6 d-flex justify-content-between" >
                <p class="col d-flex justify-content-start">${each.batteryName}</p>
                <p class="col d-flex justify-content-end">Estimated ${w} hours on selected setup</p>
            <div>
        `;
        bList.innerHTML += eachList;

    })
}

//初期値
setModelOptions()
setList();