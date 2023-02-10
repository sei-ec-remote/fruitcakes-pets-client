import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { deleteToy } from '../../api/toys'
import EditToyModal from './EditToyModal'

const ShowToy = (props) => {
    const { toy, user, pet, msgAlert, triggerRefresh } = props

    // here's our hook to display the EditToyModal
    const [editModalShow, setEditModalShow] = useState(false)
    // console.log('this is the toy in showToy', toy)
    // here, we're going to use react styling objects to our advantage
    // this will look at the toy's condition, and change the background color
    // we'll also use this to set a consistent width for each card
    // we'll pass the results of this function to a style prop in our card
    const setBgCondition = (cond) => {
        if (cond === 'new') {
            return({width: '18rem', backgroundColor: '#b5ead7'})
        } else if (cond === 'used') {
            return({width: '18rem', backgroundColor: '#ffdac1'})
        } else {
            return({width: '18rem', backgroundColor: '#ff9aa2'})
        }
    }

    // delete, similar to delete for pets, all we have to do is ensure that the user is the pet's owner, and make the api call passing in the right args.
    const destroyToy = () => {
        // this is the api call file function
        // it requires three args, user, petId, & toyId
        deleteToy(user, pet.id, toy._id)
            // upon success, we want to send a message
            .then(() => {
                msgAlert({
                    heading: 'Toy Deleted',
                    message: 'Bye Bye toy!',
                    variant: 'success'
                })
            })
            // then trigger a refresh of the parent component
            .then(() => triggerRefresh())
            // upon failure send an appropriate message
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                })
            })
    }

    return (
        <>
            <Card className="m-2" style={setBgCondition(toy.condition)}>
                <Card.Header>{toy.name}</Card.Header>
                <Card.Body>
                    <small>{toy.description}</small><br/>
                    <small>
                        {toy.isSqueaky ? 'squeak squeak' : 'stoic silence'}
                    </small>
                </Card.Body>
                <Card.Footer>
                    <small>Condition: {toy.condition}</small><br/>
                    {
                        user && pet.owner && user._id === pet.owner._id
                        ?
                        <>
                            <Button
                                onClick={() => setEditModalShow(true)}
                                variant="warning"
                                className="m-2"
                            >
                                Edit Toy
                            </Button>
                            <Button 
                                onClick={() => destroyToy()} 
                                variant="danger"
                                className="m-2"
                            >
                                Delete Toy
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditToyModal
                user={user}
                pet={pet}
                toy={toy}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowToy