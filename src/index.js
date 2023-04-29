import ReactDOM from "react-dom/client";
import Main from "./Main";
import { Route, BrowserRouter, Routes} from 'react-router-dom';
import { Authenticate } from "./components/Authenticate";
import { RoomNotFound } from "./components/RoomNotFound";
import { Room } from "./components/Room";
import { PageNotFound } from "./components/PageNotFound";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}></Route>
                <Route path="/room/:code" element={<Room/>}></Route>
                <Route path="/room/404" element={<RoomNotFound/>}></Route>
                <Route path="/auth" element={<Authenticate/>}></Route>
                <Route path='*' element={<PageNotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
