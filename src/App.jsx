import { useState } from "react"


function App() {
  const title = "Ajouter Nouveaux Client"
  //les etats
  const [listeClient, setListClient] = useState([])
  const [client, setClient] = useState({
    id: 1,
    nom: "",
    prenom: "",
    email: "",
    groups: "",
    genre: ""
  })

  const [keysearch, setkeySearch] = useState("")
  const [update, setUpdate] = useState(false)
  const [firstPage, setfirstpage] = useState(1)
  const [lastPage, setlastPage] = useState("")
  const [totalclient, settotalclient] = useState(0)

  const getclient = (e) => {
    const { name, value } = e.target
    setClient(preventclient => ({ ...preventclient, [name]: value.toLowerCase() }))
  }

  const ajouter = () => {

    // if (client.nom !== "" && client.email !== "" && client.genre !== "" && client.prenom !== "" && client.groups !== "") {
    setListClient(prevclient => ([...prevclient, client]))
    setClient({
      id: client.id + 1,
      nom: "",
      prenom: "",
      email: "",
      groups: "",
      genre: ""
    })
    console.log(client)

    /* }else{
       alert("Il faut remplir tous les champs")
     }**/


    /*if (totalclient >= lastPage) {
      settotalclient(totalclient + 1)
    }**/

  }
  //mise a jour un client existant
  const updateclient = (cli) => {
    setClient(cli)//metre a jour les information du client
    setUpdate(true)//activer le mode de mise a jour
  }

  //confirmer la mise a jour du client
  const confirmupdate = () => {
    const newlist = listeClient.map(c => c.id === client.id ? client : c)
    console.log(newlist)

    setListClient(newlist)//Mettre a jour la liste des clients
    setClient({
      id: newlist.length + 1,//reinitialiser l'Id
      nom: "",
      prenom: "",
      email: "",
      groups: "",
      genre: ""
    })
    setUpdate(false)//Desactiver le mode de mise a jour


  }

  const deleteclient = (cli) => {
    const newlist = listeClient.filter(c => c.id !== cli.id)
    setListClient(newlist)//metre a jour la liste

    /* if (totalclient <= firstPage && lastPage > 1) {
       setfirstpage(firstPage - 3)
       setlastPage(lastPage - 3)
     }**/
  }

  //Obtenir la cle a rechercher

  const getkeysearch = (e) => {
    setkeySearch(e.target.value.toLowerCase())//mettre a jour la cle de recherche
  }

  //annuler l'operation
  const cancel = () => {
    if (update) {
      setClient({
        id: client.id + 1,
        nom: "",
        prenom: "",
        email: "",
        groups: "",
        genre: ""
      })
      setUpdate(false)//desactiver le mode de mise a jour
    }
  }



  return (
    <>
      <div className="allcontainer">
        <div className="headers">
          <p>{title} </p>
        </div>
        <div className="leschamps">
          <div className="allInput">
            <input className="input" type="text" placeholder="nom..." name="nom" value={client.nom} onChange={getclient} />
            <input className="input" type="text" placeholder="prenom..." name="prenom" value={client.prenom} onChange={getclient} />
            <input className="input" type="email" placeholder="email..." name="email" value={client.email} onChange={getclient} />
            <select name="groups" onChange={getclient} value={client.groups}>
              <option value="">Groups</option>
              <option value="dev-200">dev-200</option>
              <option value="dev-201">dev-201</option>
              <option value="dev-202">dev-202</option>
              <option value="dev-203">dev-203</option>
              <option value="dev-204">dev-204</option>
              <option value="dev-205">dev-205</option>
              <option value="dev-206">dev-206</option>
              <option value="dev-207">dev-207</option>
              <option value="dev-208">dev-208</option>
              <option value="dev-209">dev-209</option>
            </select>
            <div>
              <label htmlFor="">Genre</label>
              <label htmlFor="F" >Femme:</label>
              <input type="radio" name="genre" onChange={getclient} checked={client.genre === "femme"} value={"femme"} />
              <label htmlFor="">Homme:</label>
              <input type="radio" name="genre" onChange={getclient} checked={client.genre === "homme"} value={"homme"} />
            </div>
          </div>

          <div className="allbutton">
            {!update ? (<button className="ajouter" onClick={ajouter}>Ajouter</button>) : (<button className="ajouter" onClick={confirmupdate}>confirmer</button>)}

            <button className="Annuler" onClick={() => cancel()} >Annuler</button>
          </div>
        </div>
        <form action="" onSubmit={(e) => { e.preventDefault() }}>
          <div className="search">
            <input type="search" placeholder="search..." value={keysearch} onChange={(e) => getkeysearch(e)} />
          </div>
        </form>
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>First Name</th>
                <th>Email</th>
                <th>Group</th>
                <th>Genre</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listeClient.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <p>Aucun client</p>
                  </td>
                </tr>) : null}

              {listeClient.filter((client) => client.id.toString().includes(keysearch) || client.nom.includes(keysearch) || client.prenom.includes(keysearch) || client.email.includes(keysearch))
                .map((client) => {
                  return (
                    <tr key={client.id}>
                      <td>{client.id}</td>
                      <td>{client.nom}</td>
                      <td>{client.prenom}</td>
                      <td>{client.email}</td>
                      <td>{client.groups}</td>
                      <td>{client.genre}</td>
                      <td className="button">
                        <button className="btn1" onClick={() => updateclient(client)}>Mettre a jour</button>
                        <button className="btn2" onClick={() => deleteclient(client)}>Supprimer client</button>
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>

        </div>
        <div>
          <h1 className="suivant">🔜</h1>
        </div>
      </div>
    </>
  )

}

export default App
