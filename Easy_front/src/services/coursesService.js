import axios from 'axios';

const API_URL = 'http://localhost:7000/api/courses/';

// Fonction pour créer une course
const createCourse = (courseData) => {
    return axios.post(`${API_URL}course`, courseData);
};

// Fonction pour obtenir toutes les courses
const getAllCourses = () => {
    return axios.get(`${API_URL}course`);
};

// Fonction pour obtenir les détails d'une course par ID
const getCourseDetails = (courseId) => {
    return axios.get(`${API_URL}course/${courseId}`);
};

export default {
    createCourse,
    getAllCourses,
    getCourseDetails,
};
