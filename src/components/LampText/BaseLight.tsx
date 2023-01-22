const Light = () => {

  

  return (
    <>
      {/* <ambientLight intensity={0.05} /> */}
      <directionalLight color="white" intensity={0.5} position={[0, 0.5, 5]} />
    </>
  )
}

export default Light;
