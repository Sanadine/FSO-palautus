import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const otsikko = "Anna palautetta"

const Header = ({otsikko}) => {
  return (
    <div>
      <h1>{otsikko}</h1>
    </div>
  )
  }

const valiotsikko = "Palautteet"

const Valiotsikko = ({valiotsikko}) => {
  return (
    <div>
      <h2>{valiotsikko}</h2>
    </div>
  )
}

const StatisticLine = ({teksti, arvo}) => {
  return (
    <tr>
      <td>{teksti}</td>
      <td>{arvo}</td>
    </tr>
  )
}
const Statsit = ({hyva, neutraali, huano, kaik, keksi, posi}) => {
  if (kaik === 0)
  return (
    <div>
      <h3>Palautelaatikko on tyhjä</h3>
    </div>
  )
  return ( 
    <table>
      <tbody>
        <StatisticLine teksti="Hyvä" arvo={hyva} />
        <StatisticLine teksti="Neutraali" arvo={neutraali} />
        <StatisticLine teksti="Huono" arvo={huano} />
        <StatisticLine teksti="Kaikki" arvo={kaik} />
        <StatisticLine teksti="Keskiarvo" arvo={keksi} />
        <StatisticLine teksti="Positiivista" arvo={`${posi} %`} />
      </tbody>
    </table>
  )
}

const App = () => {

  const [hyva, setHyva] = useState(0)
  const [neutraali, setNeutraali] = useState(0)
  const [huano, setHuano] = useState(0)
  const [kaik, setKaik] = useState(0)
  const keksi = (hyva + huano) / kaik
  const posi = (hyva / kaik) * 100
  const pyoreakeksi = keksi.toFixed(1)
  const pyoreaposi = posi.toFixed(1)

  const handleHyvaClick = () => {
    const updatedHyva = hyva + 1
    setHyva(updatedHyva)
    setKaik(updatedHyva + neutraali + huano)
  }
    
  const handleNeutraaliClick = () => {
    const updatedNeutraali = neutraali + 1
    setNeutraali(updatedNeutraali)
    setKaik(hyva + updatedNeutraali + huano)
  }

  const handleHuonoClick = () => {
    const updatedHuano = huano + 1
    setHuano(updatedHuano)
    setKaik(hyva + neutraali + updatedHuano)
  }

  return (
    <div>
      <Header otsikko={otsikko}/>
      <Button onClick={handleHyvaClick} text="Hyvä" />
      <Button onClick={handleNeutraaliClick} text="Neutraali"/>
      <Button onClick={handleHuonoClick} text="Huono"/>
      <Valiotsikko valiotsikko={valiotsikko}/>
      <Statsit hyva={hyva} neutraali={neutraali} huano={huano} kaik={kaik} keksi={pyoreakeksi} posi={pyoreaposi} />
    </div>
  )
}

export default App