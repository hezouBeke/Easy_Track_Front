import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import coursesService from "../../services/coursesService";
import Adminsidebar from './Adminsidebar';
import Adminheader from './Adminheader';

function ExpeditionDetails() {
    const { expeditionId } = useParams();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await courseService.getAllCourses(); // Adjust this to get courses related to expeditionId
                setCourses(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des courses", error);
            }
        };

        fetchCourses();
    }, [expeditionId]);

    return (
        <section className="relative bg-gray-900 text-gray-300 p-20 sm:p-10 min-h-screen flex flex-col">
            <Adminheader />
            <div className="flex">
                <Adminsidebar />
                <div className="flex-1 mx-auto w-full max-w-screen-5xl lg:px-10 mt-12">
                    <div className="bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden ml-64">
                        <div className="overflow-x-auto mt-0">
                            <table className="w-full text-sm text-right text-gray-900">
                                <thead className="text-xs text-gray-900 font-thin bg-gray-100 w-full border-t border-gray-300">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">Départ</th>
                                        <th scope="col" className="px-6 py-4">Arrivée</th>
                                        <th scope="col" className="px-6 py-4">Date de Départ</th>
                                        <th scope="col" className="px-6 py-4">Date d'Arrivée</th>
                                        <th scope="col" className="px-6 py-4">Coursier</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map(course => (
                                        <tr key={course._id} className="hover:bg-gray-700">
                                            <td className="px-6 py-4">{course.depart}</td>
                                            <td className="px-6 py-4">{course.arrive}</td>
                                            <td className="px-6 py-4">{course.date_debut}</td>
                                            <td className="px-6 py-4">{course.date_fin}</td>
                                            <td className="px-6 py-4">{course.coursiers.map(c => c.completename).join(', ')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ExpeditionDetails;
