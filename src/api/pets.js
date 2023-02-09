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
export const createPet = (user, newPet) => {
    console.log('this is the user', user)
    console.log('this is the newPet', newPet)
    return axios({
        url: `${apiUrl}/pets`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { pet: newPet }
    })
}

// Update (update a pet)
export const updatePet = (user, updatedPet) => {
    return axios({
        url: `${apiUrl}/pets/${updatedPet.id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { pet: updatedPet }
    })
}

// Delete (delete a pet)
export const removePet = (user, petId) => {
    return axios({
        url: `${apiUrl}/pets/${petId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}