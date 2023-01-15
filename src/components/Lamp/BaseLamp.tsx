import './BaseLamp.scss';

function BaseLamp(props: { x: number, y: number, isActive: boolean, handleActive(x: number, y: number, isActive: boolean): void }) {

  const { x, y } = props;
  let {isActive} = props;

  function setLampClasses() {
    let classes = 'lamp';
    if (isActive) {
      classes = classes + ' lamp_active';
    }
    return classes;
  }

  return (
    <div className={setLampClasses()} onClick={() => props.handleActive(x, y, isActive)}  >
      {x}:{y}
    </div>
  )
}

export default BaseLamp;
