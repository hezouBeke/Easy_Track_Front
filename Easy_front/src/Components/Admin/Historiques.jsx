import React from "react";
import Adminheader from "./Adminheader";
import Adminsidebar from "./Adminsidebar";

const Historiques = () => {
    return (
        <section className="flex flex-col bg-gray-50 dark:bg-gray-100 p-3 sm:p-5 h-screen">
            <Adminheader />
            <div className="flex flex-grow">
                <Adminsidebar />
                <div className="flex flex-col justify-center items-start w-full p-5">
                    {/* Texte centré à gauche */}
                    <h1 className="text-xl font-semibold text-gray-900 mb-11 ml-96">Aucun historique disponible</h1>
                </div>
            </div>
        </section>
    );
}

export default Historiques;
