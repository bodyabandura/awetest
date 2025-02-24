import './App.css'
import DataReport from './pages/DataReport';
import Header from './components/Header';
import SideBar from './components/SideBar';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 overflow-auto">
          <DataReport />
        </main>
      </div>
    </div>
  );
}

export default App
