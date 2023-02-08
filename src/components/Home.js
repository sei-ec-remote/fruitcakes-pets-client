import PetsIndex from './pets/PetsIndex'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
		<>
			<h2>See All The Pets</h2>
			<PetsIndex msgAlert={ props.msgAlert } />
		</>
	)
}

export default Home
