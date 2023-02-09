// CreatePet needs to render a form
// that form should build a pet object in state
// the form should make an axios post request when submitted
// we should send an alert upon success or failure
// on success: component should redirect our user to the new pet show page
// on failure: component should send the message and remain visible
import { useState } from 'react'
import { createPet } from '../../api/pets'
import { createPetSuccess, createPetFailure } from '../shared/AutoDismissAlert/messages'
import PetForm from '../shared/PetForm'

// bring in the useNavigate hook from react-router-dom
import { useNavigate } from 'react-router-dom'

const CreatePet = (props) => {
    // pull out our props
    const { user, msgAlert } = props

    // set up(pull our navigate function from useNavigate)
    const navigate = useNavigate()
    console.log('this is navigate', navigate)

    const [pet, setPet] = useState({
        name: '',
        type: '',
        age: '',
        adoptable: false
    })

    const onChange = (e) => {
        e.persist()
        
        setPet(prevPet => {
            const updatedName = e.target.name
            let updatedValue = e.target.value

            console.log('this is the input type', e.target.type)

            // to handle a number, we look at the type, and parse a string to an integer
            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            // to handle a checkbox, we can check the name, and change the value that is output. Checkboxes only know if they are checked or not
            if (updatedName === 'adoptable' && e.target.checked) {
                updatedValue = true
            } else if (updatedName === 'adoptable' && !e.target.checked) {
                updatedValue = false
            }
            
            const updatedPet = {
                [updatedName] : updatedValue
            }
            
            console.log('the pet', updatedPet)

            return {
                ...prevPet, ...updatedPet
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        createPet(user, pet)
            // first we'll nav to the show page
            .then(res => { navigate(`/pets/${res.data.pet.id}`)})
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createPetSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: createPetFailure,
                    variant: 'danger'
                })
            })

    }

    return (
        <PetForm 
            pet={pet}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Add a new pet!"
        />
    )
}

export default CreatePet