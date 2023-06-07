import Chakra from "../components/Chakra"
import Navbar from "../components/Navbar"
import Providers from "../components/Providers"
import Sidebar from "../components/Sidebar"


const Admin = () => {
  return (
    <div>
        <Providers>
          <Chakra>
            <Navbar />
            <div style={{ display: "flex" }}>
              <Sidebar children={undefined} />
              <div>Admin Home Page
              </div>
            </div>
          </Chakra>
        </Providers>
    </div>
  )
}
export default Admin