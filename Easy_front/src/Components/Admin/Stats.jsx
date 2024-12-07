import Adminheader from "./Adminheader";
import Adminsidebar from "./Adminsidebar";
import ApexCharts from "apexcharts";
import coursierService from "../../services/coursierService";
import React, { useState, useEffect } from "react";
import 'flowbite';
// Options pour le graphique en camembert
const getPieChartOptions = () => {
  return {
    series: [40, 25, 15, 10, 10],
    colors: [
      "#223E8C", // Maritime
      "#1393A5", // Plateaux
      "#6A37D8", // Centrale
      "#F58D4E", // Kara
      "#B23A6B"  // Savanes
    ],
    chart: {
      height: 420,
      width: "100%",
      type: "pie",
      background: '#ffffff' // Ajout du fond blanc ici
    },
    stroke: {
      colors: ["white"],
    },
    plotOptions: {
      pie: {
        size: "100%",
        dataLabels: {
          offset: -25,
        },
      },
    },
    labels: ["Maritime", "Plateaux", "Centrale", "Kara", "Savanes"],
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
  };
};



// Options pour le graphique en donut
const getDonutChartOptions = () => {
  return {
    series: [35.1, 23.5, 2.4, 5.4],
    colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694"],
    chart: {
      height: 320,
      width: "100%",
      type: "donut",
      background: '#ffffff' // Ajout du fond blanc
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "Visiteurs uniques", // Traduction en français
              formatter: (w) => {
                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return `${sum}k`; // Vous pouvez ajuster ce format si besoin
              },
            },
          },
          size: "80%",
        },
      },
    },
    labels: ["Direct", "Sponsor", "Affiliation", "Marketing par e-mail"], // Traduction des labels
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
  };
};


// Options pour le graphique avec suivi des colis
const getSalesChartOptions = () => {
  return {
    xaxis: {
      show: true,
      // On peut garder les dates ou les remplacer par des jours au format FR si nécessaire
      categories: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
        },
        // On n'utilise plus de format monétaire, juste le nombre de colis
        formatter: (value) => `${value} colis`,
      },
    },
    series: [
      {
        name: "Colis en attente",
        data: [20, 25, 22, 28, 30, 27, 26],
        color: "#1A56DB", // Couleur bleue
      },
      {
        name: "Colis trackés",
        data: [10, 12, 15, 18, 16, 20, 22],
        color: "#7E3BF2", // Couleur violette
      },
      {
        name: "Colis livrés",
        data: [5, 8, 10, 12, 15, 14, 16],
        color: "#16BDCA", // Couleur bleue-verte
      },
    ],
    chart: {
      sparkline: {
        enabled: false,
      },
      height: "100%",
      width: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: true,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    legend: {
      show: true, // On peut afficher la légende pour distinguer les séries
      fontFamily: "Inter, sans-serif",
      position: "bottom",
    },
    grid: {
      show: false,
    },
  };
};



  function Stats() {
    // Déclare l'état pour l'onglet actif
  const [activeTab, setActiveTab] = useState("destination");

    const [coursiers, setCoursiers] = useState([]);
    const [selectedCoursier, setSelectedCoursier] = useState(null);
  
    useEffect(() => {
      // Remplacer par ta fonction de récupération des coursiers
      const fetchCoursiers = async () => {
        try {
          const response = await coursierService.getAllCoursiers();
          setCoursiers(response.data);
          
          // Par défaut, on sélectionne le premier coursier de la liste
          if (response.data.length > 0) {
            setSelectedCoursier(response.data[0]._id);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des coursiers", error);
        }
      };
      
      fetchCoursiers();
    }, []);
  
    const handleCoursierSelection = (e, coursierId) => {
      setSelectedCoursier(coursierId); // Met à jour le coursier sélectionné
    };
  
    const selectedCoursierData = coursiers.find(c => c._id === selectedCoursier);
  

    useEffect(() => {
      const pieChartContainer = document.getElementById("pie-chart");
      const donutChartContainer = document.getElementById("donut-chart");
      const salesChartContainer = document.getElementById("labels-chart");
  
      // Instances des graphiques
      let pieChart, donutChart, salesChart;
  
      if (pieChartContainer) {
        pieChart = new ApexCharts(pieChartContainer, getPieChartOptions());
        pieChart.render();
      }
  
      if (donutChartContainer) {
        donutChart = new ApexCharts(donutChartContainer, getDonutChartOptions());
        donutChart.render();
      }
  
      if (salesChartContainer) {
        salesChart = new ApexCharts(salesChartContainer, getSalesChartOptions());
        salesChart.render();
      }
  
      // Nettoyer les graphiques au démontage du composant
      return () => {
        if (pieChart) pieChart.destroy();
        if (donutChart) donutChart.destroy();
        if (salesChart) salesChart.destroy();
      };
    }, []);
  
  return (
    <section className="relative bg-gray-50 dark:bg-gray-100 p-3 sm:p-5">
      <Adminheader />
      <Adminsidebar />
        {/* Section pour les cartes */}
        <div className="grid grid-cols-5 sm:grid-cols-5 lg:grid-cols-5 gap-10 mt-20 ml-64">
               {/* Cartes */}
         <div className="relative p-6 bg-white shadow-md rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/50 w-full h-full">
          <div className="absolute top-2 right-2">
            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000">
              <path d="M446.67-163.67V-461l-260-150.33V-314l260 150.33Zm66.66 0 260-150.33v-298l-260 151v297.33ZM446.67-87 153.33-256q-15.66-9-24.5-24.33-8.83-15.34-8.83-33.34v-332.66q0-18 8.83-33.34 8.84-15.33 24.5-24.33l293.34-169q15.66-9 33.33-9 17.67 0 33.33 9l293.34 169q15.66 9 24.5 24.33 8.83 15.34 8.83 33.34v332.66q0 18-8.83 33.34-8.84 15.33-24.5 24.33L513.33-87q-15.66 9-33.33 9-17.67 0-33.33-9Zm196-526 93.66-54L480-815.33 386-761l256.67 148ZM480-518l95.33-55.67-257-148.33L223-667l257 149Z"/>
            </svg>
          </div>
          <h3 className="text-xl text-gray-500 font-thin">Colis Traités</h3>
          <p className="text-2xl font-bold text-blue-500">362</p>
          <p className="text-green-500">+12</p>
        </div>
         {/* Carte pour les Colis Livrés */}
         <div className="relative p-6 bg-white shadow-md rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/50 w-full h-full">
          <div className="absolute top-2 right-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M285.33-241.33 60.67-466l47.66-47.33L285.67-336 333-288.67l-47.67 47.34Zm188.67 0L249.33-466l47.34-47.67L474-336.33 852.67-715 900-667.33l-426 426ZM474-430l-47.67-47.33 237.34-237.34 47.66 47.34L474-430Z"/></svg>
          </div>
          <h3 className="text-xl text-gray-500 font-thin">Colis Livrés</h3>
          <p className="text-2xl font-bold text-blue-500">362</p>
          <p className="text-green-500">+12</p>
        </div>
       {/* Carte pour les Colis en Transit */}
        <div className="relative p-6 bg-white shadow-md rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/50 w-full h-full">
          <div className="absolute top-2 right-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M312-146.67h336v-124.66q0-70-49-118.67t-119-48.67q-70 0-119 48.67t-49 118.67v124.66ZM160-80v-66.67h85.33v-124.66q0-67.67 36.17-124.17t97.17-84.5q-61-28.67-97.17-85.17t-36.17-124.16v-124H160V-880h640v66.67h-85.33v124q0 67.66-36.17 124.16T581.33-480q61 28 97.17 84.5t36.17 124.17v124.66H800V-80H160Z"/></svg>
          </div>
          <h3 className="text-xl text-gray-500 font-thin">Colis en Transit</h3>
          <p className="text-2xl font-bold text-blue-500">362</p>
          <p className="text-green-500">+12</p>
        </div>
        {/* Carte pour les Comptes Inactifs */}
        <div className="relative p-6 bg-white shadow-md rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/50 w-full h-full">
          <div className="absolute top-2 right-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M799.88-526.67q-14.21 0-23.71-9.61-9.5-9.62-9.5-23.84 0-14.21 9.61-23.71 9.62-9.5 23.84-9.5 14.21 0 23.71 9.61 9.5 9.62 9.5 23.84 0 14.21-9.61 23.71-9.62 9.5-23.84 9.5Zm-33.21-120v-186.66h66.66v186.66h-66.66ZM360-480.67q-66 0-109.67-43.66Q206.67-568 206.67-634t43.66-109.67Q294-787.33 360-787.33t109.67 43.66Q513.33-700 513.33-634t-43.66 109.67Q426-480.67 360-480.67ZM40-160v-100q0-34.67 17.5-63.17T106.67-366q70.66-32.33 130.89-46.5 60.22-14.17 122.33-14.17T482-412.5q60 14.17 130.67 46.5 31.66 15 49.5 43.17Q680-294.67 680-260v100H40Zm66.67-66.67h506.66V-260q0-14.33-7.83-27t-20.83-19q-65.34-31-116.34-42.5T360-360q-57.33 0-108.67 11.5Q200-337 134.67-306q-13 6.33-20.5 19t-7.5 27v33.33ZM360-547.33q37 0 61.83-24.84Q446.67-597 446.67-634t-24.84-61.83Q397-720.67 360-720.67t-61.83 24.84Q273.33-671 273.33-634t24.84 61.83Q323-547.33 360-547.33Zm0-86.67Zm0 407.33Z"/></svg>
          </div>
          <h3 className="text-xl text-gray-500 font-thin">Comptes Inactifs</h3>
          <p className="text-2xl font-bold text-blue-500">362</p>
          <p className="text-red-500">+12</p>
        </div>
        {/* Carte pour les Utilisateurs Inscrits */}
        <div className="relative p-6 bg-white shadow-md rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-blue-500/50 w-full h-full">
          <div className="absolute top-2 right-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000000"><path d="M80-160v-100q0-33.67 17-62.33Q114-351 146.67-366q65-30 126.33-45.33 61.33-15.34 127-15.34 29.33 0 60.5 3.34Q491.67-420 523.33-412l-56 56q-17-2-33.5-3T400-360q-62.33 0-112.83 12.67-50.5 12.66-112.5 41.33-14.34 7-21.17 20-6.83 13-6.83 26v33.33h296L509.33-160H80Zm544 16L484-284l46.67-46.67L624-237.33l209.33-209.34L880-400 624-144ZM400-481.33q-66 0-109.67-43.67-43.66-43.67-43.66-109.67t43.66-109.66Q334-788 400-788t109.67 43.67q43.66 43.66 43.66 109.66T509.67-525Q466-481.33 400-481.33Zm42.67 254.66ZM400-548q37 0 61.83-24.83 24.84-24.84 24.84-61.84t-24.84-61.83Q437-721.33 400-721.33t-61.83 24.83q-24.84 24.83-24.84 61.83t24.84 61.84Q363-548 400-548Zm0-86.67Z"/></svg>
          </div>
          <h3 className="text-xl text-gray-500 font-thin">Utilisateurs Inscrits</h3>
          <p className="text-2xl font-bold text-blue-500">362</p>
          <p className="text-green-500">+12</p>
        </div>
      </div>

      <div className="flex justify-start items-start gap-4 mx-auto mt-4">
     {/* graphique 1 */}
<div className="max-w-sm w-full bg-white rounded-lg shadow p-3 ml-64">
  <div className="py-6" id="pie-chart"></div>
  
  <div className="flex justify-between items-start w-full">
    <div className="flex-col items-center">
      <div className="flex items-center mb-1">
        <h5 className="text-xl font-thin leading-none text-gray-900 dark:text-black me-1">Trafic du  site</h5>
        <svg data-popover-target="chart-info" data-popover-placement="bottom" className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z"/>
        </svg>
        <div data-popover id="chart-info" role="tooltip" className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
          <div className="p-3 space-y-2">
            <h3 className="font-semibold text-gray-900 dark:text-white">Activity growth - Incremental</h3>
            <p>Report helps navigate cumulative growth of community activities. Ideally, the chart should have a growing trend, as stagnating chart signifies a significant decrease of community activity.</p>
            <h3 className="font-semibold text-gray-900 dark:text-white">Calculation</h3>
            <p>For each date bucket, the all-time volume of activities is calculated. This means that activities in period n contain all activities up to period n, plus the activities generated by your community in period.</p>
            <a href="#" className="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">Read more 
              <svg className="w-2 h-2 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
            </a>
          </div>
          <div data-popper-arrow></div>
        </div>
      </div>
    </div>
    <button id="dateRangeButton" data-dropdown-toggle="dateRangeDropdown" data-dropdown-ignore-click-outside-class="datepicker" type="button" className="inline-flex items-center text-blue-700 dark:text-blue-600 font-medium hover:underline">
      31 Nov - 31 Dev 
      <svg className="w-3 h-3 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
      </svg>
    </button>
    <div id="dateRangeDropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-80 lg:w-96 dark:bg-gray-700 dark:divide-gray-600">
      <div className="p-3" aria-labelledby="dateRangeButton">
        <div date-rangepicker datepicker-autohide className="flex items-center">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg>
            </div>
            <input name="start" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Date début" />
          </div>
          <span className="mx-2 text-gray-500 dark:text-gray-400">à</span>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
              </svg>
            </div>
            <input name="end" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Date fin" />
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div className="flex justify-end items-center">
    <button id="widgetDropdownButton" data-dropdown-toggle="widgetDropdown" data-dropdown-placement="bottom" type="button"  className="inline-flex items-center justify-center text-gray-500 w-8 h-8 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm">
      <svg className="w-3.5 h-3.5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
      </svg><span className="sr-only">Open dropdown</span>
    </button>
    <div id="widgetDropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="widgetDropdownButton">
        <li>
          <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.418 17.861 1 20l2.139-6.418m4.279 4.279 10.7-10.7a3.027 3.027 0 0 0-2.14-5.165c-.802 0-1.571.319-2.139.886l-10.7 10.7m4.279 4.279-4.279-4.279m2.139 2.14 7.844-7.844m-1.426-2.853 4.279 4.279"/>
            </svg>Edit widget
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
              <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
            </svg>Download data
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m5.953 7.467 6.094-2.612m.096 8.114L5.857 9.676m.305-1.192a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0ZM17 3.84a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0Zm0 10.322a2.581 2.581 0 1 1-5.162 0 2.581 2.581 0 0 1 5.162 0Z"/>
            </svg>Add to repository
          </a>
        </li>
        <li>
          <a href="#" className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            <svg className="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
              <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z"/>
            </svg>Delete widget
          </a>
        </li>
      </ul>
    </div>
  </div>

  <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
    <div className="flex justify-between items-center pt-5">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="lastDaysdropdown"
        data-dropdown-placement="bottom"
        className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center hover:text-blue"
        type="button">
        Last 7 days
        <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>
      <div id="lastDaysdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Yesterday</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Today</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 7 days</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 30 days</a>
          </li>
          <li>
            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Last 90 days</a>
          </li>
        </ul>
      </div>
      <a
        href="#"
        className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
        Analyse du trafic
        <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
        </svg>
      </a>
    </div>
  </div>
</div>

   {/* graphique 2 */}
<div className="max-w-sm w-full bg-white rounded-lg shadow p-3">
  <div className="flex justify-between mb-3">
    <div className="flex justify-center items-center">
      <h5 className="text-xl font-thin leading-none text-gray-900 dark:text-black pe-1">Trafic du site</h5>
      <svg data-popover-target="chart-info" data-popover-placement="bottom" className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z"/>
      </svg>
      <div data-popover id="chart-info" role="tooltip" className="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
        <div className="p-3 space-y-2">
          <h3 className="font-semibold text-gray-900 dark:text-white">Croissance de l'activité - Incrémental</h3>
          <p>Ce rapport aide à naviguer dans la croissance cumulative des activités de la communauté. Idéalement, le graphique devrait montrer une tendance à la hausse, car une stagnation indiquerait une baisse significative de l'activité.</p>
          <h3 className="font-semibold text-gray-900 dark:text-white">Calcul</h3>
          <p>Pour chaque intervalle de dates, le volume total des activités est calculé. Cela signifie que les activités de la période n comprennent toutes les activités jusqu'à la période n, plus celles générées par votre communauté durant la période.</p>
          <a href="#" className="flex items-center font-medium text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:underline">En savoir plus
            <svg className="w-2 h-2 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
          </a>
        </div>
        <div data-popper-arrow></div>
      </div>
    </div>
    <div>
      <button type="button" data-tooltip-target="data-tooltip" data-tooltip-placement="bottom" className="hidden sm:inline-flex items-center justify-center text-gray-500 w-8 h-8 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm">
        <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
        </svg>
        <span className="sr-only">Télécharger CSV</span>
      </button>
      <div id="data-tooltip" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
        Télécharger CSV
        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
    </div>
  </div>

  <div>
    <div className="flex" id="devices">
      <div className="flex items-center me-4">
        <input id="desktop" type="checkbox" value="desktop" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        <label htmlFor="desktop" className="ms-2 text-sm font-medium text-gray-900 dark:text-black">Ordinateur</label>
      </div>
      <div className="flex items-center me-4">
        <input id="tablet" type="checkbox" value="tablet" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        <label htmlFor="tablet" className="ms-2 text-sm font-medium text-gray-900 dark:text-black">Tablette</label>
      </div>
      <div className="flex items-center me-4">
        <input id="mobile" type="checkbox" value="mobile" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        <label htmlFor="mobile" className="ms-2 text-sm font-medium text-gray-900 dark:text-black">Mobile</label>
      </div>
    </div>
  </div>

  <div className="py-6" id="donut-chart"></div>

  <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between">
    <div className="flex justify-between items-center pt-5">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="lastDaysdropdown"
        data-dropdown-placement="bottom"
        className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-black"
        type="button">
        Derniers 7 jours
        <svg className="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>
      <div id="lastDaysdropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Hier</a></li>
          <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Aujourd'hui</a></li>
          <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Derniers 7 jours</a></li>
          <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Derniers 30 jours</a></li>
          <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Derniers 90 jours</a></li>
        </ul>
      </div>
      <a
        href="#"
        className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
        Analyse du trafic
        <svg className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
        </svg>
      </a>
    </div>
  </div>
</div>

<div className="max-w-2xl w-full bg-white rounded-lg shadow dark:bg-gray-800 p-3 ml-auto">
  <div className="flex justify-between p-4 md:p-6 pb-0 md:pb-0">
    <div>
      <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">Statistiques des colis</h5>
      <p className="text-base font-normal text-gray-500 dark:text-gray-400">Colis suivi cette semaine</p>
    </div>
    <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
      23%
      <svg
        className="w-3 h-3 ms-1"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13V1m0 0L1 5m4-4 4 4"
        />
      </svg>
    </div>
  </div>
  <div id="labels-chart" className="px-2.5"></div>
  <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5 p-4 md:p-6 pt-0 md:pt-0">
    <div className="flex justify-between items-center pt-5">
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="lastDaysdropdown"
        data-dropdown-placement="bottom"
        className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
        type="button"
      >
        Derniers 7 jours
        <svg
          className="w-2.5 m-2.5 ms-1.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <div
        id="lastDaysdropdown"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Hier</a></li>
          <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Aujourd'hui</a></li>
          <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Derniers 7 jours</a></li>
          <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Derniers 30 jours</a></li>
          <li><a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Derniers 90 jours</a></li>
        </ul>
      </div>
      <a
        href="#"
        className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2"
      >
        Rapport de colis
        <svg
          className="w-2.5 h-2.5 ms-1.5 rtl:rotate-180"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
      </a>
    </div>
  </div>
</div>

    </div>



    <div className="grid grid-cols-2 gap-4 max-w-5xl mx-64 mt-10">




 {/* Bloc de sélection des coursiers */}
 <div className="bg-white p-6 shadow-md rounded-lg">
        <div className="mb-6">
          <label
            htmlFor="coursier-select"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Sélectionner un coursier
          </label>

          {/* Dropdown button (Flowbite style) */}
          <button 
            id="dropdownDefaultButton" 
            data-dropdown-toggle="dropdown" 
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
            type="button"
          >
            {selectedCoursierData ? selectedCoursierData.completename : 'Sélectionner un coursier'} 
            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
            </svg>
          </button>

          {/* Dropdown menu */}
          <div 
            id="dropdown" 
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              {coursiers.map((coursier) => (
                <li key={coursier._id}>
                  <a 
                    href="#" 
                    onClick={(e) => handleCoursierSelection(e, coursier._id)} 
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {coursier.completename}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-between items-start">
          <img
            src= '/src/assets/19141.jpg' // Image du véhicule
            alt="Vehicle"
            className="w-96 h-90 object-cover rounded-md"
          />
        </div>

        <div className="flex justify-between mt-4 space-x-10">
          <div className="mr-2">
            <p className="text-gray-600">Imatriculation:</p>
            <p className="text-black">
  {selectedCoursierData && selectedCoursierData.vehic_id
    ? selectedCoursierData.vehic_id.immatriculation
    : 'Aucune immatriculation'}
</p>

          </div>
          <div className="mr-2">
          <p className="text-gray-600">Type véhicule:</p>
          <p className="text-black">
  {selectedCoursierData && selectedCoursierData.vehic_id 
    ? selectedCoursierData.vehic_id.type 
    : 'Type inconnu'}
</p>
          </div>
          <div className="mr-2">
    <p className="text-gray-600">Avis client</p>
          <div class="flex items-center">
    <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <svg class="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    </svg>
    <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-900">4.95</p>
    <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-900">/</p>
    <p class="ms-1 text-sm font-medium text-gray-500 dark:text-gray-900">5</p>
</div>
</div>


         
        </div>
      </div>

      <div className="bg-white p-6 shadow-md rounded-lg flex items-center space-x-6 w-[173%] pb-6">
  {/* Section gauche - Informations et contact du conducteur */}
  <div className="flex flex-col items-center space-y-4">
    <img
      src="/src/assets/man.jpg"
      alt="Driver"
      className="w-20 h-20 rounded-full object-cover"
    />
    <h4 className="text-base font-semibold text-black">
      {selectedCoursierData ? selectedCoursierData.completename : 'Cameron Williamson'}
    </h4>

    <div className="flex items-center space-x-2 text-xs text-gray-500">
      <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
      <span>Online</span>
    </div>
    <div className="w-full border-t border-gray-300 my-2"></div>

    <div className="flex space-x-4">
      <button className="flex items-center justify-center space-x-2 bg-white border border-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-100 transition text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000000">
          <path d="M760-480q0-117-81.5-198.5T480-760v-80q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480h-80Zm-160 0q0-50-35-85t-85-35v-80q83 0 141.5 58.5T680-480h-80Zm198 360q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/>
        </svg>
        <span>Call</span>
      </button>
      <button className="flex items-center justify-center space-x-2 bg-blue-500 text-white py-2 px-5 rounded-lg hover:bg-blue-600 transition text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF">
          <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/>
        </svg>
        <span>Message</span>
      </button>
    </div>
  </div>

  {/* Trait séparateur */}
  <div className="h-full border-l border-gray-300"></div>

    <div className="flex flex-col flex-grow space-y-4 -mt-44">
      {/* Barre de navigation avec onglets */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab("destination")}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "destination"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-700 border-b-2 border-transparent hover:text-blue-500 hover:border-blue-500"
            }`}
          >
            Prochaine Destination
          </button>
          <button
            onClick={() => setActiveTab("historique")}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "historique"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-700 border-b-2 border-transparent hover:text-blue-500 hover:border-blue-500"
            }`}
          >
            Historique de Livraison
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === "messages"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-700 border-b-2 border-transparent hover:text-blue-500 hover:border-blue-500"
            }`}
          >
            Messages du Coursier
          </button>
        </nav>
      </div>

      {/* Contenu de l'onglet sélectionné */}
      <div className="bg-gray-50 p-6 rounded-lg shadow">
        {activeTab === "destination" && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Prochaine Destination</h3>
            <p className="text-gray-700 mb-4">
              Votre prochaine destination est : <strong>123 Rue de la Paix, Paris</strong>.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-blue-100 p-4 rounded-lg shadow text-center">
                <p className="text-blue-600 font-semibold">Distance Restante</p>
                <p className="text-gray-900 font-bold text-2xl">0.542 km</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg shadow text-center">
                <p className="text-blue-600 font-semibold">Temps Estimé</p>
                <p className="text-gray-900 font-bold text-2xl">3 Min</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "historique" && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Historique de Livraison</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Colis #123 - Livré le 20/09/2024</li>
              <li>Colis #456 - Livré le 18/09/2024</li>
              <li>Colis #789 - En cours de livraison</li>
            </ul>
          </div>
        )}

        {activeTab === "messages" && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Messages du Coursier</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Message : Prêt pour la livraison !</li>
              <li>Message : Retard à cause de la circulation.</li>
            </ul>
          </div>
        )}
      </div>
    </div>

     </div>


</div>
   



    </section>
  );
}

export default Stats;