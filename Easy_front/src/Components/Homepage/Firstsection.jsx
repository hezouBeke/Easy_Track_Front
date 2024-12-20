function Firstsection() {
    return (
        <section className="bg-white lg:px2 mb-0 font-thin"> 
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-20">
                <h1 className="mb-10 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-black">Suivre. Automatiser. Rassurer.</h1>
                <p className="mb-10 text-lg font-thin text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Suivez vos colis en temps réel, avec une visibilité totale à chaque étape. De l'expédition à la livraison, restez informé en toute transparence.</p>
                <div className="flex flex-col mb-12 lg:mb-20 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <a href="/register" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                        Commencer gratuitement
                        <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </a>
                    <a href="/login" className="inline-flex justify-center items-center py-3 px-5 text-base font-thin text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-black dark:border-black dark:hover:bg-gray-200 dark:focus:ring-gray-800">
                        <svg className="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                        Regarder une vidéo
                    </a>  
                </div> 
            </div>
        </section>
    );
}

export default Firstsection;
