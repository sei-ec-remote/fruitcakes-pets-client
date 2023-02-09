import { Form, Button, Container } from 'react-bootstrap'

const ToyForm = (props) => {
    const { toy, handleChange, handleSubmit, heading } = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control 
                        placeholder="What is the toy's name?"
                        name="name"
                        id="name"
                        value={ toy.name }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control 
                        placeholder="What kind of toy is this?"
                        name="description"
                        id="description"
                        value={ toy.description }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Check 
                        label="Is this toy squeaky?"
                        name="isSqueaky"
                        defaultChecked={ toy.isSqueaky }
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group className="m-2">
                    <Form.Select 
                        aria-label="toy condition"
                        name="condition"
                        defaultValue={toy.condition}
                        onChange={handleChange}
                    >
                        <option>Open this select menu</option>
                        <option value="new">new</option>
                        <option value="used">used</option>
                        <option value="disgusting">disgusting</option>
                    </Form.Select>
                </Form.Group>
                <Button className="m-2" type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default ToyForm