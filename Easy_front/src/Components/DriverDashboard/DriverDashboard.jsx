import { useNavigate } from 'react-router-dom';
import coursierService from '../../services/coursierService';
import React, { useEffect, useState } from 'react';
import MyGoogleMap from '../MyGoogleMap';
import coursesService from '../../services/coursesService';
import Colisrelaie from '../../assets/interchange.png';
import ColisLivress from '../../assets/ColisLivress.png';
import ColisAnnule from '../../assets/ColisAnnule.png';
import Solde from '../../assets/Solde.png';
import 'flowbite';

function DriverDashboard() {
  const navigate = useNavigate();
  const [coursier, setCoursier] = useState({ completename: '', email: '' });
  const [courses, setCourses] = useState([]); // État pour les courses
  const [activeSection, setActiveSection] = useState('dashboard');
  const [expandedCourses, setExpandedCourses] = useState({}); // Gestion des courses étendues
  const [successMessage, setSuccessMessage] = useState('');
  const [messages, setMessages] = useState([]); // État pour les messages
  const [selectedMessage, setSelectedMessage] = useState(null); // État pour le message sélectionné

  // Fonction pour gérer les options du message (Répondre, Transférer, etc.)
  const handleMessageOptions = (messageId) => {
    setSelectedMessage(messageId);
    console.log(`Options pour le message ${messageId} : Répondre, Transférer, etc.`);
    // Ici tu peux ajouter un menu avec des options
  };

  // Fonction pour répondre au message
  const handleReply = (messageId) => {
    console.log(`Répondre au message avec l'ID : ${messageId}`);
    // Implémenter l'ouverture d'un formulaire de réponse (par exemple, un textarea pour la réponse)
    alert("Répondre au message");
  };

  // Fonction pour transférer le message
  const handleForward = (messageId) => {
    console.log(`Transférer le message avec l'ID : ${messageId}`);
    // Implémenter la logique pour transférer un message à un autre utilisateur
    alert("Transférer le message");
  };

  // Utilisation des effets pour récupérer les informations du coursier et des courses
  useEffect(() => {
    const fetchCoursier = async () => {
      try {
        const response = await coursierService.getConnectedCoursier();
        setCoursier(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du coursier connecté', error);
      }
    };

    fetchCoursier();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (coursier._id) { // Vérifie que le coursier est disponible avant de récupérer les courses
          const response = await coursesService.getCoursesByCoursier(coursier._id);
          setCourses(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des courses', error);
      }
    };

    fetchCourses();
  }, [coursier._id]); // Dépendance sur l'ID du coursier pour récupérer les courses lorsqu'il est disponible

  const toggleCourseDetails = (courseId) => {
    setExpandedCourses((prevState) => ({
      ...prevState,
      [courseId]: !prevState[courseId], // Toggle visibility of details for this course
    }));
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleShowConfirmation = () => {
    navigate('/delevry');
  };

  const handleRelayRequest = () => {
    navigate('/relay');
  };

  const handleSidebarClick = (section) => {
    setActiveSection(section);
  };

  const handleValidateCourse = () => {
    setSuccessMessage('Course validée avec succès !');
    setTimeout(() => {
      setSuccessMessage('');
      setActiveSection('dashboard');
    }, 2000);
  };
    return (
    <div className="flex flex-col w-full">    
    <div className="antialiased bg-gray-50 dark:bg-gray-100">

      {/* debut de la nav qui regroupe le header */}
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
      <div className="flex flex-wrap justify-between items-center">


        {/* partie menu hamberger et barrre de recherche  */}
        <div className="flex justify-start items-center">

          <button
            data-drawer-target="drawer-navigation"
            data-drawer-toggle="drawer-navigation"
            aria-controls="drawer-navigation"
            className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              aria-hidden="true"
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Toggle sidebar</span>
          </button>



          <a href="/home" className="flex items-center justify-between mr-4">
            <img
              src="../src/assets/package.svg"
              className="mr-3 h-8"
              alt="EasyTrack"
            />
            <span className="self-center text-2xl font-thin whitespace-nowrap dark:text-white">EasyTrack</span>
          </a>
          <form action="#" method="GET" className="hidden md:block md:pl-2">
            <label htmlFor="topbar-search" className="sr-only">Search</label>
            <div className="relative  md:w-96">
              <div
                className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
              >
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                name="email"
                id="topbar-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Search"
              />
            </div>
          </form>
        </div>




        
        <div className="flex items-center lg:order-2">
          
          {/* pour le boutton de  cherche */}
          <button
            type="button"
            data-drawer-toggle="drawer-navigation"
            aria-controls="drawer-navigation"
            className="p-2 mr-1 text-gray-500 rounded-lg md:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Toggle search</span>
            <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
              <path clipRule="evenodd" fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
            </svg>
          </button>
  

   
          {/* <!-- partie des Notifications --> */}
          <button
            type="button"
            data-dropdown-toggle="notification-dropdown"
            className="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          >

            <span className="sr-only">View notifications</span>

            {/* <!-- Bell icon --> */}
            <svg
              aria-hidden="true"
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
              ></path>
            </svg>
          </button>
          {/* <!-- Dropdown menu --> */}

          <div
            className="hidden overflow-hidden z-50 my-4 max-w-sm text-lg list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700 rounded-xl"
            id="notification-dropdown"
          >

            <div
              className="block py-2 px-4 text-lg font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300"
            >
              Notifications
            </div>
            <div>
              <a
                href="#"
                className="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
              >
                <div className="flex-shrink-0">
                  <img
                    className="w-11 h-11 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                    alt="Bonnie Green avatar"
                  />
                  <div
                    className="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 dark:border-gray-700"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"
                      ></path>
                      <path
                        d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"
                      ></path>
                    </svg>
                  </div>
                </div>

                <div className="pl-3 w-full">
                  <div
                    className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"
                  >
                    New message from
                    <span className="font-thin text-gray-900 dark:text-white"
                      >Bonnie Green</span
                    >: "Hey, what's up? All set htmlFor the presentation?"
                  </div>
                  <div
                    className="text-xs font-medium text-primary-600 dark:text-primary-500"
                  >
                    a few moments ago
                  </div>
                </div>
              </a>
            </div>
            <a
              href="#"
              className="block py-2 text-md font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-600 dark:text-white dark:hover:underline"
            >
              <div className="inline-flex items-center">
                <svg
                  aria-hidden="true"
                  className="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                View all
              </div>
            </a>
          </div>
          {/* fin partie des notifications */}





          {/* <!-- debut  partie des Apps --> */}
          <button
            type="button"
            data-dropdown-toggle="apps-dropdown"
            className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <span className="sr-only">View notifications</span>
            {/* <!-- Icon --> */}
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              ></path>
            </svg>
          </button>
          {/* <!-- Dropdown menu --> */}
          <div
            className="hidden overflow-hidden z-50 my-4 max-w-sm text-lg list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:bg-gray-700 dark:divide-gray-600 rounded-xl"
            id="apps-dropdown"
          >
            <div
              className="block py-2 px-4 text-lg font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300"
            >
              Apps
            </div>
            <div className="grid grid-cols-3 gap-4 p-4">
            
         
              <a
                href="#"
                className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
              >
                <svg
                  aria-hidden="true"
                  className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div className="text-sm text-gray-900 dark:text-white">Inbox</div>
              </a>
              
              <a
                    href="#"
                    className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                  >
                    <svg
                      aria-hidden="true"
                      className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <div className="text-sm text-gray-900 dark:text-white">
                      Billing
                    </div>
                  </a>
             
              <a
                href="#"
                className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
              >
                <svg
                  aria-hidden="true"
                  className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div className="text-sm text-gray-900 dark:text-white">
                  Settings
                </div>
              </a>

            </div>
          </div>
          {/* fin de la partie reserver au app  */}
          



          {/* partie pour le profile de l'utilisateur */}
          <button
            type="button"
            className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="dropdown"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
              alt="user photo"
            />
          </button>


          {/* <!-- Dropdown menu --> */}
          <div
            className="hidden z-50 my-4 w-56 text-lg list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl"
            id="dropdown"
          >
            <div className="py-3 px-4">
              <span
                className="block text-sm font-thin text-gray-900 dark:text-white"
                > {coursier.completename || 'Nom inconnu'}</span
              >
              <span
                className="block text-sm text-gray-900 truncate dark:text-white"
                >{coursier.email || 'Email inconnu'}</span
              >
            </div>
            <ul
              className="py-1 text-gray-700 dark:text-gray-300"
              aria-labelledby="dropdown"
            >
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                  >My profile</a
                >
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                  >Account settings</a
                >
              </li>
            </ul>
            <ul
              className="py-1 text-gray-700 dark:text-gray-300"
              aria-labelledby="dropdown"
            >
              <li>
                <a
                  href="#"
                  className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  ><svg
                    className="mr-2 w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  My likes</a
                >
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  ><svg
                    className="mr-2 w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
                    ></path>
                  </svg>
                  Collections</a
                >
              </li>
              <li>

                <a
                  href="#"
                  className="flex justify-between items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <span className="flex items-center">
                    <svg
                      aria-hidden="true"
                      className="mr-2 w-5 h-5 text-primary-600 dark:text-primary-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Pro version
                  </span>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
            <ul
              className="py-1 text-gray-700 dark:text-gray-300"
              aria-labelledby="dropdown"
            >
              <li>
              <button
      onClick={handleLogout}
     className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 rounded-2xl"
      >
      Sign out
    </button>
              </li>
            </ul>
          </div>
          {/* fin de la patie reserver au profile*/}





        </div>
      </div>



    </nav>
    {/* fin de la nav */}

    {/* <!-- Sidebar --> */}

    <aside
      className="fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
        <form action="#" method="GET" className="md:hidden mb-2">
          <label htmlFor="sidebar-search" className="sr-only">Search</label>
          <div className="relative">
            <div
              className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
            >
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              name="search"
              id="sidebar-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Search"
            />
          </div>
        </form>


        <ul className="space-y-5">
          <li>
            <a
              href="#"
              onClick={() => handleSidebarClick('dashboard')}
              className="flex items-center font-thin p-2 text-lg  text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/></svg>
              <span className="ml-3">Tableau de bord</span>
            </a>
          </li>
          
      
          <li>
                <a
                  href="#"
                  onClick={() => handleSidebarClick('courses')}
                  className="flex items-center p-2 text-lg font-thin text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="30px" fill="#e8eaed"><path d="M280-160q-50 0-85-35t-35-85H60l18-80h113q17-19 40-29.5t49-10.5q26 0 49 10.5t40 29.5h167l84-360H182l4-17q6-28 27.5-45.5T264-800h456l-37 160h117l120 160-40 200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H400q0 50-35 85t-85 35Zm357-280h193l4-21-74-99h-95l-28 120Zm-19-273 2-7-84 360 2-7 34-146 46-200ZM20-427l20-80h220l-20 80H20Zm80-146 20-80h260l-20 80H100Zm180 333q17 0 28.5-11.5T320-280q0-17-11.5-28.5T280-320q-17 0-28.5 11.5T240-280q0 17 11.5 28.5T280-240Zm400 0q17 0 28.5-11.5T720-280q0-17-11.5-28.5T680-320q-17 0-28.5 11.5T640-280q0 17 11.5 28.5T680-240Z"/></svg>
                  <span className="ml-3">Courses</span>
                </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleSidebarClick('historique')}
              className="flex items-center p-2 text-lg font-thin text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
             <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z"/></svg>
              <span className="ml-3">Historique Livraison</span>
            </a>
          </li>
          
          <li>
            <a
              href="#"
              onClick={() => handleSidebarClick('messages')}
              className="flex items-center p-2 text-lg font-thin text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg>
           
              <span className="flex-1 ml-3 whitespace-nowrap">Messages</span>
              <span
                className="inline-flex justify-center items-center w-5 h-5 text-xs font-thin rounded-full text-primary-800 bg-primary-100 dark:bg-primary-200 dark:text-primary-800"
              >
                4
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleSidebarClick('statistiques')}
              className="flex items-center p-2 text-lg font-thin text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-280h80v-200h-80v200Zm320 0h80v-400h-80v400Zm-160 0h80v-120h-80v120Zm0-200h80v-80h-80v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>           
              <span className="flex-1 ml-3 whitespace-nowrap">Statistiques</span>
             
            </a>
          </li>
         
        </ul>


        <ul
          className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700"
        >
          <li>
            <a
              href="#"
              onClick={() => handleSidebarClick('docs')}
              className="flex items-center p-2 text-lg font-thin text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M320-440h320v-80H320v80Zm0 120h320v-80H320v80Zm0 120h200v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>
              <span className="ml-3">Docs</span>
            </a>
          </li>
         
          <li>
            <a
              href="#"
              onClick={() => handleSidebarClick('help')}
              className="flex items-center p-2 text-lg font-thin text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
            >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
              <span className="ml-3">Help</span>
            </a>
          </li>
        </ul>



      </div>
      <div
        className="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20"
      >
        <a
          href="#"
          className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <svg
            aria-hidden="true"
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"
            ></path>
          </svg>
        </a>
        <a
          href="#"
          data-tooltip-target="tooltip-settings"
          className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <svg
            aria-hidden="true"
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
        <div
          id="tooltip-settings"
          role="tooltip"
          className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-thin text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip"
        >
          Settings page
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button
          type="button"
          data-dropdown-toggle="language-dropdown"
          className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:hover:text-white dark:text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <svg
            aria-hidden="true"
            className="h-5 w-5 rounded-full mt-0.5"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 3900 3900"
          >
            <path fill="#b22234" d="M0 0h7410v3900H0z" />
            <path
              d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0"
              stroke="#fff"
              strokeWidth="300"
            />
            <path fill="#3c3b6e" d="M0 0h2964v2100H0z" />
            <g fill="#fff">
              <g id="d">
                <g id="c">
                  <g id="e">
                    <g id="b">
                      <path
                        id="a"
                        d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z"
                      />
                      <use xlinkHref="#a" y="420" />
                      <use xlinkHref="#a" y="840" />
                      <use xlinkHref="#a" y="1260" />
                    </g>
                    <use xlinkHref="#a" y="1680" />
                  </g>
                  <use xlinkHref="#b" x="247" y="210" />
                </g>
                <use xlinkHref="#c" x="494" />
              </g>
              <use xlinkHref="#d" x="988" />
              <use xlinkHref="#c" x="1976" />
              <use xlinkHref="#e" x="2470" />
            </g>
          </svg>
        </button>
  

        {/* <!-- Dropdown --> */}
        <div
          className="hidden z-50 my-4 text-lg list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
          id="language-dropdown"
        >
          <ul className="py-1" role="none">
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:text-white dark:text-gray-300 dark:hover:bg-gray-600"
                role="menuitem"
              >
                <div className="inline-flex items-center">
                  <svg
                    aria-hidden="true"
                    className="h-3.5 w-3.5 rounded-full mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    id="flag-icon-css-us"
                    viewBox="0 0 512 512"
                  >
                    <g fillRule="evenodd">
                      <g strokeWidth="1pt">
                        <path
                          fill="#bd3d44"
                          d="M0 0h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                          transform="scale(3.9385)"
                        />
                        <path
                          fill="#fff"
                          d="M0 10h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0zm0 20h247v10H0z"
                          transform="scale(3.9385)"
                        />
                      </g>
                      <path
                        fill="#192f5d"
                        d="M0 0h98.8v70H0z"
                        transform="scale(3.9385)"
                      />
                      <path
                        fill="#fff"
                        d="M8.2 3l1 2.8H12L9.7 7.5l.9 2.7-2.4-1.7L6 10.2l.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7L74 8.5l-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 7.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 24.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 21.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 38.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 35.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 52.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 49.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm-74.1 7l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7H65zm16.4 0l1 2.8H86l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm-74 7l.8 2.8h3l-2.4 1.7.9 2.7-2.4-1.7L6 66.2l.9-2.7-2.4-1.7h3zm16.4 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8H45l-2.4 1.7 1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9zm16.4 0l1 2.8h2.8l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h3zm16.5 0l.9 2.8h2.9l-2.3 1.7.9 2.7-2.4-1.7-2.3 1.7.9-2.7-2.4-1.7h2.9zm16.5 0l.9 2.8h2.9L92 63.5l1 2.7-2.4-1.7-2.4 1.7 1-2.7-2.4-1.7h2.9z"
                        transform="scale(3.9385)"
                      />
                    </g>
                  </svg>
                  English (US)
                </div>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-600"
                role="menuitem"
              >
                <div className="inline-flex items-center">
                  <svg
                    aria-hidden="true"
                    className="h-3.5 w-3.5 rounded-full mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    id="flag-icon-css-de"
                    viewBox="0 0 512 512"
                  >
                    <path fill="#ffce00" d="M0 341.3h512V512H0z" />
                    <path d="M0 0h512v170.7H0z" />
                    <path fill="#d00" d="M0 170.7h512v170.6H0z" />
                  </svg>
                  Deutsch
                </div>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-600"
                role="menuitem"
              >
                <div className="inline-flex items-center">
                  <svg
                    aria-hidden="true"
                    className="h-3.5 w-3.5 rounded-full mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    id="flag-icon-css-it"
                    viewBox="0 0 512 512"
                  >
                    <g fillRule="evenodd" strokeWidth="1pt">
                      <path fill="#fff" d="M0 0h512v512H0z" />
                      <path fill="#009246" d="M0 0h170.7v512H0z" />
                      <path fill="#ce2b37" d="M341.3 0H512v512H341.3z" />
                    </g>
                  </svg>
                  Italiano
                </div>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:text-white dark:text-gray-300 dark:hover:bg-gray-600"
                role="menuitem"
              >
                <div className="inline-flex items-center">
                  <svg
                    aria-hidden="true"
                    className="h-3.5 w-3.5 rounded-full mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    id="flag-icon-css-cn"
                    viewBox="0 0 512 512"
                  >
                    <defs>
                      <path
                        id="a"
                        fill="#ffde00"
                        d="M1-.3L-.7.8 0-1 .6.8-1-.3z"
                      />
                    </defs>
                    <path fill="#de2910" d="M0 0h512v512H0z" />
                    <use
                      width="30"
                      height="20"
                      transform="matrix(76.8 0 0 76.8 128 128)"
                      xlinkHref="#a"
                    />
                    <use
                      width="30"
                      height="20"
                      transform="rotate(-121 142.6 -47) scale(25.5827)"
                      xlinkHref="#a"
                    />
                    <use
                      width="30"
                      height="20"
                      transform="rotate(-98.1 198 -82) scale(25.6)"
                      xlinkHref="#a"
                    />
                    <use
                      width="30"
                      height="20"
                      transform="rotate(-74 272.4 -114) scale(25.6137)"
                      xlinkHref="#a"
                    />
                    <use
                      width="30"
                      height="20"
                      transform="matrix(16 -19.968 19.968 16 256 230.4)"
                      xlinkHref="#a"
                    />
                  </svg>
                  中文 (繁體)
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>

    <main className="p-4 md:ml-64 h-auto pt-20">
  {activeSection === 'dashboard' && (
    <div>  
<div className="grid grid-cols-2 gap-3 mb-2">
  {/* Carte pour Colis à livrer */}
  <div className="relative bg-white border border-gray-300 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center">
    {/* Image positionnée en haut */}
    <img src={Colisrelaie} alt="Colis en cours" className="w-12 h-12 mb-4" />
    {/* Contenu de la carte */}
    <h2 className="text-3xl font-extrabold text-gray-800 mb-2">02</h2>
    <p className="text-lg text-gray-800 font-medium">Colis relaiyés</p>
  </div>

  {/* Carte pour Colis Livrés */}
  <div className="relative bg-white border border-gray-300 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center">
    <img src={ColisLivress} alt="Colis livrés" className="w-12 h-12 mb-4" />
    <h2 className="text-3xl font-extrabold text-gray-800 mb-2">08</h2>
    <p className="text-lg text-gray-800 font-medium">Colis Livrés</p>
  </div>

  {/* Carte pour Colis en attente */}
  <div className="relative bg-white border border-gray-300 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center">
    <img src={ColisAnnule} alt="Colis en attente" className="w-12 h-12 mb-4" />
    <h2 className="text-3xl font-extrabold text-gray-800 mb-2">40</h2>
    <p className="text-lg text-gray-800 font-medium">Imprévus</p>
  </div>

  {/* Carte pour Solde */}
  <div className="relative bg-white border border-gray-300 rounded-xl shadow-lg p-6 flex flex-col items-center justify-center">
    <img src={Solde} alt="Solde" className="w-12 h-12 mb-4" />
    <h2 className="text-3xl font-extrabold text-gray-800 mb-2">CFA 85,7</h2>
    <p className="text-lg text-gray-800 font-medium">Solde</p>
  </div>
</div>




      
  <div
  className="border-2 border-collapse rounded-lg border-gray-300 dark:border-gray-600 mb-10 relative"
  style={{
    width: '100%',
    height: '500px',
    overflow: 'hidden',
  }}
>
  <div style={{ marginLeft: '3px', width: 'calc(140% - 160px)' }}>
    <MyGoogleMap />
  </div>
</div>



<div className="grid grid-cols-2 gap-2 mb-2 ">
  {/* Premier bouton : Bleu */}
  <button
    type="button"
    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    onClick={handleRelayRequest}
  >
    Relaiement de colis
  </button>

  {/* Deuxième bouton : Vert */}
  <button
    type="button"
    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    onClick={handleShowConfirmation}
  >
    Confirmation Livraison
  </button>
</div>





</div>
  )}
  
  {/* {activeSection === 'expeditions' && (
    <div>Contenu des Expéditions</div>
  )} */}
{activeSection === 'courses' && (
  <div>
    <h2 className="text-xl font-semibold mb-4">Courses assignées</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {courses.length > 0 ? (
        courses.map((course) => (
          <div
            key={course._id}
            className="border p-4 rounded-lg shadow-md bg-gray-800 text-white"
          >
            <h3 className="font-bold text-lg mb-2">Course</h3>
            <p><strong>Type de course :</strong> {course.type_course === 'relay' ? 'Relay' : 'Delivery'}</p>
            <p><strong>Départ :</strong> {course.depart}</p>
            <p><strong>Arrivée :</strong> {course.arrive}</p>
            <p><strong>Date de début :</strong> {new Date(course.date_debut).toLocaleString()}</p>
            <p><strong>Date de fin :</strong> {new Date(course.date_fin).toLocaleString()}</p>

            {/* Bouton pour ouvrir/fermer le dépliant */}
            <button
              onClick={() => toggleCourseDetails(course._id)}
              className="mt-2 bg-blue-700 text-white px-4 py-2 rounded mr-2"
            >
              {expandedCourses[course._id] ? 'Masquer les détails' : 'Voir les détails'}
            </button>

            {/* Informations supplémentaires dépliables */}
            {expandedCourses[course._id] && (
              <div className="mt-2">
                {/* Informations spécifiques au type de course */}
                {course.type_course === 'relay' && course.relais_coursier_id && (
                  <div>
                    <p><strong>Relai vers :</strong> {course.relais_coursier_id.completename}</p>
                    <p><strong>Téléphone :</strong> {course.relais_coursier_id.tel}</p>
                    {course.relais_coursier_id.vehic_id && (
                      <>
                        <p><strong>Véhicule :</strong> {course.relais_coursier_id.vehic_id.type}</p>
                        <p><strong>Marque :</strong> {course.relais_coursier_id.vehic_id.marque}</p>
                        <p><strong>Immatriculation :</strong> {course.relais_coursier_id.vehic_id.immatriculation}</p>
                      </>
                    )}
                  </div>
                )}

                {course.type_course === 'delivery' && course.client_final_id && (
                  <div>
                    <p><strong>Livraison pour :</strong> {course.client_final_id.completename}</p>
                    <p><strong>Téléphone :</strong> {course.client_final_id.tel}</p>
                  </div>
                )}

                {/* Informations sur le colis */}
                <p className="mt-2"><strong>Colis :</strong></p>
                <ul className="ml-4">
                  <li><strong>Taille :</strong> {course.colis_id.taille}</li>
                  <li><strong>Description :</strong> {course.colis_id.description}</li>
                  <li><strong>Poids :</strong> {course.colis_id.poids} kg</li>
                  <li><strong>Particularité :</strong> {course.colis_id.particularite}</li>
                </ul>
              </div>
            )}
                   
           {/* Message de succès affiché au centre de l'écran */}
      {successMessage && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-green-500 text-white text-center rounded-lg shadow-md">
          {successMessage}
        </div>
      )}

      {/* Le reste du composant avec les boutons */}
      <button
        onClick={handleValidateCourse}
        className="mt-4 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded"
      >
        Valider la course
      </button>
     
          </div>
        ))
      ) : (
        <p className="text-gray-400">Aucune course assignée pour le moment.</p>
      )}
    </div>
  </div>
)}



{activeSection === 'historique' && (
  <div>
    <h2 className="text-xl font-semibold mb-4">Historique des Courses</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {courses.filter(course => course.isValidated).length > 0 ? (
        courses.filter(course => course.isValidated).map((course) => (
          <div
            key={course._id}
            className="border p-4 rounded-lg shadow-md bg-gray-800 text-white"
          >
            <h3 className="font-bold text-lg mb-2">Course {course._id}</h3>
            <p><strong>Type de course :</strong> {course.type_course === 'relay' ? 'Relai' : 'Livraison'}</p>
            <p><strong>Départ :</strong> {course.depart}</p>
            <p><strong>Arrivée :</strong> {course.arrive}</p>
            <p><strong>Date de début :</strong> {new Date(course.date_debut).toLocaleString()}</p>
            <p><strong>Date de fin :</strong> {new Date(course.date_fin).toLocaleString()}</p>
            <p><strong>Colis :</strong></p>
            <ul className="ml-4">
              <li><strong>Taille :</strong> {course.colis_id.taille}</li>
              <li><strong>Description :</strong> {course.colis_id.description}</li>
              <li><strong>Poids :</strong> {course.colis_id.poids} kg</li>
              <li><strong>Particularité :</strong> {course.colis_id.particularite}</li>
            </ul>
            {course.type_course === 'delivery' && course.client_final_id && (
              <div>
                <p><strong>Livraison pour :</strong> {course.client_final_id.completename}</p>
                <p><strong>Téléphone :</strong> {course.client_final_id.tel}</p>
              </div>
            )}
            {course.type_course === 'relay' && course.relais_coursier_id && (
              <div>
                <p><strong>Relai vers :</strong> {course.relais_coursier_id.completename}</p>
                <p><strong>Téléphone :</strong> {course.relais_coursier_id.tel}</p>
              </div>
            )}
            <button
              onClick={() => toggleCourseDetails(course._id)}
              className="mt-2 bg-blue-700 text-white px-4 py-2 rounded mr-2"
            >
              {expandedCourses[course._id] ? 'Masquer les détails' : 'Voir les détails'}
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-400">Aucune course validée pour le moment.</p>
      )}
    </div>
  </div>
)}
{activeSection === 'messages' && (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold mb-4">Messagerie</h2>
    <div className="space-y-4">
      {messages.length > 0 ? (
        messages.map((message) => (
          <div key={message.id} className="flex items-start gap-4 bg-gray-100 p-4 rounded-lg shadow-md">
            <img className="w-10 h-10 rounded-full" src={message.senderAvatar} alt={message.senderName} />
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{message.senderName}</span>
                  <span className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleString()}</span>
                </div>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => handleMessageOptions(message.id)}
                >
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1z" />
                    <path d="M3 10a1 1 0 011 1h12a1 1 0 110 2H4a1 1 0 01-1-2z" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-700">{message.text}</p>

              {/* Affichage des images jointes */}
              {message.attachments.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {message.attachments.map((attachment, index) => (
                    <div key={index} className="group relative">
                      <img
                        src={attachment.url}
                        alt={`Attachment ${index + 1}`}
                        className="rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 flex items-center justify-center">
                        <button className="text-white">
                          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 18" fill="none">
                            <path stroke="currentColor" strokeWidth="2" d="M8 1v11l4-4m-4 4L4 8m11 4v3a2 2 0 01-2 2H3a2 2 0 01-2-2v-3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-gray-500">{message.status}</span>
                <div className="flex space-x-2">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleReply(message.id)}
                  >
                    Répondre
                  </button>
                  <button
                    className="text-green-600 hover:text-green-800"
                    onClick={() => handleForward(message.id)}
                  >
                    Transférer
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">Aucun message pour le moment.</p>
      )}
    </div>
  </div>
)}


   {activeSection === 'statistiques' && (
    <div>Contenu des statistiques</div>
  )}
   {activeSection === 'docs' && (
    <div>Contenu des documents</div>
  )}
   {activeSection === 'help' && (
    <div>Contenu des aides</div>
  )}
  {/* Ajoute d'autres sections selon besoin */}
</main>











  </div>
</div>
        
    );
}

export default DriverDashboard;