import { Game } from "./game";
import Data from "@/data/data.json";

function getTodayGuess() {
  const date = new Date();
  const randomNumber = date.getFullYear() + date.getMonth() + date.getDate();
  const dataSize = Data.institutos.length;
  const index = randomNumber % dataSize;
  return Data.institutos[index]; 
}

function getOptions() {
  return Data.institutos.map(inst => inst.name);
}

export default function Home() {

  const todayGuess = getTodayGuess();
  const options = getOptions();

  return (
    <main className="bg-usp min-h-screen w-full bg-center flex items-center justify-center">
      <Game todayGuess={todayGuess} options={options} />
    </main>
  );
}
