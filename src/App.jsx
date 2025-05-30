import './styles/App.scss';
import $ from 'jquery';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { textActions } from './textSlice';
import DrumPad from './DrumPad';

const drumPads = [
  {
    id: 'Heater-1',
    key: 'Q',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    id: 'Heater-2',
    key: 'W',
    src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3'
  },
  {
    id: 'Heater-3',
    key: 'E',
    src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3'
  },
  {
    id: 'Heater-4',
    key: 'A',
    src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3'
  },
  {
    id: 'Clap',
    key: 'S',
    src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3'
  },
  {
    id: 'Open-HH',
    key: 'D',
    src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3'
  },
  {
    id: 'Kick-n-Hat',
    key: 'Y',
    src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3'
  },
  {
    id: 'Kick',
    key: 'X',
    src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3'
  },
  {
    id: 'Closed-HH',
    key: 'C',
    src: 'https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3'
  }
];

const keys = drumPads.map((drumPad => drumPad.key));

const toggleClass = (elementId, addClass, removeClass) => {
  $(`#${elementId}`).addClass(addClass);
  $(`#${elementId}`).removeClass(removeClass);
}

const App = () => {
  const text = useSelector((state) => state.text);
  const dispatch = useDispatch();
  const timeoutRef = useRef(null);

  const handleClick = (event) => {
    const drumPadId = event.target.id;
    const audioElement = event.target.querySelector('audio');

    dispatch(textActions.setText(drumPadId));
    audioElement.play();
    toggleClass(drumPadId, 'active', 'gray');

    if (timeoutRef) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      toggleClass(drumPadId, 'gray', 'active')
    }, 100);
  }
  
  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    
    if (keys.includes(key)) {
      const audioElement = $(`#${key}`)[0];
      const drumPadId = audioElement.parentElement.id;
      
      dispatch(textActions.setText(drumPadId));
      audioElement.play();
      toggleClass(drumPadId, 'active', 'gray');
    }
  }

  const handleKeyUp = (event) => {
    const key = event.key.toUpperCase();
    
    if (keys.includes(key)) {
      const audioElement = $(`#${key}`)[0];
      const drumPadId = audioElement.parentElement.id;
      
      toggleClass(drumPadId, 'gray', 'active');
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div id='drum-machine'>
      <h1>BeatRack</h1>
      <div id='display' className="gray">{text}</div>
      <div className='drum-pads'>
        {
          drumPads.map((drumPad) => (
            <DrumPad idDrum={drumPad.id} key={drumPad.id} idAudio={drumPad.key} handleClick={handleClick} src={drumPad.src} />
          ))
        }
      </div>
      <p>Coded by <a href='https://www.linkedin.com/in/ing-huyle' target='_blank'>ing<span>.</span>huyle</a></p>
    </div>
  )
}

export default App;