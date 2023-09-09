import './App.css';
import React from 'react';
import Modal from 'react-modal';

var audio = new Audio("./assets/SW.mp3");

function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedPort, setSelectedPort] = React.useState(); 

  let port
  const openModal = (i) => {
    if (i === 0) {
      port = 7575;
    }
    else if (i === 1) {
      port = 5000;
    }
    else if (i === 2) {
      port = 4243;
    }
    setSelectedPort(port);

    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }
  const iframeSrc = `http://localhost:${selectedPort}`;


  return (
    <>
      <div className="App" onClick={() => audio.play()}>
        <div className="titleru">🔥GAMING - SITE GAMING BY THE GAMERS FOR THE GAMERS - GAMING🔥(videogamewebsite)</div>
        <div>là bam tu peux cliquer sur les jeux par là i guess</div>
        <div className="jeux">
          <div className="square un" onClick={() => openModal(0)}></div>
          <div className="square deux" onClick={() => openModal(1)}></div>
          <div className="square trois" onClick={() => openModal(2)}></div>
        </div>
        <div className="fade"></div>

        <section className="star-wars">
          <div className="crawl">
            <div className="title">
              <p>Thib Wars</p>
              <h1>NO MORE HOPE</h1>
            </div>

            <p> Salut salut alors là en gros j'vais te raconter l'histoire d'un grand inquisiteur sith Mehdikin, dit "Le Corrompu" </p>

            <p>En gros il était gentil mais après il l'était plus, tu veux savoir pourquoi ? c'est simple c'est les femmes, encore un coup de cette race alienne invasive</p>

            <p>En vrai il était grave beau, grave fort, grave mysterieux, grave intelligent, grave vif d'esprit, grave rapide, franchement c'est dommage qu'il ait mal tourné, il aurait fait bon boulanger.</p>
          </div>
        </section>
      </div>
      <div className='dofus'>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
        >
            <button onClick={closeModal}>X</button>
          <div className='videojuego'>
            <iframe src={iframeSrc} width="800" height="600" title="Jeu"></iframe>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default App;
