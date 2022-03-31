import sidecardImg from './../assets/sidecard-img.jpg'

const SideCard = () => {
  return (
    <>
      <div className=' side-card d-lg-flex flex-column d-none'>
        <img src={sidecardImg} alt='' width={'100%'} height={'auto'} />
      </div>
    </>
  )
}

export default SideCard
