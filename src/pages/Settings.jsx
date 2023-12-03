import { SettingsGetters } from '../components/settings/SettingsGetters'
import { SettingsSetters } from '../components/settings/SettingsSetters'

const Settings = () => {
  return (
    <>
      <div className='row'>
        <div className='col-md-6 col-12  d-flex flex-column'>
          <SettingsSetters />
        </div>
        <div className='col-md-6 col-12  d-flex flex-column'>
          <SettingsGetters />
        </div>
      </div>
    </>
  )
}

export default Settings
