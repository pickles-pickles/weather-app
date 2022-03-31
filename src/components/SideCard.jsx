import sidecardImg from './../assets/sidecard-img.jpg'

const SideCard = () => {
  return (
    <>
      <div className='bg-warning side-card d-md-flex flex-column d-none'>
        <img src={sidecardImg} alt='' width={'100%'} height={'auto'} />
      </div>
    </>
  )
}

export default SideCard
