const Map = () => {
  return (
    <>
      <h1>Welcome to maps!</h1>
      <h2>Please, choose the location that will be the default!</h2>
      <iframe
        src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6426126.670628727!2d24.4819!3d38.1458392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sel!2sgr!4v1648487327464!5m2!1sel!2sgr'
        width='600'
        height='450'
        style={{ border: 0 }}
        allowfullscreen=''
        loading='lazy'
        referrerpolicy='no-referrer-when-downgrade'
        title='map'
      ></iframe>
    </>
  )
}

export default Map
