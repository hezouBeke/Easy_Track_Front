function Headsection() {
    return (
        <section className="bg-white">
            {/* Première partie */}
            <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-black">Optimisez chaque étape de vos envois</h2>
                    <p className="mb-4">Chez EasyTrack, nous croyons que le suivi de colis doit être simple, rapide et efficace. Nous avons conçu une plateforme intuitive qui vous permet de garder le contrôle sur vos expéditions, peu importe leur destination.</p>
                    <p>Que vous soyez une petite entreprise ou un grand acteur du marché, notre solution s’adapte à vos besoins pour vous offrir une visibilité totale, à chaque étape du parcours de vos colis.</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <img className="w-full rounded-lg" src="src\assets\im1.jpg" alt="Suivi de colis en temps réel"/>
                    <img className="mt-4 w-full lg:mt-10 rounded-lg" src="src\assets\im2.jpg" alt="Gestion des expéditions"/>
                </div>
            </div>

            {/* Deuxième partie */}
            <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
            <div className="grid grid-cols-2 gap-4 mt-8">
                    <img className="w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png" alt="Technologie de suivi avancée"/>
                    <img className="mt-4 w-full lg:mt-10 rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png" alt="Informations de livraison en temps réel"/>
                </div>
                <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-black">Sécurisez vos livraisons avec précision</h2>
                    <p className="mb-4">Notre technologie avancée vous permet de suivre en temps réel chaque étape de la livraison de vos colis. Avec EasyTrack, dites adieu aux incertitudes et rassurez vos clients avec des informations précises et à jour.</p>
                    <p>Nous vous offrons les outils nécessaires pour anticiper les retards, éviter les pertes et garantir que vos envois arrivent à destination, dans les meilleures conditions.</p>
                </div>
                
            </div>
        </section>
    );
}

export default Headsection;
