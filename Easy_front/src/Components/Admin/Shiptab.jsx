function Shiptab() {
    return(
        <section class="bg-white py-8 antialiased dark:bg-gray-800 md:py-16">
        <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div class="mx-auto max-w-5xl">
            <div class="gap-4 sm:flex sm:items-center sm:justify-between">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Expéditions en cours</h2>
      
              <div class="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                <div>
                  <label for="order-type" class="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">Select order type</label>
                  <select id="order-type" class="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                    <option selected>Toutes les expéditions </option>
                    <option value="Transimissions colis">Transimissions colis</option>
                    <option value="En transit"> En Transit </option>
                    <option value="Terminés">Terminés</option>
                    <option value="Annulés"> Annulés</option>
                  </select>
                </div>
      
                <span class="inline-block text-gray-500 dark:text-gray-400"> De </span>
      
                <div>
                  <label for="duration" class="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white">Selectionner la durée</label>
                  <select id="duration" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500">
                    <option selected>Aujoud'hui</option>
                    <option value="this month">Cette semaine</option>
                    <option value="last 3 months">Ce mois</option>
                    <option value="lats 6 months"> Ces 3 derniers mois </option>
                    <option value="this year">Cette anneé</option>
                  </select>
                </div>
              </div>
            </div>
      
            <div class="mt-6 flow-root sm:mt-8">
              <div class="divide-y divide-gray-200 dark:divide-gray-700">
                <div class="flex flex-wrap items-center gap-y-4 py-6">
                  <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt class="text-base font-medium text-gray-500 dark:text-gray-400">TRACKING</dt>
                    <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                      <a href="#" class="hover:underline">#FWB127364372</a>
                    </dd>
                  </dl>
                  <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Départ:</dt>
                    <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">KARA</dd>
                  </dl>
                  <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Destination:</dt>
                    <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">Lomé</dd>
                  </dl>
                  <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt class="text-base font-medium text-gray-500 dark:text-gray-400">expéditeur:</dt>
                    <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">TOTO patrick</dd>
                  </dl>
                  <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Destinataire:</dt>
                    <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">Lomé</dd>
                  </dl>
                  <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Coursier actuel :</dt>
                    <dd class="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">AMADOU dialo</dd>
                  </dl>
      
                  <dl class="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt class="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                    <dd class="me-2 mt-1.5 inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">
                      <svg class="me-1 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.5 4h-13m13 16h-13M8 20v-3.333a2 2 0 0 1 .4-1.2L10 12.6a1 1 0 0 0 0-1.2L8.4 8.533a2 2 0 0 1-.4-1.2V4h8v3.333a2 2 0 0 1-.4 1.2L13.957 11.4a1 1 0 0 0 0 1.2l1.643 2.867a2 2 0 0 1 .4 1.2V20H8Z" />
                      </svg>
                      Enregistrement
                    </dd>
                  </dl>
      
                  <div class="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                    <button type="button" class="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto">Annuler</button>
                    <a href="#" class="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">Plus de details</a>
                  </div>
                </div>
                
    
      
              
      
  
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default Shiptab;   
   
  