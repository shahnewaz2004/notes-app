import LottieView from 'lottie-react-native'
import Animation from '../../Lottie/notes.json';

const Splash = () => {

  return (
    <LottieView
        autoPlay
        source={Animation}
      />
  )
}

export default Splash;