import React, { useRef } from 'react';
import { jsPDF } from "jspdf";

const PdfDownload = ({ expedition }) => {
  const contentRef = useRef();

  const handleDownloadPdf = () => {
    const doc = new jsPDF();

    // Vous pouvez personnaliser l'affichage du PDF en fonction des données de l'expédition
    doc.text(`Expédition: ${expedition.expedition_code}`, 10, 10);
    doc.text(`Durée estimée: ${expedition.duree_estimee}`, 10, 20);
    doc.text(`Départ prévu: ${new Date(expedition.date_debut_previsionnel).toLocaleDateString()}`, 10, 30);
    doc.text(`Arrivée prévue: ${new Date(expedition.date_fin_previsionnel).toLocaleDateString()}`, 10, 40);

    // Parcourir les coursiers et les courses pour ajouter plus de détails
    expedition.course_ids.forEach((course, index) => {
      doc.text(`Course ${index + 1}`, 10, 50 + (index * 10));
      doc.text(`Départ: ${course.depart}`, 10, 60 + (index * 10));
      doc.text(`Arrivée: ${course.arrive}`, 10, 70 + (index * 10));
      // Ajoutez ici d'autres détails pour chaque course
    });

    doc.save(`expedition_${expedition.expedition_code}.pdf`);
  };

  return (
    <div>
      <button onClick={handleDownloadPdf} className="text-blue-500 hover:underline">
        Télécharger PDF
      </button>
    </div>
  );
};

export default PdfDownload;
