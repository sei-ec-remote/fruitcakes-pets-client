import { useState, useEffect } from 'react'

// useParams from react-router-dom allows us to see our route parameters
import { useParams, useNavigate } from 'react-router-dom'

import { Container, Card, Button } from 'react-bootstrap'

import { getOnePet, removePet } from '../../api/pets'

import messages from '../shared/AutoDismissAlert/messages'

import LoadingScreen from '../shared/LoadingScreen'

// we need to get the pet's id from the route parameters
// then we need to make a request to the api
// when we retrieve a pet from the api, we'll render the data on the screen

const ShowPet = (props) => {
    const [pet, setPet] = useState(null)

    const { id } = useParams()
    const navigate = useNavigate()

    const { user, msgAlert } = props
    console.log('user in ShowPet props', user)
    console.log('msgAlert in ShowPet props', msgAlert)

    useEffect(() => {
        getOnePet(id)
            .then(res => setPet(res.data.pet))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting pets',
                    message: messages.getPetsFailure,
                    variant: 'danger'
                })
            })
    }, [])

    // here's where our removePet function will be called
    const setPetFree = () => {
        removePet(user, pet.id)
            // upon success, send the appropriate message and redirect users
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removePetSuccess,
                    variant: 'success'
                })
            })
            .then(() => {navigate('/')})
            // upon failure, just send a message, no navigation required
            .catch(err => {
                msgAlert({
                    heading: 'Error',
                    message: messages.removePetFailure,
                    variant: 'danger'
                })
            })
    }

    if(!pet) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="m-2">
                <Card>
                    <Card.Header>{ pet.fullTitle }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Age: { pet.age }</small></div>
                            <div><small>Type: { pet.type }</small></div>
                            <div>
                                <small>
                                    Adoptable: { pet.adoptable ? 'yes' : 'no' }
                                </small>
                            </div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {
                            pet.owner && user && pet.owner._id === user._id
                            ?
                            <>
                                <Button 
                                    className="m-2" variant="danger"
                                    onClick={() => setPetFree()}
                                >
                                    Set {pet.name} Free
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
        </>
    )
}

export default ShowPet