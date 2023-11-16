import Carnival from '../components/Carnival';
import './styles.scss';

const App = () => {
	const success = () => {
		console.info('SUCCESS!');
	};

	const fail = () => {
		console.error('Fail!');
	};

	return (
		<div className='App'>
			<div className='Wrapper'>
				<Carnival size={25} duration={500} onSuccess={success} onFailure={fail} random={true} />
			</div>
		</div>
	);
};

export default App;
