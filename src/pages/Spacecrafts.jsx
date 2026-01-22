import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllSpacecrafts, getSpacecraftsStatus, getSpacecraftsError, fetchSpacecrafts } from '../features/spacecraft/SpacecraftsSlice'
import LoadingScreen from '../components/LoadingScreen'
import '../styles/Spacecrafts.css'
import { destroySpacecraft } from '../features/spacecraft/SpacecraftsSlice'

const Spacecrafts = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const spacecrafts = useSelector(selectAllSpacecrafts);
    const spacecraftsStatus = useSelector(getSpacecraftsStatus);

    const handleClick = () => {
        navigate('/form')
    }

    function destroy(id) {
        dispatch(destroySpacecraft(id))
    }

    const handleImageClick = (id) => {
      navigate(`/spacecrafts/${id}`)
  }

    useEffect(() => {
        if(spacecraftsStatus === 'idle'){
            dispatch(fetchSpacecrafts())
        }
    },[spacecraftsStatus, dispatch])

    if (spacecraftsStatus === 'loading') return <LoadingScreen />;

  return (
        <div className="spacecrafts__page">
            {/* Title */}
            <section className="spacecrafts__title">
              <h1>Fleet Command</h1>
              <p>Build, inspect, and manage spacecrafts ready to explore the cosmos.</p>
              <button className="btn-primary" onClick={handleClick}>
                📐 Build a Spacecraft
              </button>
            </section>

            {/* Spacecrafts Grid */}
            <section className="spacecrafts__grid">
                {spacecrafts?.map(ship => (
                    <div key={ship.id} className="spacecraft-card">
                        <img src={ship.pictureUrl} alt={ship.name} onClick={() => handleImageClick(ship.id)} />
                        <div className="spacecraft-info">
                            <h3>{ship.name}</h3>
                            <p>Capacity: {ship.capacity}</p>
                        </div>
                        <button className="btn-destroy" onClick={() => destroy(ship.id)}>Destroy</button>
                    </div>
                ))}
            </section>
        </div>
    ) 
}

export default Spacecrafts