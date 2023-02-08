// this is where our api calls for the pets resource will live
import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllPets = () => {
    return axios(`${apiUrl}/pets`)
}

// READ -> Show
export const getOnePet = (id) => {
    return axios(`${apiUrl}/pets/${id}`)
}

// Create (create a pet)

// Update (update a pet)

// Delete (delete a pet)