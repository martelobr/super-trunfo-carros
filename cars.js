// Dados das cartas de carro
const cartas = [
    {
        nome: "Porsche 911 Turbo S",
        imagem: "https://cdn.motor1.com/images/mgl/2MjWg/s1/2021-porsche-911-turbo-s-coupe-first-drive.jpg", 
        atributos: {
            velocidade: 330, // km/h
            potencia: 650,   // cv
            aceleracao: 2.7, // s (0-100 km/h)
            consumo: 8.5,    // km/l
            preco: 1500      // milhar de reais
        }
    },
    {
        nome: "Ferrari F8 Tributo",
        imagem: "https://autotijd.be/images/ferrari/2019/f8-tributo/nieuw/ferrari-f8-tributo-2019-nieuw-03.jpg",
        atributos: {
            velocidade: 340,
            potencia: 720,
            aceleracao: 2.9,
            consumo: 7.8,
            preco: 1700
        }
    },
    {
        nome: "Lamborghini Huracán Evo",
        imagem: "https://2.bp.blogspot.com/-G3ZzIa0mH8Q/XHsGpvU5ngI/AAAAAAAATWc/GLZ4xMIcXxQrSLskTMcbIV4NldRFz-ucACLcBGAs/s1600/Lamborghini-Hurac%25C3%25A1n-Evo-Spyder%2B%25282%2529.jpg",
        atributos: {
            velocidade: 325,
            potencia: 640,
            aceleracao: 2.9,
            consumo: 8.0,
            preco: 1600
        }
    },
    {
        nome: "McLaren 720S",
        imagem: "https://www.carscoops.com/wp-content/uploads/2021/07/McLaren-720S-2a.jpg",
        atributos: {
            velocidade: 341,
            potencia: 720,
            aceleracao: 2.8,
            consumo: 7.5,
            preco: 1800
        }
    },
    {
        nome: "Audi R8 V10 Performance",
        imagem: "https://www.motortrend.com/uploads/2022/06/2022-Audi-R8-V-10-Performance-RWD-9.jpg",
        atributos: {
            velocidade: 331,
            potencia: 620,
            aceleracao: 3.1,
            consumo: 6.9,
            preco: 1300
        }
    },
    {
        nome: "Nissan GT-R Nismo",
        imagem: "https://s1.1zoom.me/b5558/503/Nissan_GT-R_R35_Nismo_Worldwide_2019_White_576862_3840x2160.jpg",
        atributos: {
            velocidade: 315,
            potencia: 600,
            aceleracao: 2.5,
            consumo: 6.0,
            preco: 1100
        }
    },
    {
        nome: "Mercedes-AMG GT R",
        imagem: "https://cdn.motor1.com/images/mgl/QN6GO/s3/2018-mercedes-amg-gt-r-first-drive.jpg",
        atributos: {
            velocidade: 318,
            potencia: 585,
            aceleracao: 3.6,
            consumo: 7.2,
            preco: 1200
        }
    },
    {
        nome: "Chevrolet Corvette Z06",
        imagem: "http://www.dragtimes.com/images/27212-2015-Chevrolet-Corvette.jpg",
        atributos: {
            velocidade: 310,
            potencia: 670,
            aceleracao: 2.6,
            consumo: 6.5,
            preco: 900
        }
    },
    {
        nome: "BMW M5 Competition",
        imagem: "https://cdn.bmwblog.com/wp-content/uploads/2018/10/BMW-M5-Competition-AC-Schnitzer-14.jpg",
        atributos: {
            velocidade: 305,
            potencia: 625,
            aceleracao: 3.3,
            consumo: 9.0,
            preco: 800
        }
    },
    {
        nome: "Ford Mustang Shelby GT500",
        imagem: "https://images.carexpert.com.au/resize/3000/-/app/uploads/2022/08/2022-Ford-Mustang-Shelby-GT500-Code-Red-HERO.jpg",
        atributos: {
            velocidade: 290,
            potencia: 760,
            aceleracao: 3.5,
            consumo: 5.5,
            preco: 700
        }
    },
    {
        nome: "Toyota Supra (A90)",
        imagem: "https://www.tuningblog.eu/wp-content/uploads/2022/01/Toyota-Supra-A90-Widebody-Kit-Zacoe-14.jpg",
        atributos: {
            velocidade: 250,
            potencia: 387,
            aceleracao: 4.1,
            consumo: 12.0,
            preco: 450
        }
    },
    {
        nome: "Honda Civic Type R",
        imagem: "https://cdn.motor1.com/images/mgl/lPm76/s1/2017-honda-civic-type-r.jpg",
        atributos: {
            velocidade: 272,
            potencia: 320,
            aceleracao: 5.4,
            consumo: 10.5,
            preco: 300
        }
    }
];