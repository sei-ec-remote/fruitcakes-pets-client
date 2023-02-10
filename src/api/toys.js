import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
// /toys/:petId
export const createToy = (petId, newToy) => {
    return axios({
        url: `${apiUrl}/toys/${petId}`,
        method: 'POST',
        data: { toy: newToy }
    })
}

// UPDATE
// /toys/:petId/:toyId
export const updateToy = (user, petId, updatedToy) => {
    return axios({
        url: `${apiUrl}/toys/${petId}/${updatedToy._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { toy: updatedToy }
    })
}

// DELETE
// /toys/:petId/:toyId
export const deleteToy = (user, petId, toyId) => {
    // console.log('this the toyId', toyId)
    return axios({
        url: `${apiUrl}/toys/${petId}/${toyId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}