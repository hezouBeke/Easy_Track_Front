import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');  // Redirige vers la page d'accueil après la déconnexion
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  return (
    <header>
      <nav className="fixed top-0 left-0 w-full bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800 z-50">
        <div className="container mx-auto flex justify-between items-center w-full">
          
          {/* Section gauche - Logo et toggle sidebar pour mobile */}
          <div className="flex items-center">
            <button
              aria-expanded="true"
              aria-controls="sidebar"
              className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg className="w-[18px] h-[18px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
              <span className="sr-only">Toggle sidebar</span>
            </button>

            <a href="/home" className="flex mr-4 ml-[-30px]">
              <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" width="50px" fill="#FFFFFF">
                <path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-80 92L160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11Zm200-528 77-44-237-137-78 45 238 136Zm-160 93 78-45-237-137-78 45 237 137Z"/>
              </svg>
              <span className="self-center text-3xl font-extralight whitespace-nowrap dark:text-white">EasyTrack</span>
            </a>
          </div>

          {/* Section droite - Notifications, Langue, Aide, et menu utilisateur */}
          <div className="flex items-center gap-4">
            
            {/* Icône de Notification avec badge lumineux */}
            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                aria-label="Notifications"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                  <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/>
                </svg>
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full"></span>
              </button>
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                  <p className="px-4 py-2 text-sm text-gray-700">Aucune nouvelle notification</p>
                </div>
              )}
            </div>

            {/* Bouton Changer de langue */}
            <button
              onClick={() => console.log("Changer de langue")}
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
              aria-label="Changer de langue"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                <path d="M130-160q-29 0-49.5-20.5T60-230v-500q0-29 20.5-49.5T130-800h200q-5 15-7.5 32t-3.5 28H130v500h700v-150q15-4 32-6.5t28-4.5v161q0 29-20.5 49.5T830-160H130Zm580-316q-37 0-72.5-9T574-516l-72 164-86-187q-55-11-100.5-30T241-618l24-29q29 17 66.5 30.5T395-600q9 0 16.5 5.5T419-583l83 184 67-155q-53-25-90.5-67.5T429-800h28q13 39 39.5 70t61.5 51q41-22 74-53.5T708-800h29q-18 51-53 92t-89 66q29 10 59.5 13t57.5 3v28h-19ZM130-720v500-500Zm310 250v-28h180v28H440Z"/>
              </svg>
            </button>

            {/* Bouton d'aide */}
            <button
              onClick={() => navigate('/help')}
              className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
              aria-label="Informations d’aide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                <path d="M420-200h60v-60h-60v60Zm-20-140h100q0-21 3.5-36t13.5-28q12-15 27-29t30-30q15-14 27.5-32t12.5-48q0-38-26.5-63.5T480-660q-35 0-58.5 16.5T384-600l56 23q4-10 14-19t26-9q20 0 32.5 13.5T525-540q0 16-8 27t-20 21q-12 10-24 22.5T454-423q-11 14-15.5 31.5T434-340Zm46 280q-82 0-153.5-31.5T198-155q-54-54-85.5-125.5T81-434q0-83 31.5-154.5T198-714q54-54 125.5-85.5T480-831q83 0 154.5 31.5T760-714q54 54 85.5 125.5T877-434q0 83-31.5 154.5T760-155q-54 54-125.5 85.5T480-60Z"/>
              </svg>
            </button>

            {/* Menu utilisateur */}
            <div className="relative">
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                onClick={toggleDropdown}
              >
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 dark:bg-gray-700 z-50">
                  <button
                    onClick={() => navigate('/settings')}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Paramètres
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default AdminHeader;
