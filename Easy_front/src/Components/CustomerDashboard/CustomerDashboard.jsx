import { useNavigate } from 'react-router-dom';
import 'flowbite';
import React, { useEffect, useState } from 'react';
import clientService from '../../services/clientService';

function CustomerDashboard(){
    const [client, setClient] = useState({ completename: '', email: '' });

    const navigate = useNavigate(null);

    const handleLogout = () => {
      navigate('/'); 
    };
    
    useEffect(() => {
      const fetchClient = async () => {
          try {
              const response = await clientService.getConnectedClient();
              setClient(response.data);
          } catch (error) {
              console.error('Erreur lors de la récupération du client connecté', error);
          }
      };
      fetchClient();
  }, []);
    
    return (
        <div className="flex flex-col w-full">    
        <div class="antialiased bg-gray-50 dark:bg-gray-100">
        <nav class="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
          <div class="flex flex-wrap justify-between items-center">
            <div class="flex justify-start items-center">
              <button
                data-drawer-target="drawer-navigation"
                data-drawer-toggle="drawer-navigation"
                aria-controls="drawer-navigation"
                class="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <svg
                  aria-hidden="true"
                  class="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Toggle sidebar</span>
              </button>
    
    
              <a href="/home" class="flex items-center justify-between mr-4">
                <img
                  src="../src/assets/package.svg"
                  class="mr-3 h-8"
                  alt="EasyTrack"
                />
                <span class="self-center text-2xl font-thin whitespace-nowrap dark:text-white">EasyTrack</span>
              </a>
              <form action="#" method="GET" class="hidden md:block md:pl-2">
                <label for="topbar-search" class="sr-only">Search</label>
                <div class="relative md:w-64 md:w-96">
                  <div
                    class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                  >
                    <svg
                      class="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="email"
                    id="topbar-search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search"
                  />
                </div>
              </form>
            </div>

            <div class="flex items-center lg:order-2">
              <button
                type="button"
                data-drawer-toggle="drawer-navigation"
                aria-controls="drawer-navigation"
                class="p-2 mr-1 text-gray-500 rounded-lg md:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <span class="sr-only">Toggle search</span>
                <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" >
                  <path clip-rule="evenodd" fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
                </svg>
              </button>
    
    
              <button
                type="button"
                data-dropdown-toggle="notification-dropdown"
                class="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <span class="sr-only">View notifications</span>
       
                <svg
                  aria-hidden="true"
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                  ></path>
                </svg>
              </button>
    
    
              <div
                class="hidden overflow-hidden z-50 my-4 max-w-sm text-lg list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:divide-gray-600 dark:bg-gray-700 rounded-xl"
                id="notification-dropdown"
              >
                <div
                  class="block py-2 px-4 text-lg font-thin text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300"
                >
                  Notifications
                </div>
                <div>
                  <a
                    href="#"
                    class="flex py-3 px-4 border-b hover:bg-gray-100 dark:hover:bg-gray-600 dark:border-gray-600"
                  >
                    <div class="flex-shrink-0">
                      <img
                        class="w-11 h-11 rounded-full"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                        alt="Bonnie Green avatar"
                      />
                      <div
                        class="flex absolute justify-center items-center ml-6 -mt-5 w-5 h-5 rounded-full border border-white bg-primary-700 dark:border-gray-700"
                      >
                        <svg
                          aria-hidden="true"
                          class="w-3 h-3 text-white"
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
                    <div class="pl-3 w-full">
                      <div
                        class="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400"
                      >
                        New message from
                        <span class="font-thin text-gray-900 dark:text-white"
                          >Bonnie Green</span
                        >: "Hey, what's up? All set for the presentation?"
                      </div>
                      <div
                        class="text-xs font-thin text-primary-600 dark:text-primary-500"
                      >
                        a few moments ago
                      </div>
                    </div>
    </a>



                </div>
                <a
                  href="#"
                  class="block py-2 text-md font-thin text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-600 dark:text-white dark:hover:underline"
                >
                  <div class="inline-flex items-center">
                    <svg
                      aria-hidden="true"
                      class="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                      <path
                        fill-rule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    View all
                  </div>
                </a>
              </div>



              {/* <!-- Apps --> */}
              <button
                type="button"
                data-dropdown-toggle="apps-dropdown"
                class="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <span class="sr-only">View notifications</span>
                {/* <!-- Icon --> */}
                <svg
                  class="w-6 h-6"
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
                class="hidden overflow-hidden z-50 my-4 max-w-sm text-lg list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:bg-gray-700 dark:divide-gray-600 rounded-xl"
                id="apps-dropdown"
              >
                <div
                  class="block py-2 px-4 text-lg font-thin text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300"
                >
                  Apps
                </div>
                <div class="grid grid-cols-3 gap-4 p-4">
 
                  <a
                    href="#"
                    class="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                  >
                    <svg
                      aria-hidden="true"
                      class="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <div class="text-sm text-gray-900 dark:text-white">Inbox</div>
                  </a>
                 
                  <a
                    href="#"
                    class="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                  >
                    <svg
                      aria-hidden="true"
                      class="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <div class="text-sm text-gray-900 dark:text-white">
                      Settings
                    </div>
                  </a>
             
                  <a
                    href="#"
                    class="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
                  >
                    <svg
                      aria-hidden="true"
                      class="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"
                      ></path>
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    <div class="text-sm text-gray-900 dark:text-white">
                      Pricing
                    </div>
                  </a>
                  
                
                </div>
              </div>
              
              <button
                type="button"
                class="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="dropdown"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="w-8 h-8 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                  alt="user photo"
                />
              </button>
             
              <div
                class="hidden z-50 my-4 w-56 text-lg list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl"
                id="dropdown"
              >
                <div class="py-3 px-4">
                  <span
                    class="block text-sm font-thin text-gray-900 dark:text-white"
                    >{client.completename || 'Nom inconnu'}</span
                  >
                  <span
                    class="block text-sm text-gray-900 truncate dark:text-white"
                    >{client.email || 'Email inconnu'}</span
                  >
                </div>
                <ul
                  class="py-1 text-gray-700 dark:text-gray-300"
                  aria-labelledby="dropdown"
                >
                  <li>
                    <a
                      href="#"
                      class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                      >My profile</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
                      >Account settings</a
                    >
                  </li>
                </ul>
                <ul
                  class="py-1 text-gray-700 dark:text-gray-300"
                  aria-labelledby="dropdown"
                >
                  <li>
                    <a
                      href="#"
                      class="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      ><svg
                        class="mr-2 w-5 h-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      My likes</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      ><svg
                        class="mr-2 w-5 h-5 text-gray-400"
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
                      class="flex justify-between items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      <span class="flex items-center">
                        <svg
                          aria-hidden="true"
                          class="mr-2 w-5 h-5 text-primary-600 dark:text-primary-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        Pro version
                      </span>
                      <svg
                        aria-hidden="true"
                        class="w-5 h-5 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  </li>
                </ul>
                <ul
                  class="py-1 text-gray-700 dark:text-gray-300"
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
            </div>
          </div>
        </nav>
    
       
    
        <aside
          class="fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Sidenav"
          id="drawer-navigation"
        >
          <div class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
            <form action="#" method="GET" class="md:hidden mb-2">
              <label for="sidebar-search" class="sr-only">Search</label>
              <div class="relative">
                <div
                  class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                >
                  <svg
                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  id="sidebar-search"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search"
                />
              </div>
            </form>
    
    
            <ul class="space-y-5">
              <li>
                <a
                  href="#"
                  class="flex items-center font-thin p-2 text-lg font-thin text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/></svg>
                  <span class="ml-3">Tableau de bord</span>
                </a>
              </li>
            
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 text-lg font-thin text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M120-160v-640l572 240h-12q-35 0-66 8t-60 22L200-680v140l240 60-240 60v140l216-92q-8 23-12 45.5t-4 46.5v2L120-160Zm560 80q-83 0-141.5-58.5T480-280q0-83 58.5-141.5T680-480q83 0 141.5 58.5T880-280q0 83-58.5 141.5T680-80Zm66-106 28-28-74-74v-112h-40v128l86 86ZM200-372v-308 400-92Z"/></svg>
                  <span class="ml-3">Expéditions</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 text-lg font-thin text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-80q-106 0-173-33.5T240-200q0-24 14.5-44.5T295-280l63 59q-9 4-19.5 9T322-200q13 16 60 28t98 12q51 0 98.5-12t60.5-28q-7-8-18-13t-21-9l62-60q28 16 43 36.5t15 45.5q0 53-67 86.5T480-80Zm1-220q99-73 149-146.5T680-594q0-102-65-154t-135-52q-70 0-135 52t-65 154q0 67 49 139.5T481-300Zm-1 100Q339-304 269.5-402T200-594q0-71 25.5-124.5T291-808q40-36 90-54t99-18q49 0 99 18t90 54q40 36 65.5 89.5T760-594q0 94-69.5 192T480-200Zm0-320q33 0 56.5-23.5T560-600q0-33-23.5-56.5T480-680q-33 0-56.5 23.5T400-600q0 33 23.5 56.5T480-520Zm0-80Z"/></svg>
                  <span class="ml-3">Tracking</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 text-lg font-thin text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                 <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-120q-138 0-240.5-91.5T122-440h82q14 104 92.5 172T480-200q117 0 198.5-81.5T760-480q0-117-81.5-198.5T480-760q-69 0-129 32t-101 88h110v80H120v-240h80v94q51-64 124.5-99T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-120Zm112-192L440-464v-216h80v184l128 128-56 56Z"/></svg>
                  <span class="ml-3">Historique expéditions </span>
                </a>
              </li>
             
           
              <li>
                
              </li> 
            </ul>
    
    
            <ul
              class="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700"
            >
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 text-lg font-thin text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <svg
                    aria-hidden="true"
                    class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path
                      fill-rule="evenodd"
                      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="ml-3">Docs</span>
                </a>
              </li>
              
              <li>
                <a
                  href="#"
                  class="flex items-center p-2 text-lg font-thin text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
                >
                  <svg
                    aria-hidden="true"
                    class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="ml-3">Help</span>
                </a>
              </li>
            </ul>
</div>
        </aside>
    
        <main class="p-4 md:ml-64 h-auto pt-20">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div
              class="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64"
            ></div>
            <div
              class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"
            ></div>
            <div
              class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"
            ></div>
            <div
              class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-32 md:h-64"
            ></div>
          </div>
    
    
          <div
            class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"
          ></div>
    
    
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div
              class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
            ></div>
            <div
              class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
            ></div>
            <div
              class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
            ></div>
            <div
              class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
            ></div>
          </div>
    
    
          <div
            class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4"
          ></div>
    
    
          <div class="grid grid-cols-2 gap-4">
            <div
              class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
            ></div>
            <div
              class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
            ></div>
            <div
              class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
            ></div>
            <div
              class="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
            ></div>
          </div>
        </main>
    
    
      </div>
                    
                </div>
            
        );
}
export default CustomerDashboard;
