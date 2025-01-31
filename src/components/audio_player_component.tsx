import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

interface dataProps{
    src: string;
    autoPlay: boolean;
    loop: boolean;
    volume: number;
}

const AudioPlayerComponent = ({ src, autoPlay = false, loop = false, volume }: dataProps) => {
  return (
    <AudioPlayer
      autoPlay={autoPlay} // Controla se o áudio será reproduzido automaticamente
      src={src} // URL do arquivo de áudio
      loop={loop} // Controla se o áudio será repetido
      volume={volume} // Volume do áudio
      onPlay={() => console.log('Reproduzindo áudio')}
      onPause={() => console.log('Áudio pausado')}
      showJumpControls={false} // Esconde os botões de pular 15 segundos
      // customVolumeControls={[]} // Remove o controle de volume (se necessário)
      className='rounded-sm'
    />
  );
};

export default AudioPlayerComponent;