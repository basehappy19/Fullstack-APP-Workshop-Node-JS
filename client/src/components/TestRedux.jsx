import { useSelector } from 'react-redux'

const TestRedux = () => {
  const { user } = useSelector((state)=>({
    ...state
  }))
  console.log(user);
  return (
    <div>
      TestRedux1
      <br />
      {user?.value}
      <br />
      {user.user}
    </div>
  )
}

export default TestRedux
