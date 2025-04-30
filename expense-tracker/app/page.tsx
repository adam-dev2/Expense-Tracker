import axios from "axios"
export default async function Home(){
  const response = await axios.get('http://localhost:3000/api')


  console.log(response.data);
  return (
    <div>
      assalamualikum
    </div>
  )
}